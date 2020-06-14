const discord = require("discord.js");
const client = new discord.Client();
const botConfig = require("./botConfig.json")
const levelfile = require("./data/levels/levels.json");
const fs = require("fs");

giveaways = require("discord-giveaways");

const active = new Map();

client.on("message", message => {

    // Genereer random xp.
    var randomxp = Math.floor(Math.random(1) * 15) + 1;

    // Verkrijg id van de gebruiker.
    var idUser = message.author.id;

    // console.log(randomxp);

    // Als persoon nog niet in file is maak dan standaard aan.
    if (!levelfile[idUser]) {

        levelfile[idUser] = {

            xp: 0,
            level: 0

        };

    }

    // Voeg xp toe.
    levelfile[idUser].xp += randomxp;

    // Verkrijg level van de gebruiker.
    var levelUser = levelfile[idUser].level;
    // Verkrijg xp van de gebruiker.
    var xpUser = levelfile[idUser].xp;
    // Bereken volgend level op basis van de xp.
    var nextLevelXp = levelUser * 300;

    // Als het level 0 is zet dan xp op 100.
    if (nextLevelXp === 0) nextLevelXp = 100;

    console.log(nextLevelXp + " " + xpUser);

    // Als gebruikeer volgend level heeft bereikt zet level 1 hoger en zet in file.
    // Let op Nodemon restart wegens dat we de file als require hebben binnengehaald.
    if (xpUser >= nextLevelXp) {

        levelfile[idUser].level += 1;

        // Wegschrijven van data. Je kan dit ook altijd opslaan maar dit zorgt ervoor dat het data
        // verkeer te groot wordt.
        fs.writeFile("./data/levels/levels.json", JSON.stringify(levelfile), err => {

            if (err) console.log(err);

        );
    };  

    // Zenden van een embed met gegevens.
    var embedLevel = new discord.MessageEmbed()
        .setTitle("***Level hoger***")
        .setColor("#29e53f")
        .addField("Nieuw level: ", levelfile[idUser].level);
    message.channel.send(embedLevel);

    message.author.send("gg je bent level up ")

    var a = new discord.MessageEmbed()
    .addField("Nieuw level: ", levelfile[idUser].level);
    message.author.send(a);

}
if (message.author.bot) return;
if(message.content.indexOf(botConfig.prefix) !== 0) return;

var options = {
    active: active
}

const args = message.content.slice(botConfig.prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

try {
let commandFile = require(`./commands/${command}.js`);
commandFile.run(client, message, args, options);
} catch (err) {
console.error(err);
}
});

client.on("guildMemberAdd", member => {

        member.addRole("707991372996804708");

        const channel = member.guild.channels.find("name", "👋🏼-¦-welkom");
        if (!channel) console.log("Kan het kanaal niet vinden.");
 
        var joinEmbed = new discord.RichEmbed()
            .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
            .setDescription(`———————————————————\nWelkom ${member.user.username}\nVeel plezier in de server\n———————————————————\n©️Code Store`)
            .setColor("#00FF00")
            .setTimestamp()
            .setFooter("Gebruiker gejoined.");
 
        channel.send(joinEmbed);
//———————————————————
//Welkom ${member.user.username}
//Veel plezier in de server 
//———————————————————
//©️Code Store
    });

client.on("guildMemberRemove", member => {
 
    const channel = member.guild.channels.find("name", "👋🏼-¦-welkom");
    if (!channel) console.log("Kan het kanaal niet vinden.");
     
    var LeaveEmbed = new discord.RichEmbed()
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
        .setColor("#FF0000")
        .setDescription(`———————————————————\nJammer dat ${member.user.username} geleavd is\nHopenlijk zien we je snel weer!\n———————————————————\n©️Code Store`)
        .setTimestamp()
        .setFooter("Gebruiker Geleaved.");
     
    channel.send(LeaveEmbed);
     
});
    

client.on("ready", () => {
console.log("De bot is opgestart")
client.user.setActivity("Code Store");
client.user.setStatus('dnd');

giveaways.launch(client, {
    updateCountdownEvery: 5000,
    botsCanWin: false,
    ignoreIfHasPermission: [
        "MANAGE_MESSAGES",
        "MANAGE_GUILD",
        "ADMINISTRATOR"
    ],
    embedColor: "#FF0000",
    reaction: "🎉",
    storage: __dirname+"/giveaways.json"
});

});

const events = {
    MESSAGE_REACTION_ADD: 'messageReactionAdd' 
};

client.on('raw', async event => {
 
    if (!events.hasOwnProperty(event.t)) return;
 
    const { d: data } = event;
    const user = client.users.get(data.user_id);
    const channel = client.channels.get(data.channel_id) || await user.createDM();
   
    if (channel.messages.has(data.message_id)) return;
   
    const message = await channel.fetchMessage(data.message_id);
   
    const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
    const reaction = message.reactions.get(emojiKey);
 
    client.emit(events[event.t], reaction, user);
 
});

client.on('messageReactionAdd', (reaction, user) => {
    
    var channelID = reaction.message.channel.id;

    if (channelID == "707662115107897371") {

        if (user.bot) return;

        if(reaction.emoji == '⛵') {
        var server = client.guilds.get("707882384032399431");
        let member = server.members.get(user.id);
        let rol1 = server.roles.find(r => r.name == "🔔 Tags Youtube/Twitch");

        member.addRole(rol1);

        reaction.remove(member);

        member.send('Je hebt de `🔔 Tags Youtube/Twitch` rol ontvangen!');

       }

       if(reaction.emoji == '📩') {
        var server = client.guilds.get("669926189036470282");
        let member = server.members.get(user.id);
        let rol2 = server.roles.find(r => r.name == "Updates");

        member.addRole(rol2);

        reaction.remove(member);

        member.send('Je hebt de `Updates` rol ontvangen!');

       }
    }
});

client.login(process.env.token);