const playViaDeepLink = (player, href) => deepLinks.externalPlayer && typeof deepLinks.externalPlayer.href === 'string' ? player +
    Buffer.from(
        href.split("base64,")[1].split('"')[0],
        "base64"
    )
    .toString()
    .split("https")[1] : null;

module.exports = {
    playViaDeepLink
};
