module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const userID = req.query.userId;
    const documents = context.bindings.ratingDocument;

    if(userID){
        const newArray = [];
        documents.forEach(document => {
            if(userID === document.userId){
                newArray.push(document);
            }else {
                context.log('no document found');
            }
        });

        if(newArray.length === 0){
            context.res = {
                status: 404,
                body: 'No details were populated for this query, try to chech your userId'
            };
        }else {
            context.res = {
                body: newArray
            };
        }
    }else {
        context.res = {
            body: `Please attach a "userId" in the query param to get results.\nEg. http://localhost:7071/api/GetRatings?userId=cc20a6fb-a91f-4192-874d-132493685376`
        }
    }

    context.done();
}