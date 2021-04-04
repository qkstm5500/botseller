const fs = require("fs");
const { Collection, Client } = require("discord.js");
const Discord = require("discord.js");
const Invites = new Collection();

module.exports = client => {
  console.log("--------------------------------");
  console.log("봇이 실행되었습니다");
  console.log("--------------------------------");
  (async function () {
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    };
    answered1 = true;
    answered2 = true;
    answered3 = true;
    userAnswer1 = "";
    userAnswer2 = "";
    userAnswer3 = "";
    var i = 0;
    while (i < 10) {
      client.user.setPresence({
        activity: {
          name: `자판기를 사용하여 구매해보세요!`,
          type: 'STREAMING',
          url: 'https://www.twitch.tv/leenun12'
        }
      })
      await sleep(5000)
      client.user.setPresence({
        activity: {
          name: `구매해주셔서 감사합니다!`,
          type: 'STREAMING',
          url: 'https://www.twitch.tv/leenun12'
        }
      })
      await sleep(5000)
    }
  })();
}

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
