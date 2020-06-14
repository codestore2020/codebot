const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermissions("MANAGE_MESSAGES"))return message.reply("you cant do theat");

    if (!args[0]) return message.channel.send("give me a number");

    if(Number.isInteger(parseInt(args[0]))){

        var amount = parseInt(args[0]) + 1;

        message.channel.bulkDelete(amount).then(() =>{

            message.channel.send(` ${args[0]}messages deleted`).then(msg => msg.delete(4000));

        })

    } else {
        return message.channel.send("give me a number");
    }

}

