const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if(message.author.id != "412696023237132308") return message.channel.send("U heeft geen permisies tot de **shutdown**command!")

    try {
        await message.channel.send("Bot gaat uit ...")
        process.exit()
    } catch (e) {
        message.channel.send(`[error] : ${e.message}`)
         
    }

}