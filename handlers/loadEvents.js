const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    const eventsPath = path.join(__dirname, '../src/events');
    
    for (const file of fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'))) {
        const event = require(path.join(eventsPath, file));
        const eventName = event.name || file.replace('.js', '');
        const listener = (...args) => event.silicon(...args);
        
        if (event.once) {
            client.once(eventName, listener);
        } else {
            client.on(eventName, listener);
        }
    }
};
