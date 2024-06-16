const { PrismaClient } = require('../constants');

async function getUser(id) {
	return await PrismaClient.user.findUnique({
		where: {
			id,
		},
	});
}

module.exports = getUser;
