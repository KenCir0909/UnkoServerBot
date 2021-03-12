const { Message, MessageEmbed } = require('discord.js');
const { Menu } = require('discord.js-menu');
const { json } = require('express');
const { inspect } = require('util');

module.exports = {
  info: {
    name: "eval",
    description: "jsのコードを実行するなんか",
    usage: "",
    aliases: [""],
    botownercommand: true,
    botadmincommand: false
  },

  /**
   * @param {Message} message
   */

  run: async function (client, message, args) {
    let evalMenu = new Menu(message.channel, message.author.id, [
      {
        name: 'main',
        content: new MessageEmbed()
          .setDescription('```js\n' + args.join(' ') + '```')
          .setColor('RANDOM')
          .setTimestamp(),
        reactions: {
          '810436146718441483': 'yes',
          '810436146978619392': 'delete'
        }
      },
      {
        name: 'yes',
        content: new MessageEmbed()
          .setDescription('```js\n' + args.join(' ') + '```')
          .setColor('RANDOM')
          .setTimestamp(),
        reactions: {
          '⏹': 'delete'
        }
      }
    ], 60000)
    evalMenu.start()
    evalMenu.on('pageChange', async destination => {
      if (destination.name === "yes") {
        let evaled;
        try {
          evaled = await eval(args.join(' '));
          const evalinsoext = inspect(evaled).length
          if (evalinsoext <= 2000) {
            message.react('✅');
            message.channel.send(new MessageEmbed()
              .setDescription('```' + inspect(evaled) + '```')
              .setColor('RANDOM')
              .setTimestamp());
          }
          else {
            message.react('❌');
          }
        }
        catch (error) {
          message.reply(new MessageEmbed()
            .setDescription('```' + error + '```')
            .setColor('RANDOM')
            .setTimestamp());
        }
      }
    })
  },
};