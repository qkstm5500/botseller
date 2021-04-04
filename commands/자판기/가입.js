const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");


exports.run = async (client, message, args) => {


  
  const dbs = new Database("./Servers/" + message.guild.id, "Channels");
  let chan = dbs.get(`Card.${message.guild.id}`)
  if (message.channel.id !== chan) {
    message.delete()
    return message.reply("가입가능한 채널이 아닙니다.")
  }

  const udb = new Database("./Servers/" + message.guild.id, "UserState");

  var st = udb.get(`state.${message.author.id}`);
  if (st == true) return message.reply({ embed: { color: "RED", description: "당신은 이미 가입되어 있습니다." } })
  if (st == false) return message.reply({ embed: { color: "RED", description: "당신은 이미 가입되어 있습니다." } })

  await udb.set(`state.${message.author.id}`, true)
  message.reply({ embed: { color: "GREEN", description: `가입이 완료되었습니다.`} })
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};


exports.help = {
  name: "가입",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["가입"],
  cooldown: 0
}
