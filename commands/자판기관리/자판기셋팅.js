const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");


exports.run = async (client, message, args) => {



  const svdb = new Database("./Servers/" + message.guild.id, "serverstate");

  var users = svdb.get(`admin.${message.guild.id}`)

  if (!users.includes(message.author.id)) return message.reply("당신은 자판기관리자가아닙니다.")

  const db = new Database("./Servers/" + message.guild.id, "Channels");

  message.guild.channels.create('📮│자동판매시스템', { type: 'category' }, [{
    id: message.guild.id,
    deny: ['CONNECT']
  }]).then(channe => {
    channe.setPosition(0)
    message.guild.channels.create('📍│자판기공지', { type: 'text' }, [{
      id: message.guild.id,
      deny: ['CONNECT']
    }]).then(channel => {
      channel.setParent(channe.id)
      message.guild.channels.create('🔔│충전방법', { type: 'text' }, [{
        id: message.guild.id,
        deny: ['CONNECT']
      }]).then(channel1 => {
        channel1.setParent(channe.id)
        let cha1 = channel1.id
        message.guild.channels.create('📖│판매리스트', { type: 'text' }, [{
          id: message.guild.id,
          deny: ['CONNECT']
        }]).then(channel2 => {
          channel2.setParent(channe.id)
          let cha2 = channel2.id
          message.guild.channels.create('💸│구매│', { type: 'text' }, [{
            id: message.guild.id,
            deny: ['CONNECT']
          }]).then(channel3 => {
            channel3.setParent(channe.id)
            let cha3 = channel3.id
            message.guild.channels.create('📟│금액확인', { type: 'text' }, [{
              id: message.guild.id,
              deny: ['CONNECT']
            }]).then(channel4 => {
              channel4.setParent(channe.id)
              let cha4 = channel4.id
              message.guild.channels.create('🛒│구매로그', { type: 'text' }, [{
                id: message.guild.id,
                deny: ['CONNECT']
              }]).then(channel5 => {
                channel5.setParent(channe.id)
                let cha5 = channel5.id
                message.guild.channels.create('📲│충전로그', { type: 'text' }, [{
                  id: message.guild.id,
                  deny: ['CONNECT']
                }]).then(channel6 => {
                  channel6.setParent(channe.id)
                  let cha6 = channel6.id
                  message.guild.channels.create('🎫│가입', { type: 'text' }, [{
                    id: message.guild.id,
                    deny: ['CONNECT']
                  }]).then(channel7 => {
                    channel7.setParent(channe.id)
                    let cha7 = channel7.id
                    message.guild.channels.create('🔋│충전채널', { type: 'text' }, [{
                      id: message.guild.id,
                      deny: ['CONNECT']
                    }]).then(async channel8 => {
                      channel8.setParent(channe.id)
                      let cha8 = channel8.id
                      await db.set(`List.${message.guild.id}`, cha2), db.set(`Buy.${message.guild.id}`, cha3), db.set(`Self.${message.guild.id}`, cha4), db.set(`BuyLog.${message.guild.id}`, cha5), db.set(`Log.${message.guild.id}`, cha6), db.set(`Card.${message.guild.id}`, cha7), db.set(`Buycha.${message.guild.id}`, cha8)
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  });

  message.guild.channels.create('🎁│상품페이지│🎁', { type: 'category' }, [{
    id: message.guild.id,
    deny: ['CONNECT']
  }]).then(async channe => {
    channe.setPosition(0)
    var x = channe.id
    await db.set(`GoodsCate.${message.guild.id}`, x);
  })

  message.guild.channels.create('🔌│충전페이지│🔌', { type: 'category' }, [{
    id: message.guild.id,
    deny: ['CONNECT']
  }]).then(async channe => {
    channe.setPosition(0)
    var x = channe.id
    await db.set(`ChargeCate.${message.guild.id}`, x);
  })
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};


exports.help = {
  name: "자판기셋팅",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["자판기셋팅"],
  cooldown: 0
}
