const { SlashCommandBuilder } = require('discord.js');
const handlePetInventory = require('../../handlers/handlePetInventory');
const getLocalPetData = require('../../util/getLocalPetData');
const getEmojiFromRarity = require('../../util/getEmojiFromRarity');
const getTopUsersByRolls = require('../../util/getTopUsersByRolls');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.addIntegerOption(option => option.setName('amount')
			.setDescription('Amount of users to display.')
			.setRequired(false))
		.setDescription('Returns leaderboard of top users with most amount of rolls.'), async execute(interaction) {
		await interaction.deferReply();

		const users = await getTopUsersByRolls(interaction.options.getInteger('amount') || 5);

		const leaderboard = users.map((user, index) => {
			return `${ index + 1 }. **${ user.username }** - ${ user.rolls } rolls`;
		}).join('\n');

		await interaction.editReply(`**Leaderboard:**\n\n${ leaderboard }`);

	},
};
