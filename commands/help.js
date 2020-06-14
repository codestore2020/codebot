const Discord = require("discord.js");

exports.run = async (client, message, args) => {
 
    let embed = new Discord.RichEmbed()
    .setTitle('Uw profiel')
    .addField('status: ', '' + message.author.presence.status)
    .setDescription('ID: '+ message.author.id)
    .addField('username: ', message.author.username + '');
    message.channel.send(embed);
    
    

}