const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");


exports.run = async (client, message, args) => {



  const svdb = new Database("./Servers/" + message.guild.id, "serverstate");

  var users = svdb.get(`admin.${message.guild.id}`)
  
  if (!users.includes(message.author.id)) return message.reply("당신은 자판기관리자가아닙니다.")

  const id = message.content.split(" ").slice(1, 2).join(" ");
  if (!id) return message.reply("계좌 기업을 입력해주세요");

  const pw = message.content.split(" ").slice(2, 3).join(" ");
  if (!pw) return message.reply("계좌 번호를 입력해주세요");

  await svdb.set(`bank.${message.guild.id}`, id);
  await svdb.set(`bankid.${message.guild.id}`, pw);

  message.delete()
  message.reply({embed: {color: "GREEN", description: "계좌 정보가 입력되었습니다."}})
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};


exports.help = {
  name: "계좌지정",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["계좌지정"],
  cooldown: 0
}
