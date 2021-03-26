const fs = require('fs');
const request = require('request');
const { Message, Client } = require("discord.js");
const { Database } = require('../unko/index');
const rankimage = require('../dat/json/rankimage.json');
const db = new Database('unkoserver.db');

module.exports = {
    info: {
        name: "request",
        description: "rank画像リクエスト",
        usage: "",
        aliases: [""],
        owneronly: false,
        adminonly: false,
        category: 'Level'
    },

    /**
     * @param {Client} client 
     * @param {Message} message 
     */

    run: async function (client, message, args) {
        const userleveldata = db.levelget(message.author.id, message.guild.id);
        if (userleveldata.level < 10) {
            message.react('793460058250805259');
            return message.reply('画像背景申請はLevel10以上になってから使用できます！');
        }

        if (message.attachments.size <= 0) {
            message.react('816282137065947136');
            return message.reply('リクエストする画像を一緒に送信してください！');
        }
        message.attachments.forEach(attachment => {
            request(
                {
                    method: 'GET',
                    url: attachment.url,
                    encoding: null
                },
                function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        fs.writeFileSync(`./dat/images/${message.author.id}.png`, body, 'binary');
                        rankimage[message.author.id] = {
                            "font": 80,
                            "fillStyle": "#000000",
                            "imagex": attachment.width,
                            "imagey": attachment.height
                        }
                        fs.writeFile('./dat/json/rankimage.json', JSON.stringify(rankimage, null, ' '), (err) => {
                            if (err) {
                                console.log(err);
                                return message.channel.send(err, { code: true });
                            }

                            message.channel.send('level画像を設定しました！');
                        });
                    }
                }
            );
        })
    }
}