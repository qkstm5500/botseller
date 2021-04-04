const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");
const fs = require('fs');


exports.run = async (client, message, args) => {



  const svdb = new Database("./Servers/" + message.guild.id, "serverstate");

  var users = svdb.get(`admin.${message.guild.id}`)
  
  if (!users.includes(message.author.id)) return message.reply("당신은 자판기관리자가아닙니다.")

  const fdb = new Database("./Servers/" + message.guild.id, "file");
  const cdb = new Database("./Servers/" + message.guild.id, "Channels");
  
  var filename = message.content.split(" ").slice(1, 2).join(" ");
  if (!filename) return message.reply("등록할 제품의 이름을 적어주세요!")
  var fileprice = message.content.split(" ").slice(2, 3).join(" ");
  if (!fileprice) return message.reply(`${filename} 제품의 가격을 적어주세요`)
  var channel = await cdb.get(`GoodsCate.${message.guild.id}`);
  var page = await fdb.get(`page.${message.guild.id}`);

  await fdb.set(`dfile.${filename}`, fileprice);
  await fdb.set(`dfiles.${filename}`, filename);

  if (page === true) {
    message.guild.channels.create(`🎁│${filename}│🎁`, { type: `text` }).then(
      (createdChannel) => {
        createdChannel.setParent(channel)
      }
    )
  }

  await fs.writeFile(`./Basicfile/Helpers/Servers/${message.guild.id}/${filename}.txt`,' ',function(err){ if (err === null) { console.log(`성공적으로 생성됨`); } else { console.log('오류'); } });

  var embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle(`[${message.guild.name}] 제품등록안내`)
  .addField(`${filename}`, `${fileprice}원`)
  message.reply(embed)
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};


exports.help = {
  name: "제품등록",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["제품등록"],
  cooldown: 0
}
