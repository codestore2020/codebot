const discord = require("discord.js");

module.exports.run = async(bot, message, args) => { 
    
    const member = message.mentions.members.first() || message.member;  

    var icon = message.guild.iconURL;

    var botEmbed = new discord.MessageEmbed()
    .addField("Nickname:", member.displayName)
    .setColor("RANDOM")
    .addField("ID ", member.id)
    .addField("Status ", member.presence.status)
    .setThumbnail(icon);
    message.channel.send(botEmbed);

}