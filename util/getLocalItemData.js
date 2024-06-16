const items = require('../config/items.json');

function getLocalItemData(id) {
	let returnItem = null;

	for (const [_, rarityItemArray] of Object.entries(items)) {
		const item = rarityItemArray.find(item => item.id === id);

		if (item) {
			returnItem = item;
			break;
		}
	}

	return returnItem;
}

module.exports = getLocalItemData;
