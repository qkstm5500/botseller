const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");
var fs = require('fs');

exports.run = async (client, message, args) => {



  const svdb = new Database("./Servers/" + message.guild.id, "serverstate");

  var users = svdb.get(`admin.${message.guild.id}`)

  if (!users.includes(message.author.id)) return message.reply("당신은 자판기관리자가아닙니다.")

  const fdb = new Database("./Servers/" + message.guild.id, "file");
  const cdb = new Database("./Servers/" + message.guild.id, "Channels");

  var filename = message.content.split(" ").slice(1, 2).join(" ");
  if (!filename) return message.reply("새로고침할 제품의 이름을 적어주세요.")

  let d = await fdb.get(`dfile.${filename}`);
  if (!d) return message.reply("없는 제품입니다.")

  var array = fs.readFileSync(`./Basicfile/Helpers/Servers/${message.guild.id}/${filename}.txt`).toString().split("\n");
  var is = 0;
  for (i in array) {
    is = is + 1;
  }

  await fdb.set(`dfileStocks.${filename}`, 0)
  await fdb.add(`dfileStocks.${filename}`, is)

  var ds = await fdb.get(`dfileStocks.${filename}`);

  var embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`[${message.guild.name}] 제품 재고 조회`)
    .addField(`재고 갯수: ${ds}개`, `새로고쳐짐`)
  message.reply(embed)
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};


exports.help = {
  name: "재고새로고침",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["재고새로고침"],
  cooldown: 0
}
