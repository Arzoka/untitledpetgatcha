const { SlashCommandBuilder } = require('discord.js');
const { handleRoll } = require('../../handlers');
const handlePetInventory = require('../../handlers/handlePetInventory');
const decideAPronounciation = require('../../util/decideAPronounciation');
const getEmojiFromRarity = require('../../util/getEmojiFromRarity');
const handleUserRollQuantity = require('../../handlers/handleUserRollQuantity');
const handleItemInventory = require('../../handlers/handleItemInventory');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Rolls for a pet.'), async execute(interaction) {

		await interaction.deferReply();

		const baskets = await handleItemInventory.get(interaction.user.id, 'item-1-c-petbasket');

		if (!baskets || baskets.quantity < 1) {
			await interaction.editReply('You do not have enough pet baskets, feed your pets or use /daily to get more!');
			return;
		}

		await handleItemInventory.remove(interaction.user.id, 'item-1-c-petbasket');

		await handleUserRollQuantity(interaction.user.id, 1);
		const result = handleRoll();
		await handlePetInventory.add(interaction.user.id, result.pet);

		// Initial reply
		await interaction.editReply('Rolling... <a:heart_anim:1251633303165861979>');

		setTimeout(async () => {
			await interaction.editReply(`
		You rolled ${ decideAPronounciation(result.rarity) } ${ result.rarity } ${ getEmojiFromRarity(result.rarity) } **${ result.pet.name }** ${ result.pet.emoji }!`);
		}, Math.random() * 500 + 1000);
	},
};
