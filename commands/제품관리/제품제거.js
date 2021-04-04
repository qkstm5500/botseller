const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");
const fs = require('fs');

exports.run = async (client, message, args) => {

  const tdb = new Database("./Servers/times", "license");

  let tr = await tdb.get(`trstat.${message.guild.id}`);
  let str = await tdb.get(`str.${message.guild.id}`);
  let strs = await tdb.get(`strs.${message.guild.id}`);

  if (strs - (Date.now() - str) < 0) return message.reply({ embed: { color: "RED", description: `명령어를 사용하시려면 등록을 해주세요` } })
  if (!tr || tr == false) return message.reply({ embed: { color: "RED", description: `명령어를 사용하시려면 등록을 해주세요` } })

  const svdb = new Database("./Servers/" + message.guild.id, "serverstate");

  var users = svdb.get(`admin.${message.guild.id}`)

  if (!users.includes(message.author.id)) return message.reply("당신은 자판기관리자가아닙니다.")

  const fdb = new Database("./Servers/" + message.guild.id, "file");
  const cdb = new Database("./Servers/" + message.guild.id, "Channels");

  var filename = message.content.split(" ").slice(1, 2).join(" ");
  if (!filename) return message.reply("제거할 제품의 이름을 적어주세요!")

  await fdb.set(`dfile.${filename}`, null)

  const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`[${message.guild.name}] 제품제거안내 \n 제품명: ${filename}`)

  await message.reply(embed)
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};


exports.help = {
  name: "제품제거",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["제품제거"],
  cooldown: 0
}
