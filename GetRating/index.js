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
                body: JSON.stringify(notfound,null,2)
            };
        }
        else
        {
            context.log("Found Rating item, Description=" + rating);
            let response = {
                id: rating.id,
                userId: rating.userId,
                productId: rating.productId,
                locationName: rating.locationName,
                rating: rating.rating,
                userNotes: rating.userNotes,
              };
            context.res = {
                status: 200,
                body: JSON.stringify(response,null,2)
            };
        }  
    } catch (e) {
        let error = {
            error: 'UNHANDLED_ERROR',
            message: e
          };
        context.res = {
            status: 500,
            body: JSON.stringify(error,null,2)
        };
     
    }
    context.done();
}