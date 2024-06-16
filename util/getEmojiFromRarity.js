const gatchaEmojis = require('../config/gatchaEmojis.json');

function getEmojiFromRarity(rarity) {
	if (rarity.toLowerCase() === 'random') {
		const keys = Object.keys(gatchaEmojis);
		return gatchaEmojis[keys[Math.floor(Math.random() * keys.length)]];
	}

	return gatchaEmojis[rarity.toLowerCase()];
}

module.exports = getEmojiFromRarity;
