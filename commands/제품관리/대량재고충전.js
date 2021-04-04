const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");
const fs = require('fs');


exports.run = async (client, message, args) => {



  const svdb = new Database("./Servers/" + message.guild.id, "serverstate");

  var users = svdb.get(`admin.${message.guild.id}`)

  if (!users.includes(message.author.id)) return message.reply("당신은 자판기관리자가아닙니다.")

  const fdb = new Database("./Servers/" + message.guild.id, "file");

  var filename = message.content.split(" ").slice(1, 2).join(" ");
  if (!filename) return message.reply("재고충전할 제품의 이름을 입력해주세요!")
  var file = await fdb.get(`dfile.${filename}`);
  if (!file) return message.reply(`${filename} 제품이 존재하지 않습니다.`)
  var fileprice = message.content.split(" ").slice(2).join(" ");
  if (!fileprice) return message.reply("재고충전할 제품의 이름을 입력해주세요!")

  await fs.appendFile(`./Basicfile/Helpers/Servers/${message.guild.id}/${filename}.txt`, '\ufeff' + `${fileprice}\n`, function (err) { });

  await sleep(1000)

  var is = 0;
  var array = await fileprice.toString().split("\n");
  for (i in array) {
    is = is + 1;
  }
  await fdb.add(`dfileStocks.${filename}`, is);

  let filestock = await fdb.get(`dfileStocks.${filename}`);

  const embed = new Discord.MessageEmbed()
    .setTitle(`[${message.guild.name}] 재고충전내역`)
    .setColor("#FF0000")
    .addField("제품이름", filename)
    .addField("재고량", "```" + filestock + "```")
    .addField("재고값", "```" + fileprice + "```")
  message.reply(embed)
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};


exports.help = {
  name: "대량재고충전",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["대량재고충전"],
  cooldown: 0
}
