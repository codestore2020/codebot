const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  
   if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Je hebt geen permissie voor dit commando!")
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!kUser) return message.channel.send("Geef een geldige gebruiker mee!")
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Deze gebruiker kan niet gekicked worden!");
    let reason = args.join(" ").slice(22);
    if (!reason) reason = "**Geen reden megegeven**";
    
    let kickEmbed2 = new Discord.RichEmbed()
    .setColor("#ff0000")
    .setThumbnail(client.user.displayAvatarURL)
    .setTitle(`Je bent gekicked van de **${message.guild}** discord server!`)
    .addField("Gekicked door:", message.author)
    .addField("Reden:", reason)
    try {
    await kUser.send(kickEmbed2);
    } catch (error) {
        message.channel.send(`Kon de gebruiker geen DM sturen!`);
    }

    message.channel.send(`${kUser} is succesvol gekicked!`);

    message.guild.member(kUser).kick(reason);
    
}