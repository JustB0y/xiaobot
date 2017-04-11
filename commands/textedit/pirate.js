const { Command } = require('discord.js-commando');
const pirateSpeak = require('pirate-speak');

module.exports = class PirateCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pirate',
            aliases: [
                'piratespeak',
                'yarr'
            ],
            group: 'textedit',
            memberName: 'pirate',
            description: 'Talk like a pirate! (;pirate This is being said like a pirate!)',
            examples: [';pirate This is being said like a pirate!'],
            args: [{
                key: 'text',
                prompt: 'What text would you like to convert to pirate?',
                type: 'string',
                validate: content => {
                    if (pirateSpeak.translate(content).length > 1950) {
                        return 'Your message content is too long.';
                    }
                    return true;
                }
            }]
        });
    }

    run(message, args) {
        if (message.channel.type !== 'dm') {
            if (!message.channel.permissionsFor(this.client.user).hasPermission(['SEND_MESSAGES', 'READ_MESSAGES'])) return;
        }
        const text = args.text;
        const pirate = pirateSpeak.translate(text);
        return message.say(`\u180E${pirate}`);
    }
};
