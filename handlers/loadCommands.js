const fs = require('fs');
const path = require('path');
const { Collection } = require('discord.js');

module.exports = (client) => {
    const commands = new Collection();
    const commandsPath = path.join(__dirname, '../src/commands');
    
    for (const folder of fs.readdirSync(commandsPath)) {
        const commandFiles = fs.readdirSync(path.join(commandsPath, folder)).filter(file => file.endsWith('.js'));
        
        for (const file of commandFiles) {
            const command = require(path.join(commandsPath, folder, file));
            if ('data' in command && ('silicon' in command || 'autocomplete' in command)) {
                commands.set(command.data.name, command);
            } else {
                console.log('Invalid command:', file);
            }
        }
    }

    return commands;
};
