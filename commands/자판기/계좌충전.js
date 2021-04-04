const Discord = require("discord.js");
const { start } = require("repl");
const Database = require("../../Basicfile/Helpers/Database");
const request = require('request');


exports.run = async (client, message, args) => {

  const sdb = new Database("./Servers/" + message.guild.id, "UserState");

  var st = await sdb.get(`state.${message.author.id}`);
  if (!st || st == false) return message.reply({ embed: { color: "RED", description: "가입되어 있지않거나 블랙리스트에 등록되어있습니다." } })

  const name = message.content.split(" ").slice(1, 2).join(" ");
  if (!name) return message.reply({ embed: { color: "RED", description: "입금자명을 입력해주세요" } })

  const price = message.content.split(" ").slice(2, 3).join(" ");
  if (isNaN(price)) return message.reply({ embed: { color: "RED", description: "입금할 가격은 숫자로만 적어주세요" } })
  if (!price) return message.reply({ embed: { color: "RED", description: "입금할 가격을 입력해주세요" } })

  const msg = await message.reply({ embed: { color: "GREEN", description: "계좌 링크를 생성중입니다." } })

  const svdb = new Database("./Servers/" + message.guild.id, "serverstate");
  const udb = new Database("./Servers/" + message.guild.id, "UserCoin");

  const id = await svdb.get(`bank.${message.guild.id}`)
  if (id == "" || !id) return msg.edit({ embed: { color: "RED", description: "계좌 링크를 생성하던 도중 에러가 발생하였습니다. (오류코드: unknown bank)" } });
  const num = await svdb.get(`bankid.${message.guild.id}`)
  if (num == "" || !num) return msg.edit({ embed: { color: "RED", description: "계좌 링크를 생성하던 도중 에러가 발생하였습니다. (오류코드: unknown bankid)" } });

  await request({
    method: 'POST',
    url: 'https://toss.im/transfer-web/linkgen-api/link',
    headers: {
      'Content-Type': 'application/json'
    },
    body: `{  \"apiKey\": \"c39ed168f60d441484f48d04228b32c8\",  \"bankName\": \"${id}\",  \"bankAccountNo\": \"${num}\",  \"amount\": ${price},  \"message\": \"입금완료됨\"}`
  }, async function (error, response, body) {
    var link;
    link = body.replace(/":"/gi, "")
    link2 = link.replace(/"/gi, "")
    link3 = link2.replace(/}/gi, "")
    link4 = link3.replace(/{/gi, "")
    link5 = link4.replace(/":{"/gi, "")
    link6 = link5.replace(/","/gi, "")
    link7 = link6.replace(/%/gi, "")
    link8 = link7.replace(/,/gi, "")
    link9 = link8.replace(/,/gi, "")
    link10 = link9.replace(/resultTypeSUCCESSsuccess:schemesupertoss:/, "")
    link11 = link10.replace("//send?bank=", "")
    link12 = link11.replace(`${price}`, "")
    link13 = link12.replace(/&msg=EC9E85EAB888EC9984EBA38CEB90A8/, "")
    link14 = link13.replace(`${num}`, "")
    link15 = link14.replace(`${id}`, "")
    link16 = link15.replace(/&origin=linkgen&amount=/, "")
    link17 = link16.replace(/&accountNo=/, "")
    link18 = link17.replace(/link/, "")
    await msg.edit({ embed: { color: "GREEN", description: `입금 링크: ${link18} \n\n입금을 완료했다면 ✅를 눌러주세요` } }).then(async m => {
      var emoji = await promptMessage(m, message.author, 10000, ["✅", "❌"]);

      if (emoji === "✅") {

        await msg.edit({embed: {color: "GREEN", description: "입금신청이 완료되었습니다. 관리자승인이 필요합니다.\n\n잠시만기다려주세요."}})
        
        var admin = message.guild.members.cache.get(svdb.get(`admin.${message.guild.id}`));
        await admin.send({embed: {color: "GREEN", description: `${message.author}님이 충전요청을 하셧습니다. \n\n성함: ${name} 입금가격: ${price}\n\n위 정보와 같이 입금이 되었다면 밑 설명에 맞게 실행해주세요!\n\n**승인전필수확인**\n\n승인처리를 하시려면 ✅를 거부처리를 하시려면 ❌를 눌러주세요\n해당봇은 계좌를 확인할수 있는방법이 없습니다. 그러니 직접 입금확인을 하신후에\n승인처리를 해주세요!`}}).then(async m => {
          var emoji = await promptMessage(m, admin, 10000, ["✅", "❌"]);

          if (emoji === "✅") {
            await msg.edit({embed: {color: "GREEN", description: "관리자의 의해 충전신청이 승인되었습니다. 잠시만기다려주세요."}})
            const chdb = new Database("./Servers/" + message.guild.id, "charge");

            var fc = await chdb.get(`charge.${message.guild.id}`);
      
            if (!fc) {
              await udb.add(`ChargeCount.${message.author.id}`, 1);
              await udb.add(`UserCoin.${message.author.id}`, price);
              await udb.add(`UserAccumulate.${message.author.id}`, price);
            }
      
            if (fc) {
              var firstCharge = await udb.get(`FirstCharge.${message.author.id}`);
              if (!firstCharge) {
                var all = await price * (1 + fc / 100);
                await udb.add(`ChargeCount.${message.author.id}`, 1);
                await udb.set(`FirstCharge.${message.author.id}`, true);
                await udb.add(`UserCoin.${message.author.id}`, all);
                await udb.add(`UserAccumulate.${message.author.id}`, price);
              }
        
              if (firstCharge == true) {
                await udb.add(`ChargeCount.${message.author.id}`, 1);
                await udb.add(`UserCoin.${message.author.id}`, price);
                await udb.add(`UserAccumulate.${message.author.id}`, price);
              }
            }

            const serverid = client.guilds.cache.get(message.guild.id)
            const cdb = new Database("./Servers/" + message.guild.id, "Channels");
            const channelid = await cdb.get(`Log.${message.guild.id}`)
            var channel = serverid.channels.cache.get(channelid)

            var svcoin = await udb.get(`UserCoin.${message.author.id}`);
            var accumulate = await udb.get(`UserAccumulate.${message.author.id}`);
      
            await msg.edit(`${message.author}`, {embed: {color: "RED", description: `**계좌충전내역**\n\n충전된금액: ${price.toLocaleString()}원\n\n서버코인: ${svcoin.toLocaleString()}원\n\n누적금액: ${accumulate.toLocaleString()}원`}})
      
            channel.send(`${message.author}`, {embed: {color: "RED", description: `**계좌충전내역**\n\n충전된금액: ${price.toLocaleString()}원\n\n서버코인: ${svcoin.toLocaleString()}원\n\n누적금액: ${accumulate.toLocaleString()}원`}})
          } else if (emoji === "❌") {
            await msg.edit(`${message.author}`,{embed: {color: "RED", description: "관리자의 의해 충전신청이 거부되었습니다."}})
          }
        })
      } else if (emoji === "❌") {

        await msg.edit({embed: {color: "RED", description: "입금신청이 취소되었습니다.\n\n이미 입금을 하시고 취소를 누르셨다면 환불을 어렵습니다."}})

      }
    })
  });
}

async function promptMessage(message, author, time, reactions) {

  time *= 1000;

  for (const reaction of reactions) {
    await message.react(reaction);
  }

  const filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

  return message.awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name);

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};


exports.help = {
  name: "계좌충전",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["계좌충전"],
  cooldown: 0
}
