const discord = require('discord.js');
const config = require('../botConfig.json');

exports.run = (client, message, args) => { 

  var userName = message.author.username;

  let role = message.guild.roles.find(c => c.name ==='Ticket Support');
  let role2 = message.guild.roles.find(c => c.name ==='@everyone');
    
        var bool = false;

        message.guild.channels.forEach((channel) => {

          if (channel.name == "tickets" + userName.toLowerCase()) {
            
              bool = true;

          }

      });

      if (bool == true) return;

  message.guild.createChannel("ticket-" + userName.toLowerCase(), "text").then(c => {
      c.overwritePermissions(role, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });
          c.overwritePermissions(role2, {
          SEND_MESSAGES: false,
          READ_MESSAGES: false,
          ADD_REACTIONS: false
      });
          c.overwritePermissions(message.author, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });

      let bicon = client.user.displayAvatarURL;
      const ticketEmbed = new discord.RichEmbed()
      .setTitle("Bedankt voor het maken van een ticken, ons staff team helpt je zo snel mogelijk!")
      .setThumbnail(message.author.avatarURL)
      .setColor("GREEN")
      .setTimestamp()
      .setFooter("Ticket aangemaakt op:", bicon);
      c.send(ticketEmbed);
      geluktEmbed = new discord.RichEmbed()

      .setAuthor("Je ticket is aangemaakt!", bicon)
      .setColor("GREEN")
      .setAuthor("Done!", bicon)
      .setDescription(`Je hebt succesvol een ticket aangemaakt! Bekijk: ${c}`)

      message.channel.send(geluktEmbed);
  
      return;
  }).catch(console.error);

}