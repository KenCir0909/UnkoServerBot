const fs = require('fs');
const jimp = require("jimp");
const dataUriToBuffer = require('data-uri-to-buffer');
const { createCanvas } = require('canvas');
const { Message, MessageAttachment } = require("discord.js");
const { Database } = require('../unko/index');
const db = new Database('unkoserver.db');

module.exports = {
    info: {
        name: "rank",
        description: "MyrankとLevel確認",
        usage: "",
        aliases: [""],
        owneronly: false,
        adminonly: false,
        category: 'Main'
    },

    /**
     * @param {Message} message 
     */

    run: async function (client, message, args) {
        message.channel.startTyping();
        const user = message.mentions.users.first() || message.guild.member(args[0]);

        if (user) {
            const userleveldata = db.levelget(user.id, message.guild.id);
            const canvas = createCanvas(1500, 700);
            const ctx = canvas.getContext('2d');

            if (user.id === '714455926970777602') {
                ctx.font = '30px Impact';
                ctx.rotate(0);
                ctx.fillText(`${user.username}`, 5, 30);
                ctx.fillText(`${userleveldata.level}level ${userleveldata.xp}/${55 * userleveldata.level}xp`, 360, 370);
                const canvasDataUrl = canvas.toDataURL();
                const decoded = dataUriToBuffer(canvasDataUrl);

                fs.writeFile('./images/level.png', decoded, (err) => {
                    if (err) return console.log(err);

                    var images = [`./images/${user.id}.png`, './images/level.png'];
                    var jimps = [];
                    for (var i = 0; i < images.length; i++) {
                        jimps.push(jimp.read(images[i]));
                    }

                    Promise.all(jimps)
                        .then(function () {
                            return Promise.all(jimps);
                        })
                        .then(function (data) {
                            data[0].composite(data[1], 0, 0);
                            data[0].write('./images/rank.png', function () {
                                message.channel.send(new MessageAttachment('./images/rank.png'));
                                message.channel.stopTyping();
                            });
                        });

                });
            }
            else if (user.id === '440863982413283342') {
                ctx.font = '30px Impact';
                ctx.rotate(0);
                ctx.fillText(`${user.username}`, 420, 30);
                ctx.fillText(`${userleveldata.level}level ${userleveldata.xp}/${55 * userleveldata.level}xp`, 250, 240);
                const canvasDataUrl = canvas.toDataURL();
                const decoded = dataUriToBuffer(canvasDataUrl);

                fs.writeFile('./images/level.png', decoded, (err) => {
                    if (err) return console.log(err);

                    var images = [`./images/${user.id}.png`, './images/level.png'];
                    var jimps = [];
                    for (var i = 0; i < images.length; i++) {
                        jimps.push(jimp.read(images[i]));
                    }

                    Promise.all(jimps)
                        .then(function () {
                            return Promise.all(jimps);
                        })
                        .then(function (data) {
                            data[0].composite(data[1], 0, 0);
                            data[0].write('./images/rank.png', function () {
                                message.channel.send(new MessageAttachment('./images/rank.png'));
                                message.channel.stopTyping();
                            });
                        });

                });
            }
            else if (user.id === '515443335012286465') {
                ctx.font = '80px Impact';
                ctx.rotate(0);
                ctx.fillText(`${user.username}`, 420, 100);
                ctx.fillText(`${userleveldata.level}level ${userleveldata.xp}/${55 * userleveldata.level}xp`, 500, 450);
                const canvasDataUrl = canvas.toDataURL();
                const decoded = dataUriToBuffer(canvasDataUrl);

                fs.writeFile('./images/level.png', decoded, (err) => {
                    if (err) return console.log(err);

                    var images = [`./images/${user.id}.png`, './images/level.png'];
                    var jimps = [];
                    for (var i = 0; i < images.length; i++) {
                        jimps.push(jimp.read(images[i]));
                    }

                    Promise.all(jimps)
                        .then(function () {
                            return Promise.all(jimps);
                        })
                        .then(function (data) {
                            data[0].composite(data[1], 0, 0);
                            data[0].write('./images/rank.png', function () {
                                message.channel.send(new MessageAttachment('./images/rank.png'));
                                message.channel.stopTyping();
                            });
                        });

                });
            }
            else {
                ctx.font = '50px Impact';
                ctx.rotate(0);
                ctx.fillText(`${user.username}\n${userleveldata.level}level ${userleveldata.xp}/${55 * userleveldata.level}xp`, 500, 200);
                const canvasDataUrl = canvas.toDataURL();
                const decoded = dataUriToBuffer(canvasDataUrl);

                fs.writeFile('./images/level.png', decoded, (err) => {
                    if (err) return console.log(err);

                    var images = ['./images/default.png', './images/level.png'];
                    var jimps = [];
                    for (var i = 0; i < images.length; i++) {
                        jimps.push(jimp.read(images[i]));
                    }

                    Promise.all(jimps)
                        .then(function () {
                            return Promise.all(jimps);
                        })
                        .then(function (data) {
                            data[0].composite(data[1], 0, 0);
                            data[0].write('./images/rank.png', function () {
                                message.channel.send(new MessageAttachment('./images/rank.png'));
                                message.channel.stopTyping();
                            });
                        });
                });
            }
        }
        else {
            const userleveldata = db.levelget(message.author.id, message.guild.id);
            const canvas = createCanvas(1500, 700);
            const ctx = canvas.getContext('2d');

            if (message.author.id === '714455926970777602') {
                ctx.font = '30px Impact';
                ctx.rotate(0);
                ctx.fillText(`${message.author.username}`, 5, 30);
                ctx.fillText(`${userleveldata.level}level ${userleveldata.xp}/${55 * userleveldata.level}xp`, 360, 370);
                const canvasDataUrl = canvas.toDataURL();
                const decoded = dataUriToBuffer(canvasDataUrl);

                fs.writeFile('./images/level.png', decoded, (err) => {
                    if (err) return console.log(err);

                    var images = [`./images/${message.author.id}.png`, './images/level.png'];
                    var jimps = [];
                    for (var i = 0; i < images.length; i++) {
                        jimps.push(jimp.read(images[i]));
                    }

                    Promise.all(jimps)
                        .then(function () {
                            return Promise.all(jimps);
                        })
                        .then(function (data) {
                            data[0].composite(data[1], 0, 0);
                            data[0].write('./images/rank.png', function () {
                                message.channel.send(new MessageAttachment('./images/rank.png'));
                                message.channel.stopTyping();
                            });
                        });

                });
            }
            else if (message.author.id === '440863982413283342') {
                ctx.font = '30px Impact';
                ctx.rotate(0);
                ctx.fillText(`${message.author.username}`, 420, 30);
                ctx.fillText(`${userleveldata.level}level ${userleveldata.xp}/${55 * userleveldata.level}xp`, 250, 240);
                const canvasDataUrl = canvas.toDataURL();
                const decoded = dataUriToBuffer(canvasDataUrl);

                fs.writeFile('./images/level.png', decoded, (err) => {
                    if (err) return console.log(err);

                    var images = [`./images/${message.author.id}.png`, './images/level.png'];
                    var jimps = [];
                    for (var i = 0; i < images.length; i++) {
                        jimps.push(jimp.read(images[i]));
                    }

                    Promise.all(jimps)
                        .then(function () {
                            return Promise.all(jimps);
                        })
                        .then(function (data) {
                            data[0].composite(data[1], 0, 0);
                            data[0].write('./images/rank.png', function () {
                                message.channel.send(new MessageAttachment('./images/rank.png'));
                                message.channel.stopTyping();
                            });
                        });

                });
            }
            else if (message.author.id === '515443335012286465') {
                ctx.font = '80px Impact';
                ctx.rotate(0);
                ctx.fillText(`${message.author.username}`, 420, 100);
                ctx.fillText(`${userleveldata.level}level ${userleveldata.xp}/${55 * userleveldata.level}xp`, 500, 450);
                const canvasDataUrl = canvas.toDataURL();
                const decoded = dataUriToBuffer(canvasDataUrl);

                fs.writeFile('./images/level.png', decoded, (err) => {
                    if (err) return console.log(err);

                    var images = [`./images/${message.author.id}.png`, './images/level.png'];
                    var jimps = [];
                    for (var i = 0; i < images.length; i++) {
                        jimps.push(jimp.read(images[i]));
                    }

                    Promise.all(jimps)
                        .then(function () {
                            return Promise.all(jimps);
                        })
                        .then(function (data) {
                            data[0].composite(data[1], 0, 0);
                            data[0].write('./images/rank.png', function () {
                                message.channel.send(new MessageAttachment('./images/rank.png'));
                                message.channel.stopTyping();
                            });
                        });
                });
            }
            else {
                ctx.font = '50px Impact';
                ctx.rotate(0);
                ctx.fillText(`${message.author.username}\n${userleveldata.level}level ${userleveldata.xp}/${55 * userleveldata.level}xp`, 500, 200);
                const canvasDataUrl = canvas.toDataURL();
                const decoded = dataUriToBuffer(canvasDataUrl);

                fs.writeFile('./images/level.png', decoded, (err) => {
                    if (err) return console.log(err);

                    var images = ['./images/default.png', './images/level.png'];
                    var jimps = [];
                    for (var i = 0; i < images.length; i++) {
                        jimps.push(jimp.read(images[i]));
                    }

                    Promise.all(jimps)
                        .then(function () {
                            return Promise.all(jimps);
                        })
                        .then(function (data) {
                            data[0].composite(data[1], 0, 0);
                            data[0].write('./images/rank.png', function () {
                                message.channel.send(new MessageAttachment('./images/rank.png'));
                                message.channel.stopTyping();
                            });
                        });
                });
            }
        }

    }
};