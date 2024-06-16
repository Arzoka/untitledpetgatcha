const { SlashCommandBuilder } = require('discord.js');
const gatcha = require('../../config/gatcha.json');

let rarityText = [];

for (const rarity in gatcha) {
	if (Object.prototype.hasOwnProperty.call(gatcha, rarity)) {
		let chance = gatcha[rarity];
		rarityText.push(`${ rarity }: ${ chance }%`);
	}
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rarities')
		.setDescription('Gives a list of all rarities.'), async execute(interaction) {
		await interaction.reply('```' + `\n\n${ rarityText.join('\n') }` + '```');
	},
};
