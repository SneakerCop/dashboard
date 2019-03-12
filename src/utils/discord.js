import request from 'request';
let discord = {};
discord.inviteToGuild = function (botToken, guildID, discordID, access_token, roles, callback) {
    request({
        headers: {
            'Authorization': `Bot ${botToken}`,
            'User-Agent': 'The Bandit Block User Dashboard'
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
            'User-Agent': 'The Bandit Block User Dashboard'
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

discord.dmUser = function (botToken, userID, callback) {
    request({
        headers: {
            'Authorization': `Bot ${botToken}`,
            'User-Agent': 'The Bandit Block User Dashboard'
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
        return callback(null, res.statusCode);
    });
}

export default discord;