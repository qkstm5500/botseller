const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");


exports.run = async (client, message, args) => {



  const svdb = new Database("./Servers/" + message.guild.id, "serverstate");

  var users = svdb.get(`admin.${message.guild.id}`)
  
  if (!users.includes(message.author.id)) return message.reply("당신은 자판기관리자가아닙니다.")

  const fdb = new Database("./Servers/" + message.guild.id, "file");
  
  var filename = message.content.split(" ").slice(1, 2).join(" ");
  if (!filename) return message.reply("등록할 제품의 이름을 적어주세요!")
  var d = await fdb.get(`dfile.${filename}`)
  if (!d) return message.reply(`${filename} 제품이 존재하지 않습니다`)
  var fileprice = message.content.split(" ").slice(2).join(" ");
  if (!fileprice) return message.reply(`${filename} 제품의 전송 메시지를 적어주세요`)

  await fdb.set(`filemessage.${filename}`, fileprice);

  var embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle(`[${message.guild.name}] 메시지등록안내`)
  .addField(`${filename} 제품의 등록된 메시지`, `${fileprice}`)
  message.reply(embed)
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};


exports.help = {
  name: "메시지등록",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["메시지등록"],
  cooldown: 0
}
