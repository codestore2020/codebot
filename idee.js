const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

if(!args[0]) return message.channel.send("Geef je idee mee!");

var ideeChannel = message.guild.channels.find(`name`, "「🤔」ideeen");
var persoon = message.member;
var idee = args.join(" ").slice();

const ideeEmbed = new discord.RichEmbed()
.setTitle(`Nieuw idee van ${persoon.user.username}!`)
.setColor("#ffa500")
.setThumbnail(persoon.displayAvatarURL)
.setDescription(idee)

ideeChannel.send(ideeEmbed).then(
    m => m.react('👍').then(() => m.react('👎')))

return message.channel.send("Je idee is ingediend!");

}