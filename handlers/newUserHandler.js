const { PrismaClient } = require('../constants');

async function newUserHandler(id, username) {
	await PrismaClient.user.create({
		data: {
			id, username,
		},
	});
}

module.exports = newUserHandler;
