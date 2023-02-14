const TelegramApi = require("node-telegram-bot-api");
const fs = require("fs");
const TOKENS = require("./src/token");

const TOKEN = TOKENS.TOKEN_API;

const bot = new TelegramApi(TOKEN, {
  polling: true,
});
bot.setMyCommands([{ command: "/start", description: "Вітаю тебе!" }]);

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  const receipts = getObjectsFromJson("./src/receipts.json");
  if (text === "/start") {
    // bot.sendMessage(chatId, "hello");
    bot
      .sendPhoto(chatId, "./src/img/hello.jpg", {
        caption: `Привіт. Вітаю тебе! Напиши мені число від 0 до ${
          receipts.length - 1
        }`,
      })
      .then(function (data) {
        console.log(data);
      });
  }
  if (text >= 0 && text <= receipts.length - 1) {
    bot
      .sendPhoto(chatId, receipts[text].photo, {
        caption: receipts[text].name,
      })
      .then(function (data) {
        bot.sendMessage(chatId, receipts[text].description);
      });
  }
  if (text === "love") {
    bot
      .sendPhoto(
        chatId,
        "https://toys-kopitsa.com.ua/image/cache/bd8cf0f55d6094dc12fb0761efa44fa1.jpg",
        {
          caption:
            "ладно, розкусила. Люблю тебе моя гарнюня, кицька, пуська :*",
        }
      )
      .then(function (data) {});
  }
});

const getObjectsFromJson = (data) => {
  let rawdata = fs.readFileSync(data);
  let result = JSON.parse(rawdata);
  //   console.log(result);
  return result;
};
