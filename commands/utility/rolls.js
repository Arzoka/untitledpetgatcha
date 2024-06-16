const { SlashCommandBuilder } = require('discord.js');
const handlePetInventory = require('../../handlers/handlePetInventory');
const getLocalPetData = require('../../util/getLocalPetData');
const getEmojiFromRarity = require('../../util/getEmojiFromRarity');
const getUser = require('../../util/getUser');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rolls')
		.setDescription('Gives the amount of rolls user has done.')
		.addUserOption(option => option.setName('user')
			.setDescription('The user to get rolls from.')
			.setRequired(false)), async execute(interaction) {
		await interaction.deferReply(); // Deferring the reply to ensure we have enough time

		const user = interaction.options.getUser('user') || interaction.user;

		const dbUser = await getUser(user.id);

		if (!dbUser) {
			return interaction.editReply('User not found.');
		}

		await interaction.editReply(`**${ user.username }'s rolls:** ${ dbUser.rolls }`);
	},
};
