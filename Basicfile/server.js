const Discord = require("discord.js");
const { Collection } = require("discord.js");
const Invites = new Collection();
const tutorialBot = require("../handler/ClientBuilder.js");
const client = new tutorialBot();
// const main = require("../web_server/main");
// main.run();

require("../handler/module.js")(client);
require("../handler/Event.js")(client);

client.commands = new Collection();
client.queue = new Map();
client.on("warn", console.warn);
client.on("error", console.error);
client.login(client.config.token).catch(console.error);