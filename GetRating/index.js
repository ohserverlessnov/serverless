module.exports = async function (context, req, rating) {
    context.log('GetRating called ');
    
    var ratingid  = req.query.id 
    try {
        if (!rating)
        {
            context.log("rating  item not found for id="+ratingid);
            let notfound = {
                error: 'NOT_FOUND',
                message: "Rating with id not found"+ratingid

              };
            context.res = {
                status: 404,
                body: JSON.stringify(notfound)
            };
        }
        else
        {
            context.log("Found Rating item, Description=" + rating);
            context.res = {
                status: 200,
                body: rating
            };
        }  
    } catch (e) {
        let error = {
            error: 'UNHANDLED_ERROR',
            message: e
          };
        context.res = {
            status: 500,
            body: JSON.stringify(error)
        };
     
    }
 
    
    context.done();
}