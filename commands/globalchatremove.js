const { Client, Message } = require("discord.js");
const { Database } = require('../unko/index');
const db = new Database('unkoserver.db');

module.exports = {
    info: {
        name: "globalchatremove",
        description: "グローバルチャット削除関数",
        usage: "",
        aliases: [""],
        owneronly: true,
        adminonly: false,
        category: 'Owner'
    },

    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */

    run: async function (client, message, args) {
        const channel = client.channels.cache.get(args[0]);
        if (!channel) return message.reply('第一引数にグローバルチャットから削除するチャンネルIDを入れてください')
        db.globalchatdelete(channel.id);
        message.channel.send('削除しました')
    }
}