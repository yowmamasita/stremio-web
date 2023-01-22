const playViaDeepLink = (player, href) => player +
    Buffer.from(
        href.split("base64,")[1].split('"')[0],
        "base64"
    )
    .toString()
    .split("https")[1];

module.exports = {playViaDeepLink};
