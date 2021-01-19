const { Client, Message, MessageEmbed } = require('discord.js');
const { Menu } = require('discord.js-menu');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./unkoserver.db');

const emojidata = ['<:unkooo:790538555407597590>', '<:emoji_105:790546312679391243>', '<:emoji_104:790546297521307668>'];

module.exports = {
    info: {
        name: "Littlewar",
        description: "小戦争",
        usage: "",
        aliases: [""],
        botownercommand: false,
        botadmincommand: false
    },
/**
 * @param {Message} message
 * @param {Client} client
 */
    run: async function(client, message, args) {
        if(message.channel.id !== '798157114555105330' && message.channel.id !== '798176065562476604' && message.channel.id !== '798198069849227294' && message.channel.id !== '798486503255834664' && message.channel.id !== '798570749136601158' && message.guild.id === '706452606918066237') {
            message.delete();
            const reply = await message.reply('そのコマンドは<#798157114555105330>・<#798176065562476604>、<#798198069849227294>、<#798486503255834664>、<#798570749136601158>でしか使用できません<a:owoxgif:793460058250805259>');
            reply.delete({ timeout: 5000 });
            return;
        }
        let littlewardata = client.getLittlewar.get(message.guild.id);
        if (!littlewardata) {
            littlewardata = { id: message.guild.id, user: message.author.id, guild: message.guild.id, emoji1: 1, emoji2: 1, emoji3: 1, number: 0 }
        } 
      　if(littlewardata.number === 0){
          littlewardata.emoji1 = Math.ceil( Math.random()*13 );
          littlewardata.emoji2 = Math.ceil( Math.random()*13 );
          littlewardata.emoji3 = Math.ceil( Math.random()*13 );
          let LittlewarMenu = new Menu(message.channel, message.author.id, [
            {
                name: 'main',
                content: new MessageEmbed()
                .setDescription(`絵文字をリアクションの中から1つ選んでください`)
                .setColor('RANDOM')
                .setTimestamp(),
                reactions: {
                    '790538555407597590': 'emoji1',
                    '790546312679391243': 'emoji2',
                    '790546297521307668': 'emoji3'
                }
            },
            {
                name: 'emoji1',
                content: new MessageEmbed()
                .setDescription(`データを保存しました\n結果が出ましたら通知します`)
                .setColor('RANDOM')
                .setTimestamp(),
                reactions: {
                    '⏹': 'delete'
                }
            },
            {
                name: 'emoji2',
                content: new MessageEmbed()
                .setDescription(`データを保存しました\n結果が出ましたら通知します`)
                .setColor('RANDOM')
                .setTimestamp(),
                reactions: {
                    '⏹': 'delete'
                }
            },
            {
                name: 'emoji3',
                content: new MessageEmbed()
                .setDescription(`データを保存しました\n結果が出ましたら通知します`)
                .setColor('RANDOM')
                .setTimestamp(),
                reactions: {
                    '⏹': 'delete'
                }
            }
        ], 60000)
        LittlewarMenu.start()
        LittlewarMenu.on('pageChange', destination => {
            if (destination.name === 'emoji1') {
                littlewardata.number = littlewardata.emoji1;
            }
            else if (destination.name === 'emoji2') {
                littlewardata.number = littlewardata.emoji2;
            }
            else if (destination.name === 'emoji3') {
                littlewardata.number = littlewardata.emoji3;
            }
            client.setLittlewar.run(littlewardata);
          })
        }
        else{
            if(littlewardata.user === message.author.id){
                message.delete();
                message.reply('自分を相手にするなや＾＾；').then( msg => {
                    msg.delete({ timeout: 5000 });
                });
                return;
            }
            let LittlewarMenu = new Menu(message.channel, message.author.id, [
                {
                    name: 'main',
                    content: new MessageEmbed()
                    .setDescription(`絵文字をリアクションの中から1つ選んでください`)
                    .setColor('RANDOM')
                    .setTimestamp(),
                    reactions: {
                        '790538555407597590': 'emoji1',
                        '790546312679391243': 'emoji2',
                        '790546297521307668': 'emoji3'
                    }
                },
                {
                    name: 'emoji1',
                    content: new MessageEmbed()
                    .setDescription(`${emojidata[0]}を選択した！`)
                    .setColor('RANDOM')
                    .setTimestamp(),
                    reactions: {
                        '⏹': 'delete'
                    }
                },
                {
                    name: 'emoji2',
                    content: new MessageEmbed()
                    .setDescription(`${emojidata[1]}を選択した！`)
                    .setColor('RANDOM')
                    .setTimestamp(),
                    reactions: {
                        '⏹': 'delete'
                    }
                },
                {
                    name: 'emoji3',
                    content: new MessageEmbed()
                    .setDescription(`${emojidata[2]}を選択した！`)
                    .setColor('RANDOM')
                    .setTimestamp(),
                    reactions: {
                        '⏹': 'delete'
                    }
                }
            ], 60000)
            LittlewarMenu.start()
            LittlewarMenu.on('pageChange', destination => {
                let usermoneydata = client.getMoney.get(message.author.id, message.guild.id);
                if (!usermoneydata) {
                  usermoneydata　= { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, money: 0, dailylogin: 0 }
                }
                let playermoneydata = client.getMoney.get(littlewardata.user, message.guild.id);
                if (!playermoneydata) {
                   playermoneydata　= { id: `${littlewardata.user}-${message.author.id}`, user: littlewardata.user, guild: message.guild.id, money: 0, dailylogin: 0 }
                }
                let playeremojidata = 1;
                if (destination.name === 'emoji1'){
                    playeremojidata = littlewardata.emoji1;
                }
                else if (destination.name === 'emoji2'){
                    playeremojidata = littlewardata.emoji2;
                }
                else if (destination.name === 'emoji3'){
                    playeremojidata = littlewardata.emoji3;
                }
                if(playeremojidata > littlewardata.number){
                    usermoneydata.money += 10000;
                    playermoneydata.money -= 10000;
                    message.channel.send(`<@${littlewardata.user}>`,
                        new MessageEmbed()
                        .setDescription(`今回の勝負\n${message.author}の勝ち！`)
                        .setColor('RANDOM')
                        .setTimestamp()
                    );
                }
                else if(playeremojidata < littlewardata.number){
                    usermoneydata.money -= 10000;
                    playermoneydata.money += 10000;
                    message.channel.send(`<@${littlewardata.user}>`,
                        new MessageEmbed()
                        .setDescription(`今回の勝負\n<@${littlewardata.user}>の勝ち！`)
                        .setColor('RANDOM')
                        .setTimestamp()
                    );
                }
                else{
                    message.channel.send(`<@${littlewardata.user}>`,
                        new MessageEmbed()
                        .setDescription(`今回の勝負\n引き分け！`)
                        .setColor('RANDOM')
                        .setTimestamp()
                    );
                }
                sql.prepare(`DELETE FROM littlewar WHERE guild = '${message.guild.id}'`).run();
                client.setMoney.run(usermoneydata);
                client.setMoney.run(playermoneydata);
            })
        }
    },
};