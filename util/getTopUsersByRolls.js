const { PrismaClient } = require('../constants');

async function getTopUsersByRolls(amountOfUsers) {
	return await PrismaClient.user.findMany({
		orderBy: {
			rolls: 'desc',
		}, take: amountOfUsers,
	});
}

module.exports = getTopUsersByRolls;
