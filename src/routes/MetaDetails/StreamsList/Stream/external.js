const playViaDeepLink = (player, deepLinks) => deepLinks &&
	deepLinks.externalPlayer &&
	deepLinks.externalPlayer.href &&
	typeof deepLinks.externalPlayer.href === 'string' ?
		(deepLinks.externalPlayer.href.startsWith('data:') ?
			player + Buffer.from(deepLinks.externalPlayer.href.split("base64,")[1].split('"')[0],"base64").toString().split("https")[1]
			:
			deepLinks.externalPlayer.href)
		:
		null;

module.exports = {
	playViaDeepLink
};
