const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class KickCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            group: 'moderation',
            memberName: 'kick',
            description: 'Kicks a user and logs the kick to the mod_logs.',
            guildOnly: true,
            args: [{
                key: 'member',
                prompt: 'What member do you want to kick?',
                type: 'member'
            }, {
                key: 'reason',
                prompt: 'What do you want to set the reason as?',
                type: 'string',
                validate: reason => {
                    if (reason.length < 140) {
                        return true;
                    }
                    return `Please keep your reason under 140 characters, you have ${reason.length}.`;
                }
            }]
        });
    }
    
    hasPermission(msg) {
        return msg.member.hasPermission('KICK_MEMBERS');
    }

    async run(message, args) {
        if (!message.channel.permissionsFor(this.client.user).hasPermission('BAN_MEMBERS'))
            return message.say(':x: Error! I don\'t have the Ban Members Permission!');
        const modlogs = message.guild.channels.find('name', 'mod_logs');
        if (!modlogs)
            return message.say(':x: Error! Could not find the mod_logs channel! Please create it!');
        if (!modlogs.permissionsFor(this.client.user).hasPermission('EMBED_LINKS'))
            return message.say(':x: Error! I don\'t have the Embed Links Permission!');
        const { member, reason } = args;
        if (!member.bannable)
            return message.say(':x: Error! This member cannot be kicked! Perhaps they have a higher role than me?');
        try {
            await member.kick();
            await message.say(':ok_hand:');
            const embed = new RichEmbed()
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setColor(0xFFA500)
                .setTimestamp()
                .setDescription(`**Member:** ${member.user.tag} (${member.id})\n**Action:** Kick\n**Reason:** ${reason}`);
            return modlogs.send({embed});
        } catch (err) {
            return message.say(':x: Error! Something went wrong!');
        }
    }
};
