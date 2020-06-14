const discord = require("discord.js")
const fs = require("fs")

module.exports.run = async (bot, message, args) => {

    const categoryId = "673252441755746321";
    var userName = message.author.username;
    var bool = false;

    const filter = (reaction, user) => ['🥇', '🥈', '🥉', '🛑'].includes(reaction.emoji.name) && user.id === message.author.id;

    const embed = new discord.RichEmbed()
        .setTitle('weet u zeker dat u een ticket wil maken ')
        .setDescription(`

        🥇: **Klanten Service.**
        🥈: **Server Hulp.**
        🥉: **administratie.**
        🛑: **Annuleer.**
        *Annuleer of kies uw vorm van de ticket.*

        `)
        .setColor("#171717")
        .setFooter('Made By FuzeHosting ');
        
    message.channel.send(embed).then(async msg => {

        await msg.react('🥇');
        await msg.react('🥈');
        await msg.react('🥉');
        await msg.react('🛑');

        msg.awaitReactions(filter, {
            max: 1,
            time: 30000,
            errors: ['time']
        }).then(collected =>{

            const reaction = collected.first();

            switch (reaction.emoji.name){
                case '🛑', '🥉':
                    message.channel.send(`**Je hebt je ticket geannuleerd **of** de fungctie werkt nog nie**`).then(m => m.delete(10000));
                    msg.delete();
                    break
                    
                if (reaction.emoji.name === 🥈) {

                    embedMessage.delete()
                    settedParent.setName("sollicitatie-" + userName);

                    var vraagEmbed = new discord.MessageEmbed()
                        .setColor("#FF0000")
                        .setThumbnail(botIcon)
                        .setTitle(message.author.username.toString() + " | ticket 🎫")
                        .setDescription(`Bedankt voor het maken van een sollicitatieticket. Klik [hier](Link) om naar ons sollicitatieformulier te gaan.`)

                    settedParent.send(vraagEmbed)

                    }

                case '🥇':
                    message.guild.channels.forEach((channel) => {

                        if (channel.name == userName.toLowerCase()) {
                
                            message.channel.send("**Je hebt al een ticket open staan, Je kan deze sluiten met ``-close``**").then(m => m.delete(5000));
                            msg.delete();
                
                            bool = true;
                
                        }
                
                    });
                
                    if (bool == true) return;
                    if(!bool == false) return message.channel.send("Er ging iets fout.");
                
                    var embedCreateTicket = new discord.RichEmbed()
                    .setTitle("Beste, " + message.author.username)
                    .setFooter("Klanten Service kanaal wordt aangemaakt");

                    message.channel.send(embedCreateTicket);

                    message.guild.createChannel(userName, "text").then((createdChan) => {
                        createdChan.setParent(categoryId).then((settedParent) => {
                            settedParent.overwritePermissions(message.guild.roles.find('name', "@everyone"), { "READ_MESSAGES": false });
                
                            settedParent.overwritePermissions(message.author, {
                
                                "READ_MESSAGES": true, "SEND_MESSAGES": true,
                                "ATTACH_FILES": true, "CONNECT": true,
                                "CREATE_INSTANT_INVITE": false, "ADD_REACTIONS": true
                            });
                
                            var embedParent = new discord.RichEmbed()
                                .setTitle('Klanten Service')
                                .setDescription("Welkom, **" + message.author.username.toString() + "** Zet hier u vraag neer, U wordt zsm verder geholpen!");
                                
                            settedParent.send(embedParent);
                        }).catch(err => {
                            return;
                        });
                    }).catch(err => {
                        return;
                    });
                    msg.delete();
                    break
            }

        }).catch(collected =>{
            msg.delete();
            return;
        });

    });

};

module.exports.help = {
    name: "ticket"
};