const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");


exports.run = async (client, message, args) => {



  const svdb = new Database("./Servers/" + message.guild.id, "serverstate");

  var users = svdb.get(`admin.${message.guild.id}`)
  
  if (!users.includes(message.author.id)) return message.reply("당신은 자판기관리자가아닙니다.")

  const db = new Database("./Servers/" + message.guild.id, "Recommended");

  const ReCm1 = message.content.split(" ").slice(1, 2).join(" ");
  const ReCm2 = message.content.split(" ").slice(2, 3).join(" ");
  if (!ReCm1 || !ReCm2) return message.reply({embed: {color: "RED", description: `1번째 칸에는 추천한유저에게 지급할 금액을 2번째 칸에는 추천된 유저에게 지급할 금액을 적어주세요! ex) \`${client.config.prefix}추천인금액 1000 1000\``}})

  await db.set(`UserRe.${message.guild.id}`, ReCm1);
  await db.set(`ReUser.${message.guild.id}`, ReCm2);

  message.reply({embed: { color: "RANDOM", description: `금액 지정이 완료되었습니다. 추천한유저: ${ReCm1} 추천된유저: ${ReCm2}`}});
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};


exports.help = {
  name: "추천인금액",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["추천인금액"],
  cooldown: 0
}
