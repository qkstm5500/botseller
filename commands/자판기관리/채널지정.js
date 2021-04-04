const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");


exports.run = async (client, message, args) => {



  const svdb = new Database("./Servers/" + message.guild.id, "serverstate");

  var users = svdb.get(`admin.${message.guild.id}`)
  
  if (!users.includes(message.author.id)) return message.reply("당신은 자판기관리자가아닙니다.")

  const db = new Database("./Servers/" + message.guild.id, "Channels");

  let toggling = ["구매채널", "제품리스트", "로그채널", "금액확인채널", "구매로그채널", "가입채널", "충전채널"];
  if (!toggling.includes(args[0])) {
    return message.channel.send({ embed: { color: "GREEN", description: `${toggling}중 원하는 기능을 입력해주세요 \n\n사용법: ${client.config.prefix} 채널지정 원하는채널 #채널멘션` } });
  }

  if (args[0] == "구매채널") {
    let channel = message.mentions.channels.first();
    if (!channel) return message.channel.send({ embed: { color: "RED", description: `채널을 멘션해주세요` } });
    await db.set(`Buy.${message.guild.id}`, channel.id)
    return message.channel.send({ embed: { color: "GREEN", description: `채널이 지정되었습니다. 채널: ${channel}` } });
  }

  if (args[0] == "금액확인채널") {
    let channel = message.mentions.channels.first();
    if (!channel) return message.channel.send({ embed: { color: "RED", description: `채널을 멘션해주세요` } });
    await db.set(`Self.${message.guild.id}`, channel.id)
    return message.channel.send({ embed: { color: "GREEN", description: `채널이 지정되었습니다. 채널: ${channel}` } });
  }

  if (args[0] == "제품리스트") {
    let channel = message.mentions.channels.first();
    if (!channel) return message.channel.send({ embed: { color: "RED", description: `채널을 멘션해주세요` } });
    await db.set(`List.${message.guild.id}`, channel.id)
    return message.channel.send({ embed: { color: "GREEN", description: `채널이 지정되었습니다. 채널: ${channel}` } });
  }

  if (args[0] == "로그채널") {
    let channel = message.mentions.channels.first();
    if (!channel) return message.channel.send({ embed: { color: "RED", description: `채널을 멘션해주세요` } });
    await db.set(`Log.${message.guild.id}`, channel.id)
    return message.channel.send({ embed: { color: "GREEN", description: `채널이 지정되었습니다. 채널: ${channel}` } });
  }

  if (args[0] == "구매로그채널") {
    let channel = message.mentions.channels.first();
    if (!channel) return message.channel.send({ embed: { color: "RED", description: `채널을 멘션해주세요` } });
    await db.set(`BuyLog.${message.guild.id}`, channel.id)
    return message.channel.send({ embed: { color: "GREEN", description: `채널이 지정되었습니다. 채널: ${channel}` } });
  }

  if (args[0] == "가입채널") {
    let channel = message.mentions.channels.first();
    if (!channel) return message.channel.send({ embed: { color: "RED", description: `채널을 멘션해주세요` } });
    await db.set(`Card.${message.guild.id}`, channel.id)
    return message.channel.send({ embed: { color: "GREEN", description: `채널이 지정되었습니다. 채널: ${channel}` } });
  }

  if (args[0] == "충전채널") {
    let channel = message.mentions.channels.first();
    if (!channel) return message.channel.send({ embed: { color: "RED", description: `채널을 멘션해주세요` } });
    await db.set(`Buycha.${message.guild.id}`, channel.id)
    return message.channel.send({ embed: { color: "GREEN", description: `채널이 지정되었습니다. 채널: ${channel}` } });
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};


exports.help = {
  name: "채널지정",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["채널지정"],
  cooldown: 0
}
