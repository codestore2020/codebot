exports.run = (client, message) => {
    
    if (!(message.channel.name.startsWith("🎫"))) return message.channel.send("Dit commando werkt alleen in ticket channels");

    message.channel.delete();
 
}