
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
            console.error(`server_fetch: ${e.message}`)
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
        const jsonBody = body
        //const jsonBody = JSON.parse(body)

        if (Object.keys(jsonBody).length !== 5) {
            throw "Invalid Rating, not the right number of properties"
        }
        if (!required_props.reduce((a, v) => a && jsonBody.hasOwnProperty(v), true)) {
            throw "Invalid Rating, required properties not present"
        }

        if (isNaN(jsonBody.rating) || jsonBody.rating < 0 ||  jsonBody.rating > 5) {
            throw "Invalid Rating, needs to be betwwen 0 & 5"
        }

        const user = await fetch(context, `https://serverlessohapi.azurewebsites.net/api/GetUser?userId=${jsonBody.userId}`)

        const product = await fetch(context, `https://serverlessohapi.azurewebsites.net/api/GetProduct?productId=${jsonBody.productId}`)

        context.bindings.ratingDocument = JSON.stringify({
            ...jsonBody,
            timestamp: new Date,
        });
    
    
        context.res = {
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