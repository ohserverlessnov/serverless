module.exports = async function (context, req, ratingsdb003) {
    context.log('JavaScript HTTP trigger function processed a request.');
    //ratingsdb003 = context.bindings.ratingsdb003
    context.log('JavaScript queue trigger function processed work item');


    if (ratingsdb003)
    {
        context.log("ToDo item not found");
    }
    else
    {
        context.log("Found ToDo item, Description=" + ratingsdb003);
    }
    
    context.done();
}