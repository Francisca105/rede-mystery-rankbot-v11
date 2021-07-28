const Discord = require('discord.js');
const config = require("./config.json");
const db = require('quick.db');
const client = new Discord.Client('');
client.prefix = config.prefix;

client.on("ready", () => {
    console.log("Bot iniciado com sucesso!")
    client.user.setActivity(`${client.users.size} usuários!`, {type: "Watching"})
});

client.on("message", async message => {
    let msg =  message.content.toLowerCase();
    if (message.author.bot) return undefined;
    let user = message.author;
  
    let xp = await db.fetch(`xp_${user.id}`);
    if (xp === null) xp = 0;
    var add = Math.floor(Math.random() * 15) + 10;
    db.add(`xp_${user.id}`, add);


    if (message.content.indexOf(client.prefix) !== 0) return;
    const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        let commands = require(`./commands/${command}.js`);
        commands.run(client, message, args);
    } catch (e){
        console.log(e);
    } finally{}
});

client.on("guildMemberAdd", async member => {
    client.channels.get('590201737651027998').send(`Novo membro: **${member.user.username}** (${member.guild.name})`);
    client.user.setActivity(`${client.users.size} usuários!`, {type: "Watching"});
  });
  
  client.on("guildMemberRemove", async member => {
    client.channels.get('590201737651027998').send(`Saída de um membro: **${member.user.username}** (${member.guild.name})`);
    client.user.setActivity(`${client.users.size} usuários!`, {type: "Watching"});
  });
  
  client.on("guildCreate", async guild => {
    client.channels.get('590201737651027998').send(`Fui adicionado num novo servidor: **${guild.name}** (Owner: ${guild.owner.user.username})(Members: ${guild.memberCount})`);
    client.user.setActivity(`${client.users.size} usuários!`, {type: "Watching"});
  });
  
  client.on("guildDelete", async guild => {
    client.channels.get('590201737651027998').send(`Fui removido de um servidor: **${guild.name}**`);
    client.user.setActivity(`${client.users.size} usuários!`, {type: "Watching"});
  });

client.login(config.token);