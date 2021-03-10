const { Client, Message, MessageEmbed, WebhookClient } = require('discord.js');
const { Database } = require('../../unko/index');
const db = new Database('unkoserver.db');

/**
 * @param {Client} client
 * @param {Message} message
 */

module.exports = async (client, message) => {
  if (!message.guild || message.system || message.author.bot) return;

  if (message.channel.name === 'うんこ鯖グローバルチャット' || message.channel.name === 'カスクラグローバルチャット') {
    if (message.attachments.size <= 0) {
      message.delete()
    }
    client.channels.cache.forEach(channel => {
      let username = message.author.tag;
      if (message.member.nickname)
        username = message.member.nickname + `(${message.author.tag})`;
      if (message.attachments.size <= 0) {
        const embed = new MessageEmbed()
          .setAuthor(username, message.author.avatarURL())
          .setDescription(message.content)
          .setColor('RANDOM')
          .setFooter(message.guild.name + ' | ' + message.channel.name, message.guild.iconURL())
          .setTimestamp()
        if (channel.name === 'うんこ鯖グローバルチャット' || channel.name === 'カスクラグローバルチャット') {
          channel.send(embed)
        }
      }
      if (!message.attachments.forEach(attachment => {
        const embed = new MessageEmbed()
          .setAuthor(username, message.author.avatarURL())
          .setImage(attachment.url)
          .setDescription(attachment.url)
          .setColor('RANDOM')
          .setFooter(message.guild.name + ' | ' + message.channel.name, message.guild.iconURL())
          .setTimestamp()
        if (channel.name === 'うんこ鯖グローバルチャット' || channel.name === 'カスクラグローバルチャット') {
          channel.send(embed)
        }
      }));
    });
  };

  let usermoneydata = db.MoneyGet(message.author.id, message.guild.id);
  let userdailydata = db.DailyGet(message.author.id, message.guild.id);

  if (usermoneydata.ticket === null) {
    usermoneydata.ticket = 0;
  }
  else if (usermoneydata.tuna === null) {
    usermoneydata.tuna = 0;
  }

  if (userdailydata.login === 0 && usermoneydata.tuna === 0 && message.guild.id === '706452606918066237') {
    userdailydata.login = 1;
    usermoneydata.dailylogin += 1;
    usermoneydata.money += 10000 * usermoneydata.dailylogin;
    message.channel.send(
      new MessageEmbed()
        .setDescription(`<@${message.author.id}>、あなたは現在うんこ鯖に${usermoneydata.dailylogin}日浮上しています！\nデイリーボーナスとして${10000 * usermoneydata.dailylogin}うんコイン獲得しました！`)
        .setColor('RANDOM')
        .setTimestamp()
    );
  }

  if (usermoneydata.money < 10000 && usermoneydata.tuna !== 0) {
    usermoneydata.money += message.content.length * 10;
    if (usermoneydata.money > 9999) {
      usermoneydata.money = 10000;
    }
  }

  if (usermoneydata.money < -99999 && usermoneydata.tuna === 0) {
    message.member.roles.add('798570033235755029');
    usermoneydata.tuna = 1;
    const webhook = new WebhookClient('798186603235246111', 'Rf6vyUbm7GuwLOmmHseu-QZp7bV7QOYykwEoqzrSLX3Rjkza_7ipOsbJQGe9BKoGNiHn');
    webhook.send(`${message.author}、開けろごらああ！てめえ自分が何シてんのかわかってるのか！！？\n${usermoneydata.money * -1}円、しっかり払ってもらうで`)
  }
  else if (usermoneydata.money > -1 && usermoneydata.tuna === 1) {
    usermoneydata.tuna = 0;
    message.member.roles.remove('798570033235755029');
    const webhook = new WebhookClient('798186603235246111', 'Rf6vyUbm7GuwLOmmHseu-QZp7bV7QOYykwEoqzrSLX3Rjkza_7ipOsbJQGe9BKoGNiHn');
    webhook.send(`${message.author}、確かに借金は返してもらった、もう二度と借金すんじゃねえぞ。`);
  }

  db.MoneySet(usermoneydata);
  db.DailySet(userdailydata);

  if (message.channel.parentID === '798186356105936956') {
    message.member.roles.add('798533393448960020');
  }
  else if (message.channel.parentID === '801057223139917884') {
    message.member.roles.add('801796340057112589');
  }

  const URL_PATTERN = /http(?:s)?:\/\/(?:.*)?discord(?:app)?\.com\/channels\/(?:\d{17,19})\/(?<channelId>\d{17,19})\/(?<messageId>\d{17,19})/g;
  let result;
  while ((result = URL_PATTERN.exec(message.content)) !== null) {
    const group = result.groups;
    client.channels.fetch(group.channelId)
      .then(channel => channel.messages.fetch(group.messageId))
      .then(targetMessage => message.channel.send(targetMessage.author.username + 'のメッセージを展開します\n\n',
        new MessageEmbed()
          .setDescription(targetMessage.cleanContent)
          .setColor('RANDOM')
          .setTimestamp()))
      .catch(error => message.reply(error)
        .then(message => message.delete({ timeout: 10000 }))
        .catch(console.error)
      );
  }

  if (!message.content.startsWith(process.env.PREFIX)) return;
  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if (!command) return;
  const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.info.aliases && cmd.info.aliases.includes(command));
  if (!cmd || cmd.info.botownercommand && process.env.OWNERID !== message.author.id || cmd.info.botadmincommand && !message.member.roles.cache.has('771015602180587571') && message.member.guild.owner.id !== message.author.id && message.guild.id === '706452606918066237') {
    message.react('793460058250805259');
    return message.reply('そんなコマンドないで。😉');
  }
  cmd.run(client, message, args);
};