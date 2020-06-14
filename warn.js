const discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

exports.run = async (client, message, args) => {
    
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Je hebt geen permissie voor dit commando!")
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!wUser) return message.channel.send("Geef een geldige gebruiker mee!");
    if(wUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Deze persoon kan niet gewaarschuwd worden!");
    let reason = args.join(" ").slice(22);
    if(!reason) return message.channel.send("Geef een reden mee!");

    if(!warns[wUser.id]) warns[wUser.id] = {
        warns: 0
};
 
warns[wUser.id].warns++;

fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err);
});

let warnEmbed2 = new discord.RichEmbed()
.setTitle(`U bent Officieel gewaarschuwd op **${message.guild}**  Laar ons niet nog meer waarschuwen`)
.setColor("#ff0000")
.setThumbnail(client.user.displayAvatarURL)
.addField("Gewaarschuwd door:", message.author)
.addField("Totaal aantal waarschuwingen:", warns[wUser.id].warns)
.addField("Reden:", reason);

try {
wUser.send(warnEmbed2);
} catch (error) {
        message.channel.send(`Kon de gewaarschuwde gebruiker geen DM sturen!`);
    }

return message.channel.send(`${wUser} is succesvol gewaarschuwd!`)


}