const Discord = require("discord.js");
const { start } = require("repl");
const webdriver = require('selenium-webdriver');
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const Database = require("../../Basicfile/Helpers/Database");
const options = new chrome.Options();
options.addArguments('--headless')
options.addArguments('disable-gpu')
options.addArguments('disable-infobars')


exports.run = async (client, message, args) => {

  const sdb = new Database("./Servers/" + message.guild.id, "UserState");

  var st = await sdb.get(`state.${message.author.id}`);
  if (!st || st == false) return message.reply({ embed: { color: "RED", description: "가입되어 있지않거나 블랙리스트에 등록되어있습니다." } })

  const svdb = new Database("./Servers/" + message.guild.id, "serverstate");

  var chid = await svdb.get(`chid.${message.guild.id}`)
  var chpw = await svdb.get(`chpw.${message.guild.id}`)

  const ID = chid;
  if (ID == "" || !chid) return message.reply({ embed: { color: "RED", description: "충전오류입니다. 관리진에게 문의하세요. (오류코드: unknown ID)" } });
  const PW = chpw;
  if (PW == "" || !chpw) return message.reply({ embed: { color: "RED", description: "충전오류입니다. 관리진에게 문의하세요. (오류코드: unknown PW)" } });

  const db = new Database("./Servers/" + message.guild.id, "UserCoin");

  const serverid = client.guilds.cache.get(message.guild.id)

  const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  const cdb = new Database("./Servers/" + message.guild.id, "Channels");
  const channelid = await cdb.get(`Log.${message.guild.id}`)
  var channel = serverid.channels.cache.get(channelid)

  const pin = args[0];
  if (!pin) return (await driver).quit(), message.reply({ embed: { color: "RED", description: "핀번호를 입력해주세요 ex) 0000-0000-0000-000000 or 0000-0000-0000-0000" } }), channel.send(`${message.author} 님이 충전을 시도했습니다.`)
  const startembed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription("상품권을 충전중입니다. 잠시만기다려주세요.")
  const m = await message.channel.send(`${message.author}`, startembed)

  var Userwarn = await db.get(`UserWarn.${message.author.id}`) || 0;
  if (Userwarn == 2) {
    startembed
      .setColor("RED")
      .setDescription(`경고 2번에 도달하여 더이상 충전이 불가능합니다.`)
    return await m.edit(`${message.author}`, startembed)
  }

  var cooltime = await db.get(`CoolTime.${message.guild.id}`);
  if (cooltime == true) {
    startembed
      .setColor("RED")
      .setDescription(`현재 다른유저가 충전중입니다. 잠시만기다려주세요!`)
    return await m.edit(`${message.author}`, startembed)
  }

  await db.set(`CoolTime.${message.guild.id}`, true)
  var start = await new Date().getTime();
  await charge_pin();
  var end = await new Date().getTime();
  var diff = end - start;
  message.channel.send("걸린시간: " + diff + "밀리초")

  async function charge_pin(callbackFunc) {
    try {

      const url = 'https://m.cultureland.co.kr/mmb/loginMain.do';
      const url2 = 'https://m.cultureland.co.kr/csh/cshGiftCard.do';

      await driver.get(url);

      await driver.findElement(By.name('userId')).sendKeys(ID, Key.RETURN)
      await driver.findElement(By.name('passwd')).click();
      var s = 0;
      for (var i of PW) {
        s = s + 1;
        if (!isNaN(i)) {
          await driver.findElement(By.xpath("//img[@alt='" + i + "']")).click();
        } else if (i == "&") {
          await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
          await driver.findElement(By.xpath("//img[@alt='엠퍼샌드']")).click();
          await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
        } else if (i == "%") {
          await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
          await driver.findElement(By.xpath("//img[@alt='퍼센트']")).click();
          await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
        } else if (i == "`") {
          await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
          await driver.findElement(By.xpath("//img[@alt='어금기호']")).click();
          await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
        } else if (i == "~") {
          await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
          await driver.findElement(By.xpath("//img[@alt='물결표시']")).click();
          await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
        } else if (i == "!") {
          await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
          await driver.findElement(By.xpath("//img[@alt='느낌표']")).click();
          await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
        } else if (i == "@") {
          await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
          await driver.findElement(By.xpath("//img[@alt='골뱅이']")).click();
          await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
        } else if (i == "#") {
          await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
          await driver.findElement(By.xpath("//img[@alt='샾']")).click();
          await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
        } else if (i == "$") {
          await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
          await driver.findElement(By.xpath("//img[@alt='달러기호']")).click();
          await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
        } else if (i == "^") {
          await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
          await driver.findElement(By.xpath("//img[@alt='꺽쇠']")).click();
          await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
        } else if (i == "*") {
          await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
          await driver.findElement(By.xpath("//img[@alt='별표']")).click();
          await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
        } else if (i == i.toUpperCase()) {
          await driver.findElement(By.xpath("//*[@id='mtk_cp']")).click();
          await driver.findElement(By.xpath("//img[@alt='대문자" + i + "']")).click();
          await driver.findElement(By.xpath("//*[@id='mtk_cp']")).click();
        } else if (i == i.toLowerCase()) {
          await driver.findElement(By.xpath("//img[@alt='" + i + "']")).click();
        }
      }

      if (await s < 12) {
        await driver.findElement(By.xpath("//*[@id='mtk_done']")).click();
        await driver.findElement(By.id('btnLogin')).click();
      }
      if (await s == 12) {
        await driver.findElement(By.id('btnLogin')).click();
      }

      

      await driver.get(url2);

      await driver.wait(until.elementLocated(By.id('btnCshFrom')), 1).catch(err => {
        m.edit({embed: {color: "RED", description: `로그인에 실패하였습니다. \n(아이디비번을 확인해주시거나 만약 일치하다면 재시도를 해주세요)`}})
      })

      await driver.findElement(By.id("txtScr11")).sendKeys(pin.substring(0, 4));
      await driver.findElement(By.id("txtScr12")).sendKeys(pin.substring(5, 9));
      await driver.findElement(By.id("txtScr13")).sendKeys(pin.substring(10, 14));

      for (var i of pin.substring(15)) {
        (await driver.findElement(By.xpath("//img[@alt='" + i + "']"))).click();
      }

      await driver.findElement(By.id('btnCshFrom')).click();

      await driver.wait(until.elementLocated(By.id('inSafeSub')), 1);
      function won() {
        return new Promise(won => {
          setTimeout(async () => {
            won((await (await driver).findElement(By.xpath("//*[@id='wrap']/div[3]/section/dl/dd"))).getAttribute("innerHTML"))
          }, 0)
        })
      }
      const wons = await won();

      function pins() {
        return new Promise(pins => {
          setTimeout(async () => {
            pins((await (await driver).findElement(By.xpath("//*[@id='wrap']/div[3]/section/div/table/tbody/tr/td[2]"))).getAttribute("innerHTML"))
          }, 0)
        })
      }
      const pinNum = await pins();

      function state() {
        return new Promise(state => {
          setTimeout(async () => {
            state((await (await driver).findElement(By.xpath("//*[@id='wrap']/div[3]/section/div/table/tbody/tr/td[3]/b"))).getAttribute("innerHTML"))
          }, 0)
        })
      }
      const stats = await state();
      if (wons == "0원") {
        if (stats == "상품권 번호 불일치") {
          await db.add(`UserWarn.${message.author.id}`, 1);
          var Warn = await db.get(`UserWarn.${message.author.id}`);
          const embed1 = new Discord.MessageEmbed()
            .setTitle(`충전내역`)
            .setDescription("상품권 번호 불일치 경고가 부여되었습니다.")
            .addField("경고횟수", Warn)
            .addField("충전된금액", wons)
            .addField("핀번호", pinNum)
            .addField("상품권상태", stats)
          channel.send(`${message.author}`, embed1)
          await db.set(`CoolTime.${message.guild.id}`, false)
        } else if (stats == "이미 등록된 문화상품권") {
          await db.add(`UserWarn.${message.author.id}`, 1);
          var Warn = await db.get(`UserWarn.${message.author.id}`);
          const embed1 = new Discord.MessageEmbed()
            .setTitle(`충전내역`)
            .setDescription("이미 등록된 문화상품권 경고가 부여되었습니다.")
            .addField("경고횟수", Warn)
            .addField("충전된금액", wons)
            .addField("핀번호", pinNum)
            .addField("상품권상태", stats)
          channel.send(`${message.author}`, embed1)
          await db.set(`CoolTime.${message.guild.id}`, false)
        } else if (stats == "판매 취소된 문화상품권") {
          await db.add(`UserWarn.${message.author.id}`, 1);
          var Warn = await db.get(`UserWarn.${message.author.id}`);
          const embed1 = new Discord.MessageEmbed()
            .setTitle(`충전내역`)
            .setDescription("판매 취소된 문화상품권 경고가 부여되었습니다.")
            .addField("경고횟수", Warn)
            .addField("충전된금액", wons)
            .addField("핀번호", pinNum)
            .addField("상품권상태", stats)
          channel.send(`${message.author}`, embed1)
          await db.set(`CoolTime.${message.guild.id}`, false)
        }
        startembed
          .setTitle(`충전내역`)
          .setDescription(`${message.author}님의 충전내역입니다.`)
          .addField("충전된금액", wons)
          .addField("핀번호", pinNum)
          .addField("상품권상태", stats)

        m.edit(`${message.author}`, startembed)
        await db.set(`CoolTime.${message.guild.id}`, false)
        return
      }

      var coins = wons.replace(/[^0-9]/g, '');

      const chdb = new Database("./Servers/" + message.guild.id, "charge");

      var fc = await chdb.get(`charge.${message.guild.id}`);

      if (!fc) {
        await db.add(`UserCoin.${message.author.id}`, coins);
        await db.add(`UserAccumulate.${message.author.id}`, coins);
      }

      if (fc) {
        var firstCharge = await db.get(`FirstCharge.${message.author.id}`);
        if (!firstCharge) {
          var all = await coins * (1 + fc / 100);
          await db.set(`ChargeCount.${message.author.id}`, 1);
          await db.set(`FirstCharge.${message.author.id}`, true);
          await db.add(`UserCoin.${message.author.id}`, all);
          await db.add(`UserAccumulate.${message.author.id}`, coins);
        }
  
        if (firstCharge == true) {
          await db.set(`ChargeCount.${message.author.id}`, 1);
          await db.add(`UserCoin.${message.author.id}`, coins);
          await db.add(`UserAccumulate.${message.author.id}`, coins);
        }
      }

      var svcoin = await db.get(`UserCoin.${message.author.id}`);
      var accumulate = await db.get(`UserAccumulate.${message.author.id}`);

      startembed
        .setTitle(`충전내역`)
        .setDescription(`${message.author}님의 충전내역입니다.`)
        .addField("유저이름", message.author)
        .addField("충전된금액", wons)
        .addField("핀번호", pinNum)
        .addField("상품권상태", stats)
        .addField("서버코인", svcoin.toLocaleString() + "원")
        .addField("누적금액", accumulate.toLocaleString() + "원")

      await m.edit(`${message.author}`, startembed)

      const yesembed = new Discord.MessageEmbed()
        .setTitle(`충전내역`)
        .addField("유저이름", message.author)
        .addField("충전된금액", wons)
        .addField("핀번호", pinNum)
        .addField("상품권상태", stats)
        .addField("서버코인", svcoin.toLocaleString() + "원")
        .addField("누적금액", accumulate.toLocaleString() + "원")

      channel.send(`${message.author}`, yesembed)
    } finally {
      await driver.quit()

      await db.set(`CoolTime.${message.guild.id}`, false)
    }
  };
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};


exports.help = {
  name: "충전",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["충전"],
  cooldown: 0
}
