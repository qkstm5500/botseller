const Discord = require("discord.js");
const { prependListener } = require("process");
const Database = require("../../Basicfile/Helpers/Database");


exports.run = async (client, message, args) => {



  const svdb = new Database("./Servers/" + message.guild.id, "serverstate");

  var users = svdb.get(`admin.${message.guild.id}`)
  
  if (!users.includes(message.author.id)) return message.reply("당신은 자판기관리자가아닙니다.")

  const chdb = new Database("./Servers/" + message.guild.id, "charge");

  const percent = message.content.split(" ").slice(1, 2).join(" ");
  if (!percent) return message.reply({embed: {color: "RED", description: `유저가 충전시 충전된금액의 추가지급할 퍼센트를 적어주세요 ex) 10% = 10`}})

  await chdb.set(`charge.${message.guild.id}`, percent);
  await message.reply({embed: {color: "RANDOM", description: `퍼센트 지정이 완료되엇습니다. ${percent}%`}})
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};


exports.help = {
  name: "추가지급",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["추가지급"],
  cooldown: 0
}
