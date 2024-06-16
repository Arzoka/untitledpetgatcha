const pets = require('../config/pets.json');

function isPet(entityId) {
	let foundPet = null;

	for (const rarity in pets) {
		if (pets[rarity].find(pet => pet.id === entityId)) {
			foundPet = pets[rarity].find(pet => pet.id === entityId);
			break;
		}
	}

	return foundPet;
}

module.exports = isPet;
