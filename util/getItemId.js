const getAllEntities = require('./getAllEntities');

function getItemId(inputValue) {
	const data = getAllEntities();

	let itemId = null;

	for (let rarity in data) {
		for (let item of data[rarity]) {
			if (item.name.toLowerCase() === inputValue.toLowerCase() || item.emoji === inputValue) {
				itemId = item.id;
				return itemId;
			}
		}
	}
	return itemId;
}

module.exports = getItemId;
