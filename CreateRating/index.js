
const fetch = async function (context, url) {

    return await  new Promise((resolve, reject) => {
        const req = require('https').request(url, (res) => {
            if (res.statusCode !== 200 && res.statusCode !== 201) {
                reject(`Request Failed: Status Code: ${res.statusCode}`)
            }
            var strings = []
            res.on('data', function (chunk) {
                strings.push(chunk)
            })
            res.on('end', () => {
                let body = strings.join('')
                if (/^application\/json/.test(res.headers['content-type'])) {
                    try {
                        const parsedData = JSON.parse(body)
                        return resolve(parsedData)
                    } catch (e) {
                        context.log(`server_fetch: ${e}`)
                        reject(e)
                    }
                } else {
                    return resolve(body)
                }
            })
        }).on('error', (e) => {
            reject(e.message)
        })
        req.end()
    })
}

const required_props = ['userId', 'productId', 'locationName', 'rating', 'userNotes']

module.exports = async function (context, req) {
    

    const {body} = req || {}
    context.log(`got body: ${body}`)
    try {

        if (Object.keys(body).length !== 5) {
            throw "Invalid Rating, not the right number of properties"
        }

        if (!required_props.reduce((a, v) => a && body.hasOwnProperty(v), true)) {
            throw "Invalid Rating, required properties not present"
        }

        if (isNaN(body.rating) || body.rating < 0 ||  body.rating > 5) {
            throw "Invalid Rating, needs to be betwwen 0 & 5"
        }

        const user = await fetch(context, `https://serverlessohapi.azurewebsites.net/api/GetUser?userId=${body.userId}`)

        const product = await fetch(context, `https://serverlessohapi.azurewebsites.net/api/GetProduct?productId=${body.productId}`)

        context.bindings.ratingDocument = JSON.stringify({
            ...body,
            timestamp: new Date,
        });
    
    
        context.res = {
            headers: {
                'Content-Type': 'application/json'
            },
            body: context.bindings.ratingDocument
        }
    
        context.done()

    } catch (e) {
        context.res = {
            status: 400,
            body: `An error occured: ${e}`
        };
    }

}