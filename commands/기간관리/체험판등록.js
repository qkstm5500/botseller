const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");
const ms = require("parse-ms");


exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.hasPermission("MANAGE_GUILD")) return message.reply("당신은권한이없습니다.")
  const ssdb = new Database("./Servers/license", "blacklist");
  const t = await ssdb.get(`state.${message.author.id}`);
  if (t == true) return message.reply({ embed: { color: "RED", description: "블랙리스트에 등록되어있습니다." } })
  const db = new Database("./Servers/license", "license");
  const dbs = new Database("./Servers/times", "license");
  const svdb = new Database("./Servers/" + message.guild.id, "serverstate");

  let msg = await message.reply({ embed: { color: "RANDOM", description: "라이센스키를 등록중입니다. 잠시만기다려주세요" } })

  let pad_zero = num => (num < 10 ? '0' : '') + num;
  let trss = await dbs.get(`test.${message.guild.id}`);
  let utrss = await dbs.get(`test.${message.author.id}`);
  if (trss === true || utrss === true) return msg.edit({ embed: { color: "RED", description: "체험판을 이미 사용하셨습니다." } })

  var server = client.guilds.cache.get("767301017670385704")
  const channels = server.channels.cache.find((x) => x.id == "820647105537769494");
  var logembed = new Discord.MessageEmbed()
    .setTitle("체험판 자판기등록됨")
    .addField("닉네임", `${message.author}`)
    .addField("서버이름", `${message.guild.name}`)
    .addField("서버아이디", `${message.guild.id}`)
    .addField("라이센스키", `체험판`)
    .addField("라이센스기간", `7일`)

  let setting = new Discord.MessageEmbed()
    .setTitle("체험판자판기사용법")
    .setURL("https://discord.gg/EQRYtBTyVX")
    .addField(`사용법`, "**체험판자판기사용법**\n\n기본셋팅```\n1. !체험판등록\n2. !자판기셋팅\n3. !아이디비번지정 컬쳐랜드아이디 컬쳐랜드비밀번호\n```제품셋팅```1. !제품등록 제품이름 제품가격\n2. !재고충전 제품이름 재고내용\n\n제품다량충전방법\n1. !대량재고충전 제품이름 충전할갯수 내용\nex) !대량재고충전 테스트 10 1 2 3 4 5 6 7 8 9 10\n대량충전시 반드시 띄어쓰기가 필요합니다.```이후질답```Q. 자판기충전은 어떻게하나요?\nA. 금액확인채널에서 !충전채널 을 입력시 명령어를 사용한 유저전용 충전채널이생성됩니다.\n\nQ. 컬쳐랜드 아이디비번은 지정한대로 데이테베이스에 저장되나요?\nA. 컬쳐랜드 아이디비번은 암호화 되어 데이터베이스에 저장됩니다.\n\nQ. 체험판이 끝난후 연장은 어떻게 하나요?\nA. 체험판사용한경우 연장없이 등록부터 진행하시면되십니다.```")
    .addField("서버입장", "[서버입장](https://discord.gg/EQRYtBTyVX)")
    .addField("웹자판기입장", "[웹자판기입장](http://webvend.tk/@rentalvend)")
    .setFooter(`이후질문은 이은이(본계비활)#7875 로 디엠주세요`)
  channels.send(logembed);
  await dbs.add(`trs.${message.author.id}`, 6.048e+8)
  await dbs.set(`tr.${message.author.id}`, Date.now())
  await dbs.add(`strs.${message.guild.id}`, 6.048e+8)
  await dbs.set(`str.${message.guild.id}`, Date.now())
  await dbs.set(`test.${message.guild.id}`, true)
  await dbs.set(`test.${message.author.id}`, true)
  await dbs.set(`trstat.${message.guild.id}`, true)
  await svdb.set(`admin.${message.guild.id}`, message.author.id)
  let str = await dbs.get(`str.${message.guild.id}`);
  let timeObj = ms(6.048e+8 - (Date.now() - str));
  let days = pad_zero(timeObj.days).padStart(2, "0"),
    hours = pad_zero(timeObj.hours).padStart(2, "0"),
    mins = pad_zero(timeObj.minutes).padStart(2, "0"),
    secs = pad_zero(timeObj.seconds).padStart(2, "0");
  let finalTime = `${days}일${hours}시간${mins}분${secs}초`;
  await msg.edit({ embed: { color: "RANDOM", description: `${message.author}님 체험판 등록이 완료되셨습니다. 남은시간: ${finalTime}` } })
  return
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};


exports.help = {
  name: "체험판등록",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["체험판등록"],
  cooldown: 0
}
