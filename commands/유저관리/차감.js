const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");


exports.run = async (client, message, args) => {



  const svdb = new Database("./Servers/" + message.guild.id, "serverstate");

  var users = svdb.get(`admin.${message.guild.id}`)
  
  if (!users.includes(message.author.id)) return message.reply("당신은 자판기관리자가아닙니다.")

  const db = new Database("./Servers/" + message.guild.id, "UserCoin");

  var User = message.mentions.members.first();
  if (!User) return message.reply("유저를 멘션해주세요!")

  var bonus = args[1];
  if (!bonus) return message.reply("유저금액에서 차감할 값을 적어주세요!")

  await db.subtract(`UserCoin.${User.id}`, bonus);

  var coin = await db.get(`UserCoin.${User.id}`) || 0;

  message.reply({embed: { color: "RANDOM", description: `${User}님의 금액은 현재: ${coin.toLocaleString()}원 입니다.`}})
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};


exports.help = {
  name: "차감",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["차감"],
  cooldown: 0
}
