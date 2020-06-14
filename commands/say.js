const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.delete();

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Geen toegang").then(m => m.delete(5000));

  let botmessage = args.join(" ");

  message.channel.send(botmessage);
  
}

