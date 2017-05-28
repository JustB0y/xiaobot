const { Command } = require('discord.js-commando');

module.exports = class MemberLogCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'member-channel',
            group: 'settings',
            memberName: 'member-channel',
            description: 'Sets the channel for the member logs to be sent.',
            guildOnly: true,
            args: [
                {
                    key: 'channel',
                    prompt: 'What is the channel you want to send logs to?',
                    type: 'channel'
                }
            ]
        });
    }

    hasPermission(msg) {
        if (!msg.member.hasPermission('ADMINISTRATOR')) return 'You do not have the `Administrator` Permission.';
        else return true;
    }

    run(msg, args) {
        const { channel } = args;
        msg.guild.settings.set('memberLog', channel.id);
        return msg.say(`Member Log channel set to ${channel.name}.`);
    }
};
