const { SlashCommandBuilder } = require('discord.js');
const handleItemInventory = require('../../handlers/handleItemInventory');
const getUser = require('../../util/getUser');
const isPet = require('../../util/isPet');
const getItemId = require('../../util/getItemId');
const handlePetInventory = require('../../handlers/handlePetInventory');
const getLocalPetData = require('../../util/getLocalPetData');
const handleFeedReward = require('../../handlers/handleFeedReward');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('feed')
		.setDescription('Feeds your pet.')
		.addStringOption(option => option.setName('pet')
			.setDescription('The pet to feed, can be id, name, or emoji.')
			.setRequired(true)), async execute(interaction) {
		await interaction.deferReply();

		const user = await getUser(interaction.user.id);

		if (!user) {
			await interaction.reply('There was an error fetching your data.');
			return;
		}

		const pet = interaction.options.getString('pet');

		if (!pet) {
			await interaction.editReply('Pet not found.');
			return;
		}

		const petId = isPet(pet) ? pet : getItemId(pet);

		const petObject = getLocalPetData(petId);

		if (await handlePetInventory.get(interaction.user.id, petId) === null) {
			await interaction.editReply(`You do not own ${ petObject.name } ${ petObject.emoji }.`);
		} else {
			const reward = handleFeedReward(petObject.rarity);

			for (const item of reward) {
				for (let i = 0; i < item.quantity; i++) {
					await handleItemInventory.add(interaction.user.id, item);
				}
			}

			if (reward.length === 0) {
				await interaction.editReply(`You fed **${ petObject.name }** ${ petObject.emoji } and got nothing.`);
			} else {

				await interaction.editReply(`You fed **${ petObject.name }** ${ petObject.emoji } and got:\n\n${ reward.map(item => `${ item.emoji } **${ item.name }** x${ item.quantity }`).join('\n') }`);

			}
		}


	},
};
