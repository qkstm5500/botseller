const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");


exports.run = async (client, message, args) => {



  const svdb = new Database("./Servers/" + message.guild.id, "serverstate");

  var users = svdb.get(`admin.${message.guild.id}`)
  
  if (!users.includes(message.author.id)) return message.reply("당신은 자판기관리자가아닙니다.")

  const fdb = new Database("./Servers/" + message.guild.id, "file");
  const cdb = new Database("./Servers/" + message.guild.id, "Channels");
  
  var filename = message.content.split(" ").slice(1, 2).join(" ");
  if (!filename) return message.reply("등록할 제품의 이름을 적어주세요!")
  var d = await fdb.get(`dfile.${filename}`)
  if (!d) return message.reply(`${filename} 제품이 존재하지 않습니다`)
  var fileprice = message.content.split(" ").slice(2, 3).join(" ");
  if (!fileprice) return message.reply(`${filename} 제품의 가격을 적어주세요`)

  await fdb.set(`dfile.${filename}`, fileprice);
  await fdb.set(`fileSale.${filename}`, 0);

  var embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle(`[${message.guild.name}] 가격변경안내`)
  .addField(`${filename}`, `${fileprice}원`)
  message.reply(embed)
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};


exports.help = {
  name: "가격변경",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["가격변경"],
  cooldown: 0
}
