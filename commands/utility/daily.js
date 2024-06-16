const { SlashCommandBuilder } = require('discord.js');
const handleItemInventory = require('../../handlers/handleItemInventory');
const handleDaily = require('../../handlers/handleDaily');
const getUser = require('../../util/getUser');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('daily')
		.setDescription('Gives a daily reward.'), async execute(interaction) {
		await interaction.deferReply();

		const user = await getUser(interaction.user.id);

		if (!user) {
			await interaction.reply('There was an error fetching your data.');
			return;
		}

		const now = new Date();

		const lastDaily = new Date(user.daily_reward);

		// check if a day has passed
		if (now - lastDaily < 86400000) {
			await interaction.editReply(`You have already claimed your daily reward. Try again in ${ new Date(86400000 - (now - lastDaily)).toISOString().substr(11, 8) }`);
		} else {
			const generatedItems = await handleDaily(interaction.user.id);
			for (const item of generatedItems) {
				await handleItemInventory.add(interaction.user.id, item);
			}

			await interaction.editReply(`**You have successfully claimed your daily rewards:**\n\n ${ generatedItems.map(item => `${ item.emoji } ${ item.name } x${ item.quantity }`).join('\n') }`);


		}
	},
};
