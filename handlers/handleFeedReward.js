const gatcha = require('../config/gatcha.json');
const items = require('../config/items.json');

function handleFeedReward(rarity) {
	const rarityChance = gatcha[rarity.toLowerCase()];

	// Calculate the number range based on rarityChance
	let min = 1;
	let max = 20;

	// Adjust the range based on rarityChance
	if (rarityChance > 0) {
		max = Math.ceil(max / rarityChance);
	} else {
		min = 50;
		max = 200;
	}

	// Generate a random number within the adjusted range
	const AmountToGive = Math.random() < 0.5 ? Math.floor(Math.random() * (max - min + 1)) + min : 0;

	let itemsToGive = [];


	for (let i = 0; i < AmountToGive; i++) {
		const item = items.common.find(item => item.id === 'item-1-c-petbasket');
		itemsToGive.push({ ...item, quantity: 1 });
	}


	return itemsToGive.reduce((acc, e) => {
		const found = acc.find(x => e.name === x.name);
		if (found) {
			found.quantity += e.quantity;
		} else {
			acc.push({ ...e });
		}
		return acc;
	}, []);

}

module.exports = handleFeedReward;
