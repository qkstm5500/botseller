const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");


exports.run = async (client, message, args) => {



  const svdb = new Database("./Servers/" + message.guild.id, "serverstate");

  var users = svdb.get(`admin.${message.guild.id}`)
  
  if (!users.includes(message.author.id)) return message.reply("당신은 자판기관리자가아닙니다.")
  const db = new Database("./Servers/" + message.guild.id, "UserState");

  const User = message.mentions.members.first();
  if (!User) return message.reply("유저를 멘션해주세요")

  if (!args[1]) return message.reply("블랙리스트에 등록하려면 `활성화` | 제거하려면 `비활성화` 를 입력해주세요")

  if (args[1] == "활성화") {
    await db.set(`state.${User.id}`, false)
    message.reply({embed: { color: "GREEN", description: "해당유저가 블랙리스트에 등록되었습니다."}})
  }

  if (args[1] == "비활성화") {
    await db.set(`state.${User.id}`, true)
    message.reply({embed: { color: "GREEN", description: "해당유저를 블랙리스트에서 제거했습니다."}})
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};


exports.help = {
  name: "블랙",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["블랙"],
  cooldown: 0
}
