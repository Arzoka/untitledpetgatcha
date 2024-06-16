const { PrismaClient } = require('../constants');

async function handleUserRollQuantity(userId, givenQuantity) {
	if (isNaN(parseInt(givenQuantity))) {
		throw new Error('Given quantity is not a number.');
	}

	await PrismaClient.user.update({
		where: {
			id: userId,
		}, data: {
			rolls: {
				increment: parseInt(givenQuantity),
			},
		},
	});
}

module.exports = handleUserRollQuantity;
