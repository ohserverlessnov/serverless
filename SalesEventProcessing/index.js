module.exports = async function (context, eventHubMessages) {
    context.log(`JavaScript eventhub trigger function called for message array ${eventHubMessages}`);
    
    // go through every message
    context.bindings.posData = [];
    eventHubMessages.forEach((salesItem, index) => {
        context.log(JSON.stringify(salesItem));
        context.bindings.posData.push(JSON.stringify(salesItem));
    });
};