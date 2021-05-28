const { Client, MessageAttachment, WebhookClient } = require('discord.js');
const { clienterrorlog } = require('../../functions/error');

/**
 * @param {Client} client
 */

module.exports = (client) => {
    try {
        const time = new Date();
        client.db.backup(`dat/backup/${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}.backup.db`)
            .then(() => {
                const webhook = new WebhookClient('847789617386094602', '7165d2iwgA9eCT3zJkJ0KaWfvlviOVpk2prQdYW0Axp2kHXin4GBUh7ZMjs0HpUYfFSk');
                webhook.send(new MessageAttachment(`dat/backup/${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}.backup.db`));
            });

        client.channels.cache.get('774594290679545886').messages.fetch('794246738881019915')
            .then(msg => msg.reactions.removeAll())
            .then(msg => msg.react('844473484579307540'))
            .then(react => react.message.react('844473484788498442'))
            .then(react => react.message.react('844473484369461298'))
            .then(react => react.message.react('844473484645367818'));

        client.channels.cache.get('821686383605055508').messages.fetch('821726639443673089')
            .then(msg => msg.reactions.removeAll())
            .then(msg => msg.react('🎫'));
    } catch (error) {
        clienterrorlog(client, error);
    }
};