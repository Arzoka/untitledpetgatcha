const getRarity = require('../util/getRarity');
const getPet = require('../util/getPet');

function handleRoll() {
	const rarity = getRarity();
	const pet = getPet(rarity);

	return {
		'rarity': rarity, 'pet': pet,
	};
}

module.exports = handleRoll;
