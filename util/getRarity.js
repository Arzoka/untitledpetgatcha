const gatcha = require('../config/gatcha.json');

function getRarity() {
	const random = Math.random() * 100;
	console.log(random);

	let cumulativeChance = 0;
	for (const [rarity, chance] of Object.entries(gatcha)) {
		cumulativeChance += chance;
		if (random <= cumulativeChance) {
			return rarity;
		}
	}

	return null;
}

module.exports = getRarity;
