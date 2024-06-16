const { discordClient } = require('../constants');
const { deployCommands } = require('../deploy-commands');
const { Events } = require('discord.js');
const { token } = require('../config/tokens.json');

discordClient.once(Events.ClientReady, () => {
	deployCommands(discordClient).then(() => {
		console.log(`Finished deploying commands to ${ (discordClient.guilds.cache.size) } guilds.`);

	}).catch(error => {
		console.error('Error deploying commands:', error);
	});

	discordClient.destroy().catch(console.error);
});

discordClient.login(token).catch(console.error);

