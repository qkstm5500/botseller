const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");


exports.run = async (client, message, args) => {



  const svdb = new Database("./Servers/" + message.guild.id, "serverstate");

  var users = svdb.get(`admin.${message.guild.id}`)
  
  if (!users.includes(message.author.id)) return message.reply("당신은 자판기관리자가아닙니다.")
  const db = new Database("./Servers/" + message.guild.id, "file");

  if (!args[0]) return message.reply("블랙리스트에 등록하려면 `활성화` | 제거하려면 `비활성화` 를 입력해주세요")

  if (args[0] == "활성화") {
    await db.set(`page.${message.guild.id}`, true)
    message.reply({embed: { color: "GREEN", description: "해당유저가 블랙리스트에 등록되었습니다."}})
  }

  if (args[0] == "비활성화") {
    await db.set(`page.${message.guild.id}`, false)
    message.reply({embed: { color: "GREEN", description: "해당유저를 블랙리스트에서 제거했습니다."}})
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};


exports.help = {
  name: "상품페이지",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["상품페이지"],
  cooldown: 0
}
