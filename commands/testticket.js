const Discord = require("discord.js");
const botConfig = require("../ticket.json")

module.exports.run = async (bot, message, args) => {
    let onderwerp = args.join(" ") || "Niet meegegeven"
    let ticketRole = botConfig.ticketRole;
    let categoryID = botConfig.ticketCata
    let userName = message.author.username;
    let cata = message.guild.channels.cache.find(c => c.id == categoryID && c.type == "category")
    client.log("Ticket gemaakt", "Ticket gemaakt door: " + message.author.tag + "\nReden: " + onderwerp)
    if (!cata) return message.channel.send("Ik kan de ticket categorie niet vinden!")
    message.guild.channels.create(`support-${message.author.username}`, { type: "text" }).then((createdChan) => {
        createdChan.setParent(categoryID).then((settedParent) => {

            if (message.guild.roles.cache.get(ticketRole)) {
                settedParent.overwritePermissions([{
                    id: ticketRole,
                    allow: ['VIEW_CHANNEL', "SEND_MESSAGES"],
                }, {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL', "SEND_MESSAGES"],
                }, {
                    id: message.guild.roles.cache.find(r => r.name == "@everyone").id,
                    deny: ['VIEW_CHANNEL', "SEND_MESSAGES"],
                }
                ])
            } else {
                settedParent.overwritePermissions([{
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL', "SEND_MESSAGES"],
                }, {
                    id: message.guild.roles.cache.find(r => r.name == "@everyone").id,
                    deny: ['VIEW_CHANNEL', "SEND_MESSAGES"],
                }
                ]);
            }
            var botIcon = bot.user.displayAvatarURL;
            var one = require("discord-emoji").symbols.one;
            var two = require("discord-emoji").symbols.two;
            var three = require("discord-emoji").symbols.three;
            var four = require("discord-emoji").symbols.four;

            var embedParent = new Discord.MessageEmbed()
                .setThumbnail(botIcon)
                .setColor("RANDOM")
                .setTitle(message.author.username.toString() + " | ticket🎫")
                .setDescription("Bedankt van het maken van een ticket! beantwoord zo snel mogelijk de vraag hieronder!")
                .addField("reageer met:", "1️⃣ Als het over een **solicitatie** gaat.\n2️⃣ Als u een **besteling** wilt plaatsen.\n3️⃣ Als u een **overige** vraag hebt.")
                .addField("met vriendelijke groet:", "Team QueCraft.");
            settedParent.send(embedParent).then(async function (embedMessage) {

                await embedMessage.react(one);
                await embedMessage.react(two);
                await embedMessage.react(three);

                const filter = (reaction, user) => {
                    return [one, two, three].includes(reaction.emoji.name) && user.id === message.author.id;
                };

                embedMessage.awaitReactions(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                })
                    .then(collected => {
                        const reaction = collected.first();

                        if (reaction.emoji.name === one) {

                            embedMessage.delete()
                            settedParent.setName("🎫sollicitatie-" + userName);

                            var botEmbed = new Discord.MessageEmbed()
                                .setColor("#FF0000")
                                .setThumbnail(botIcon)
                                .setTitle(message.author.username.toString() + " | solicitatie 🎫")
                                .setDescription(`Bedankt voor het maken van een sollicitatie ticket. Ons staff team zal u zo snel mogelijk helpen.`)
                                .addField("categorie : ", `**sollicitatie**`)
                                .addField("Ticket maker : ", `**${message.author}**`, true)
                                .addField("Reden : ", `**${onderwerp}**`)

                            settedParent.send(botEmbed)

                            var botEmbedAuthor = new Discord.MessageEmbed()
                                .setColor("#FF0000")
                                .setThumbnail(botIcon)
                                .setTitle(message.author.username.toString() + " | sollicitatie 🎫")
                                .setDescription(`Bedankt voor het maken van een sollicitatie ticket. Ons staff team zal u zo snel mogelijk helpen.`)
                                .addField("categorie : ", `**Sollicitatie**`)
                                .addField("Ticket maker : ", `**${message.author}**`, true)
                                .addField("Reden : ", `**${onderwerp}**`)
                                .addField("uw ticket : ", `**${createdChan}**`)
                            message.author.send(botEmbedAuthor)
                            

                        } else if (reaction.emoji.name === two) {

                            embedMessage.delete()
                            settedParent.setName("🎫-Bot-" + userName);

                            var designEmbed = new Discord.MessageEmbed()
                                .setColor("#FF0000")
                                .setThumbnail(botIcon)
                                .setTitle(message.author.username.toString() + " | Bot 🎫")
                                .setDescription(`Bedankt voor het maken van een Bot ticket.`)
                                .addField("categorie : ", `**Bot**`)
                                .addField("Ticket maker : ", `**${message.author}**`, true)
                                .addField("Reden : ", `**${onderwerp}**`)
                            message.channel.send(designEmbed)

                            var designEmbedAuthor = new Discord.MessageEmbed()
                            .setColor("#FF0000")
                            .setThumbnail(botIcon)
                            .setTitle(message.author.username.toString() + " | Bot 🎫")
                            .setDescription(`Bedankt voor het maken van een Bot ticket.`)
                            .addField("categorie : ", `**Bot**`)
                            .addField("Ticket maker : ", `**${message.author}**`, true)
                            .addField("Reden : ", `**${onderwerp}**`)
                            .addField("uw ticket : ", `**${createdChan}**`)
                            message.author.send(designEmbedAuthor)
                        
                        } else if (reaction.emoji.name === three) {

                            embedMessage.delete()
                            settedParent.setName("🎫-Website bug-" + userName);

                            var websiteEmbed = new Discord.MessageEmbed()
                                .setColor("#FF0000")
                                .setThumbnail(botIcon)
                                .setTitle(message.author.username.toString() + " | Website bug 🎫")
                                .setDescription(`Bedankt voor het maken van een Website bug ticket.`)
                                .addField("categorie : ", `**Website bug**`)
                                .addField("Ticket maker : ", `**${message.author}**`, true)
                                .addField("Reden : ", `**${onderwerp}**`)
                            settedParent.send(websiteEmbed)

                            var websiteEmbedAuthor = new Discord.MessageEmbed()
                            .setColor("#FF0000")
                            .setThumbnail(botIcon)
                            .setTitle(message.author.username.toString() + " | Website bug 🎫")
                            .setDescription(`Bedankt voor het maken van een Website bug ticket.`)
                            .addField("categorie : ", `**Website bug**`)
                            .addField("Ticket maker : ", `**${message.author}**`, true)
                            .addField("Reden : ", `**${onderwerp}**`)
                            .addField("uw ticket : ", `**${createdChan}**`)

                            message.author.send(websiteEmbedAuthor)

                        }
                    })
                    .catch(collected => {
                        settedParent.delete();
                    });

            })

            message.channel.send(`${message.author}, zie ${createdChan} voor je ticket!`);

        }).catch(err => {
            message.channel.send("Er is iets fout gelopen. Meld dit aan een moderator!");
            console.log("Ticket error: ", err)
        });


    }).catch(err => {
        message.channel.send("Er is iets fout gelopen. Meld dit aan een moderator!");
        console.log("Ticket create error: ", err)

    });

  
}

exports.help = "Maak een ticket."