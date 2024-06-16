const Prisma = require('@prisma/client');
const { Client, GatewayIntentBits } = require('discord.js');

const PrismaClient = new Prisma.PrismaClient();
const discordClient = new Client({ intents: [GatewayIntentBits.Guilds] });

module.exports = {
	PrismaClient, discordClient,
};
