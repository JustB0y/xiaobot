const Command = require('../../structures/Command');
const { stripIndents } = require('common-tags');

module.exports = class SuicideCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'Suicide',
			group: 'roleplay',
			memberName: 'Suicide',
			description: 'Kill yourself.',
			args: [
				{
					key: 'user',
					prompt: 'What user do you want to roleplay with?',
					type: 'user'
				}
			]
		});
	}

	run(msg, args) {
		const { user } = args;
		return msg.say(stripIndents`
			**${msg.author.username}** *kills* **${user.author.username}**
			https://i.imgur.com/WxD4XMe.gif
		`);
	}
};
