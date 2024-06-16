const pets = require('../config/pets.json');

function getPet(rarity) {
	const petList = pets[rarity];
	const randomIndex = Math.floor(Math.random() * petList.length);
	return petList[randomIndex];
}

module.exports = getPet;
