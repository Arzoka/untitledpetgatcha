const pets = require('../config/pets.json');
const items = require('../config/items.json');

function getAllEntities() {
	return {
		common: [...pets.common, ...items.common],
		uncommon: [...pets.uncommon, ...items.uncommon],
		rare: [...pets.rare, ...items.rare],
		epic: [...pets.epic, ...items.epic],
		legendary: [...pets.legendary, ...items.legendary],
		mythical: [...pets.mythical, ...items.mythical],
		godly: [...pets.godly, ...items.godly],
		hidden: [...pets.hidden, ...items.hidden],
		unobtainable: [...pets.unobtainable, ...items.unobtainable],
	};

}

module.exports = getAllEntities;
