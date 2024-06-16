const items = require('../config/items.json');

function isItem(entityId) {
	let foundItem = null;

	for (const rarity in items) {
		if (items[rarity].find(item => item.id === entityId)) {
			foundItem = items[rarity].find(item => item.id === entityId);
			break;
		}
	}

	return foundItem;
}

module.exports = isItem;
