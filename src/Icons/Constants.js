export const ICONS = {
    DISCORD: require("./discord.png"),
    GITHUB: require("./github.png"),
    GMAIL: require("./gmail.png"),
    INSTAGRAM: require("./instagram.png"),
    LINKEDIN: require("./linkedin.png"),
    OUTLOOK: require("./outlook.png"),
    SPOTIFY: require("./spotify.png"),
    STEAM: require("./steam.png"),
    TWITCH: require("./twitch.png"),
    TWITTER: require("./twitter.png"),
    ECONOKEY: require("./logoIcon.png"),
    DEFAULTACCOUNT: require("./accountbox.png"),
    DEFAULTWALLET: require("./wallet.png"),
    DEFAULTNOTE: require("./nota.png"),
    BINANCE: require("./binance.png"),
    BITCOIN: require("./bitcoin.png"),
};

export function getIcon(ICON) {
    switch (ICON) {
        case 'discord':
            return ICONS.DISCORD;
        case 'github':
            return ICONS.GITHUB;
        case 'gmail':
            return ICONS.GMAIL;
        case 'instagram':
            return ICONS.INSTAGRAM;
        case 'linkedin':
            return ICONS.LINKEDIN;
        case 'outlook':
            return ICONS.OUTLOOK;
        case 'spotify':
            return ICONS.SPOTIFY;
        case 'steam':
            return ICONS.STEAM;
        case 'twitch':
            return ICONS.TWITCH;
        case 'twitter':
            return ICONS.TWITTER;
        case 'econokey':
            return ICONS.ECONOKEY;
        case 'default-account':
            return ICONS.DEFAULTACCOUNT;
        case 'default-wallet':
            return ICONS.DEFAULTWALLET;
        case 'default-note':
            return ICONS.DEFAULTNOTE;
        case 'binance':
            return ICONS.BINANCE;
        case 'bitcoin':
            return ICONS.BITCOIN;
        default:
            break;
    }

}