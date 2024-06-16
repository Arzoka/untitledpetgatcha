const { Routes, REST } = require('discord.js');
const path = require('path');
const fs = require('fs');
const { token, clientId } = require('./config/tokens.json');
const { discordClient } = require('./constants');

async function getCommands() {
	const commands = [];

	const foldersPath = path.join(__dirname, 'commands');
	const commandFolders = fs.readdirSync(foldersPath);

	for (const folder of commandFolders) {
		const commandsPath = path.join(foldersPath, folder);
		const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			const command = require(filePath);
			if ('data' in command && 'execute' in command) {
				commands.push(command.data.toJSON());
			} else {
				console.log(`[WARNING] The command at ${ filePath } is missing a required "data" or "execute" property.`);
			}
		}
	}

	return commands;
}

async function deployCommandsToGuild(guildId, commands) {
	if (!commands) {
		commands = await getCommands();
	}

	const rest = new REST().setToken(token);

	try {
		console.log(`Started refreshing ${ commands.length } application (/) commands for guild ${ guildId }.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });

		console.log(`Successfully reloaded ${ data.length } application (/) commands for guild ${ guildId }.`);
	} catch (error) {
		console.error(`Error reloading commands for guild ${ guildId }:`, error);
	}
}

async function deployCommands(client) {
	try {
		const guilds = client.guilds.cache.map(guild => guild.id);

		const commands = await getCommands();

		// Deploy commands to each guild
		for (const guildId of guilds) {
			await deployCommandsToGuild(guildId, commands);
		}
	} catch (error) {
		console.error('Error fetching guilds:', error);
	}
}

module.exports = { deployCommands, deployCommandsToGuild, getCommands };
