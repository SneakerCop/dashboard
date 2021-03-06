import request from 'request';
let discord = {};
discord.inviteToGuild = function (botToken, guildID, discordID, access_token, roles, callback) {
    request({
        headers: {
            'Authorization': `Bot ${botToken}`,
            'User-Agent': 'Kleidi User Dashboard'
        },
        uri: `https://discordapp.com/api/guilds/${guildID}/members/${discordID}`,
        method: 'PUT',
        json: {
            access_token: access_token,
            roles: roles
        }
    }, (err, res, body) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, res.statusCode);
    });
};

discord.removeFromGuild = function (botToken, guildID, discordID, callback) {
    request({
        headers: {
            'Authorization': `Bot ${botToken}`,
            'User-Agent': 'Kleidi User Dashboard'
        },
        uri: `https://discordapp.com/api/guilds/${guildID}/members/${discordID}`,
        method: 'DELETE'
    }, (err, res, body) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, res.statusCode);
    });
};

discord.createDMChannel = function (botToken, userID, callback) {
    request({
        headers: {
            'Authorization': `Bot ${botToken}`,
            'User-Agent': 'Kleidi User Dashboard'
        },
        uri: `https://discordapp.com/api/users/@me/channels`,
        method: 'POST',
        json: {
            recipient_id: userID
        }
    }, (err, res, body) => {
        if (err) {
            return callback(err, null);
        }
        console.log(body)
        return callback(null, body.id);
    });
}

discord.dmUser = function (botToken, channelID, metadata, callback) {
    request({
        headers: {
            'Authorization': `Bot ${botToken}`,
            'User-Agent': 'Kleidi User Dashboard'
        },
        uri: `https://discordapp.com/api/channels/${channelID}/messages`,
        method: 'POST',
        json: metadata
    }, (err, res, body) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, res.statusCode);
    });
}

export default discord;