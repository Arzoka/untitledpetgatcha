const pets = require('../config/pets.json');

function getLocalPetData(id) {
	let returnPet = null;

	for (const [_, rarityPetArray] of Object.entries(pets)) {
		const pet = rarityPetArray.find(pet => pet.id === id);

		if (pet) {
			returnPet = pet;
			break;
		}
	}

	return returnPet;
}

module.exports = getLocalPetData;
