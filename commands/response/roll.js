const commando = require('discord.js-commando');

class RollChooseCommand extends commando.Command {
    constructor(Client){
        super(Client, {
            name: 'roll', 
            group: 'response',
            memberName: 'roll',
            description: 'Rolls a Dice of your choice. (;roll 6)',
            examples: [';roll 6']
        });
    }

    async run(message, args) {
        if(message.channel.type !== 'dm') {
            if(!message.channel.permissionsFor(this.client.user).hasPermission('SEND_MESSAGES')) return;
            if(!message.channel.permissionsFor(this.client.user).hasPermission('READ_MESSAGES')) return;
        }
        let [value] = message.content.split(" ").slice(1);
        if(value === undefined) {
            message.reply(":x: Error! Your message contains nothing!");
        } else if(value.match("^[0-9]+$")) {
            let roll = Math.floor(Math.random() * value) + 1;
            message.reply("You rolled a " + roll);
        } else {
            message.reply(":x: Error! Your message either contains a number but the number is invalid, or the number is in the wrong place.\n:notepad_spiral: (Note: When using numbers such as 1,000, do not use a comma)");
        }
    }
}

module.exports = RollChooseCommand;