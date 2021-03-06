const Command = require('../../structures/Command');
const sides = ['heads', 'tails'];

module.exports = class CoinFlipCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'coin',
			aliases: ['coin-flip', 'flip'],
			group: 'random-res',
			memberName: 'coin',
			description: 'Flips a coin.'
		});
	}

	run(msg) {
		return msg.say(`It landed on ${sides[Math.floor(Math.random() * sides.length)]}!`);
	}
};
