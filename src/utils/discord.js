import request from 'request';

export function inviteToGuild(guildID, discordID, access_token, roles, callback) {
    request({
        headers: {
            "Authorization": "Bot NTM5NjA2Mjg2NjIzNDQwOTA4.D2N-6A.DZMT1u5M7ahPdPqXRgwpERREXEo",
            "User-Agent": "The Bandit Block User Dashboard"
        },
        uri: `https://discordapp.com/api/guilds/${guildID}/members/${discordID}`,
        method: "PUT",
        json: {
            access_token: access_token,
            roles: roles
        }
    }, (err, res, body) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, body);
    });
};