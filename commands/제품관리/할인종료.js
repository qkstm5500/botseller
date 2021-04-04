const Discord = require("discord.js");
const { prependListener } = require("process");
const Database = require("../../Basicfile/Helpers/Database");


exports.run = async (client, message, args) => {



  const svdb = new Database("./Servers/" + message.guild.id, "serverstate");

  var users = svdb.get(`admin.${message.guild.id}`)
  
  if (!users.includes(message.author.id)) return message.reply("당신은 자판기관리자가아닙니다.")

  const fdb = new Database("./Servers/" + message.guild.id, "file");

  var filename = message.content.split(" ").slice(1, 2).join(" ");
  if (!filename) return message.reply("구매할 제품의 이름을 적어주세요")

  var file = await fdb.get(`dfile.${filename}`);
  if (!file) return message.reply(`${filename} 제품이 존재하지 않습니다.`)

  await fdb.set(`fileSale.${filename}`, 0);

  message.reply({embed: { color: "RANDOM", description: `${filename} 제품할인이 종료되었습니다. 현재: ${file}원 입니다.`}})
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};


exports.help = {
  name: "할인종료",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["할인종료"],
  cooldown: 0
}
