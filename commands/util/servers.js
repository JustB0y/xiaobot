const { Command } = require('discord.js-commando');

module.exports = class ServersCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'servers',
            aliases: [
                'serverlist'
            ],
            group: 'util',
            memberName: 'servers',
            description: 'Sends a list of all server names and IDs to the log. (;servers)',
            examples: [';servers']
        });
    }
    hasPermission(msg) {
        return this.client.isOwner(msg.author);
    }

    run(message) {
        if (message.channel.type !== 'dm') {
            if (!message.channel.permissionsFor(this.client.user).hasPermission(['SEND_MESSAGES', 'READ_MESSAGES'])) return;
        }
        const guildCount = this.client.guilds.size;
        const guildNames = this.client.guilds.map(g => `${g.name} (${g.id})`).join(', ');
        console.log(`${guildCount} Servers: ${guildNames}`);
        return message.say('Sent the information to the console!');
    }
};
