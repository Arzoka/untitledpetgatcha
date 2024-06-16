const { Collection, Events } = require('discord.js');
const { token } = require('./config/tokens.json');
const { discordClient: client } = require('./constants');

const {
	loadCommands, handleInteraction, onClientReady,
} = require('./handlers');
const getUser = require('./util/getUser');
const newUserHandler = require('./handlers/newUserHandler');
const { deployCommandsToGuild } = require('./deploy-commands');


client.commands = new Collection();

loadCommands(client, __dirname);

client.once(Events.ClientReady, onClientReady);

client.on(Events.GuildCreate, async guild => {
	console.log(`Joined guild: ${ guild.name }`);
	await deployCommandsToGuild(guild.id);

});

client.on(Events.InteractionCreate, async interaction => {
	if (await getUser(interaction.user.id) === null) {
		console.log('New user detected');
		await newUserHandler(interaction.user.id, interaction.user.username);
	}
	await handleInteraction(interaction, client);
});

client.login(token).catch(console.error);
