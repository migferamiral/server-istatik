const Discord = require('discord.js');
const request = require('request');
exports.run = async function (client, message, args) {

var mcIP = args[0]; 
var mcPort = 25565;
  var url = 'http://mcapi.us/server/status?ip=' + mcIP + '&port=' + mcPort;
  request(url, async function(err, response, body) {
      if(err) {
          console.log(err);
          return message.reply('Minecraft sunucunuzun istatistiğini çekerken bir hata oluştu....');
      }
      body = JSON.parse(body);
      var status = 'Sunucunuz şu anda **kapalı**.';
      if(body.online) {
          status = 'Minecraft sunucunuz şu anda **açık**!  -  ';
          if(body.players.now) {
              status += '**' + body.players.now + '** kullanıcı sunucuda!';
          } else {
              status += 'Kimse sunucuda **değil**!';
          }
      }
      message.reply(status);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'istatistik',
  description: 'Sunucu istatistiğini gösterir.',
  usage: 'istatistik <ip>'
};