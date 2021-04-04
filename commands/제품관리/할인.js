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

  var percent = message.content.split(" ").slice(2, 3).join(" ");
  if (isNaN(percent)) return message.reply("퍼센트는 숫자로만 적어주세요")
  if (!percent) return message.reply("할인 퍼센트를 적어주세요")

  var all = file * (1 - percent / 100)

  await fdb.set(`fileSale.${filename}`, all);

  message.reply({embed: { color: "RANDOM", description: `${filename} 제품에 ${percent}% 를 할인하여 현재: ${all}원 입니다.`}})
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};


exports.help = {
  name: "상품할인",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["상품할인"],
  cooldown: 0
}
