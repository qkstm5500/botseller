const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");


exports.run = async (client, message, args) => {



  const svdb = new Database("./Servers/" + message.guild.id, "serverstate");

  var users = svdb.get(`admin.${message.guild.id}`)
  
  if (!users.includes(message.author.id)) return message.reply("당신은 자판기관리자가아닙니다.")

  const fdb = new Database("./Servers/" + message.guild.id, "file");
  const cdb = new Database("./Servers/" + message.guild.id, "Channels");
  
  var filename = message.content.split(" ").slice(1, 2).join(" ");
  if (!filename) return message.reply("조회할 제품의 이름을 적어주세요.")

  var filestock = await fdb.get(`dfileStocks.${filename}`);
  var filestocks = await fdb.get(`dfileStock.${filename}`);

  var list = Object.keys(filestocks).map(_data => {
    return {
      Id: _data,
      Value: (filestocks[_data])
    }
  })

  if (!filestock || !filestocks) return message.reply("재고가 없습니다.")

  var embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle(`[${message.guild.name}] 제품 재고 조회`)
  .addField(`재고 갯수: ${filestock}개`, `** **${list.splice(0, 10).map((item, index) => `\`${item.Value}\``).join("\n")}`)
  message.reply(embed)
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};


exports.help = {
  name: "재고조회",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["재고조회"],
  cooldown: 0
}
