const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");


exports.run = async (client, message, args) => {



  const svdb = new Database("./Servers/" + message.guild.id, "serverstate");

  var users = svdb.get(`admin.${message.guild.id}`)
  
  if (!users.includes(message.author.id)) return message.reply("당신은 자판기관리자가아닙니다.")

  const id = message.content.split(" ").slice(1, 2).join(" ");
  if (!id) return message.reply("컬쳐랜드 아이디를 입력해주세요");

  const pw = message.content.split(" ").slice(2, 3).join(" ");
  if (!pw) return message.reply("컬쳐랜드 비밀번호를 입력해주세요");

  await svdb.set(`chid.${message.guild.id}`, id);
  await svdb.set(`chpw.${message.guild.id}`, pw);

  message.delete()
  message.reply({embed: {color: "GREEN", description: "아이디비번이 지정되었습니다."}})
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};


exports.help = {
  name: "아이디비번지정",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["아이디비번지정"],
  cooldown: 0
}
