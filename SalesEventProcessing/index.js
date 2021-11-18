module.exports = async function (context, eventHubMessages) {
    context.log(`JavaScript eventhub trigger function called for message array ${eventHubMessages}`);
    
    // go through every message
    context.bindings.posData = [];
    eventHubMessages.forEach((salesItem, index) => {
        context.log(`Processed Item ${index}\n${JSON.stringify(salesItem)}`);
        
        // Convert each sales item to a document, indexed by the salesNumber
        context.bindings.posData.push({
            ...salesItem,
            id: salesItem.header.salesNumber
        });
    });
    context.done();
};