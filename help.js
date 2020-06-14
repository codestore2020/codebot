const Discord = require('discord.js');

exports.run = async (client, message, args) => {
 
    const exampleEmbed = new Discord.MessageEmbed()
        .setTitle('Uw profiel')
        .addField('status: ',  message.authore.presence.status)
        .setDescription('ID: ', member.id)
        .addField('username: ', Member.username);
    
    channel.send(exampleEmbed);
    
    

}