const Discord = require("discord.js"), cooldowns = new Discord.Collection();
const Database = require("../Basicfile/Helpers/Database");

module.exports = async (client, message, args) => {

  let m1 = message.content.split(" ").slice(1, 2).join(" ");
  let m2 = message.content.split(" ").slice(2, 3).join(" ");
  if (message.content === `!재고충전 ${m1} ${m2}`) {

  } else {
    if (message.author.bot || message.author === client.user) return;
  }

  const db = new Database("./Servers/license", "blacklist");

  let serid = await db.get(`state.${message.guild.id}`);

  if (serid == true) return message.reply(`사용하실 수 없습니다. 자판기관리자에게 문의주세요`)

  const tdb = new Database("./Servers/times", "license");

  let tr = await tdb.get(`trstat.${message.guild.id}`);
  let str = await tdb.get(`str.${message.guild.id}`);
  let strs = await tdb.get(`strs.${message.guild.id}`);
  const trs = await tdb.get(`str.${message.guild.id}`);
  const trss = await tdb.get(`strs.${message.guild.id}`);

  let ms1 = message.content.split(" ").slice(1, 2).join(" ");

  if (strs - (Date.now() - str) < 0) {
    if (message.content === `${client.config.prefix}발급 ${m1} ${m2}` || message.content === `${client.config.prefix}등록 ${m1}` || message.content === `${client.config.prefix}남은기간` || message.content === `${client.config.prefix}등록` || message.content === `${client.config.prefix}발급` || message.content === `${client.config.prefix}연장 ${m1} ${m2}`) {

    } else {
      return
    }
  }
  if (!tr || tr == false) {
    if (message.content === `${client.config.prefix}발급 ${m1} ${m2}` || message.content === `${client.config.prefix}등록 ${m1}` || message.content === `${client.config.prefix}남은기간` || message.content === `${client.config.prefix}등록` || message.content === `${client.config.prefix}발급` || message.content === `${client.config.prefix}연장 ${m1} ${m2}`) {

    } else {
      return
    }
  }
  if (!trs || !trss) {
    if (message.content === `${client.config.prefix}발급 ${m1} ${m2}` || message.content === `${client.config.prefix}등록 ${m1}` || message.content === `${client.config.prefix}남은기간` || message.content === `${client.config.prefix}등록` || message.content === `${client.config.prefix}발급` || message.content === `${client.config.prefix}연장 ${m1} ${m2}`) {

    } else {
      return
    }
  }


  let prefix = client.config.prefix;

  client.emit('experience', message);

  if (!message.content.startsWith(prefix)) return;

  let argss = message.content.slice(prefix.length).trim().split(/ +/g);
  let msg = message.content.toLowerCase();
  let cmd = argss.shift().toLowerCase();
  let sender = message.author;

  message.flags = []
  while (argss[0] && argss[0][0] === "-") {
    message.flags.push(argss.shift().slice(1));
  }

  let commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  if (!commandFile) return;


  if (!cooldowns.has(commandFile.help.name)) cooldowns.set(commandFile.help.name, new Discord.Collection());

  const member = message.author;
  now = Date.now(),
    timestamps = cooldowns.get(commandFile.help.name),
    cooldownAmount = (commandFile.conf.cooldown || 3) * 1000;

  if (!timestamps.has(member.id)) {
    if (!client.config.owners.includes(message.author.id)) {

      timestamps.set(member.id, now);
    }
  } else {
    const expirationTime = timestamps.get(member.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.channel.send(`명령어를 다시 사용하려면 **${timeLeft.toFixed(1)}**초 기다려주세요`);
    }

    timestamps.set(member.id, now);
    setTimeout(() => timestamps.delete(member.id), cooldownAmount);
  }

  try {
    if (!commandFile) return;
    commandFile.run(client, message, argss);
  } catch (error) {
    console.log(error.message);
  } finally {

    console.log(`${sender.tag} (${sender.id}) 사용함: ${cmd}`);
  }
}

function randomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}