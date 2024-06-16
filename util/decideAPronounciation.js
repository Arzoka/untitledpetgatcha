function decideAPronounciation(word, firstLetterOfSentence) {
	const firstLetter = word.charAt(0).toLowerCase();
	if (['a', 'e', 'i', 'o', 'u'].includes(firstLetter)) {
		return firstLetterOfSentence ? 'An' : 'an';
	}
	return firstLetterOfSentence ? 'A' : 'a';
}

module.exports = decideAPronounciation;
