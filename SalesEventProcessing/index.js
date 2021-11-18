module.exports = async function (context, eventHubMessages) {
    context.log(`JavaScript eventhub trigger function called for message array ${eventHubMessages}`);

    // go through every message
    context.bindings.posData = [];
    context.bindings.posDataSB = [];
    eventHubMessages.forEach((salesItem, index) => {
        context.log(`Processed Item ${index}\n${JSON.stringify(salesItem)}`);

        // Convert each sales item to a document, indexed by the salesNumber
        context.bindings.posData.push({
            ...salesItem,
            id: salesItem.header.salesNumber
        });
        // Convert each sales item to a document, indexed by the salesNumber
        if( salesItem.header.receiptUrl ){
            context.bindings.posDataSB.push({
                "totalItems": salesItem.details.length,
                "totalCost": Number(salesItem.header.totalCost),
                "salesNumber": salesItem.header.salesNumber,
                "salesDate": salesItem.header.salesDate,
                "storeLocation": salesItem.header.locationId,
                "receiptUrl": salesItem.header.receiptUrl 
            });
        }

    });
 //   [salesItem.header.locationName].filter(i => !!i).join(',')
 
    context.done();
};