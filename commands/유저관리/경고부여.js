const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");


exports.run = async (client, message, args) => {



  const svdb = new Database("./Servers/" + message.guild.id, "serverstate");

  var users = svdb.get(`admin.${message.guild.id}`)
  
  if (!users.includes(message.author.id)) return message.reply("당신은 자판기관리자가아닙니다.")
  const db = new Database("./Servers/" + message.guild.id, "UserCoin");

  const User = message.mentions.members.first();
  if (!User) return message.reply("유저를 멘션해주세요")

  await db.add(`UserWarn.${User.id}`, 1)
  var warn = await db.get(`UserWarn.${User.id}`);

  await message.reply({embed: {color: "RED", description: `경고가 1회 부여되어 ${User}님의 경고는 ${warn}회 입니다.`}})
  await User.send({embed: {color: "RED", description: `경고가 1회 부여되어 ${User}님의 경고는 ${warn}회 입니다.`}})
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};


exports.help = {
  name: "경고",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["경고"],
  cooldown: 0
}
