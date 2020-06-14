const discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    var icon = message.guild.iconURL;
    const exampleEmbed = new discord.MessageEmbed()
        .setTitle('Server Info')
        .setColor("RANDOM")
        .addField('Server Eigenaar : ', message.guild.owner)
        .addField('Server Naam : ', message.guild.name)
        .addField('Aantal Members : ', message.guild.memberCount)
        .setFooter('Oefenbot | Made by Beertje');
    message.channel.send(exampleEmbed);
}