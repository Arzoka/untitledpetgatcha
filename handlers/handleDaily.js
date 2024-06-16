const items = require('../config/items.json');
const { PrismaClient } = require('../constants');

async function handleDaily(userId) {
	const lootbox = { ...items.rare[0], quantity: 1 };

	const generatedItems = [lootbox];

	await PrismaClient.user.update({
		where: {
			id: userId,
		}, data: {
			daily_reward: new Date(),
		},
	});

	return generatedItems.reduce((acc, e) => {
		const found = acc.find(x => e.name === x.name);
		if (found) {
			found.quantity += e.quantity;
		} else {
			acc.push({ ...e });
		}
		return acc;
	}, []);
}

module.exports = handleDaily;
