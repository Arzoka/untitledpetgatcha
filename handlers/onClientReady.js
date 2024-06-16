function onClientReady(client) {
	console.log(`Ready! Logged in as ${ client.user.tag }`);
}

module.exports = onClientReady;
