const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");


exports.run = async (client, message, args) => {



  const svdb = new Database("./Servers/" + message.guild.id, "serverstate");

  var users = svdb.get(`admin.${message.guild.id}`)
  
  if (!users.includes(message.author.id)) return message.reply("당신은 자판기관리자가아닙니다.")

  const db = new Database("./Servers/" + message.guild.id, "UserCoin");

  var Role = message.mentions.roles.first();
  if (!Role) return message.reply("역할을 멘션해주세요")

  await db.set(`UserBuyRole.${message.guild.id}`, Role.id);

  message.reply({embed: { color: "RANDOM", description: `구매자역할이 지정되었습니다. ${Role}`}})
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};


exports.help = {
  name: "역할지정",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["역할지정"],
  cooldown: 0
}
