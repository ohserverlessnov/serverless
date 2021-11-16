module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const userID = req.query.userId;
    const documents = context.bindings.ratings;

    try {
        if(userID){
            documents.map(document => {
                if(document.userId === userID){
                    return document;
                }
            });

            context.res = {
                body: documents
            };
        }else {
            context.res = {
                body: `No details found for given userId: ${userID} !`
            }
        }
    } catch (err) {
        context.log(err);
        context.res = {
            body: 'Something wrong happend with your request :('
        }
    }

    context.done();
}