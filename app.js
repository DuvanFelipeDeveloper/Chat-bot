const qrcode = require("qrcode-terminal");
const { Client } = require("whatsapp-web.js");
const client = new Client();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.initialize();

client.on("message", async (message) => {
  
  let answer =  await getAnswer(message.body);
  console.log(answer);
  client.sendMessage(message.from, answer);
});

async function getAnswer(question) {
  console.log("entra");
  let url =
    "http://127.0.0.1:5000/api?question=" + encodeURIComponent(question);

  try {
    let response = await fetch(url);
    let data = await response.json();
    let answer = data.answer.toString();

    return answer;
  } catch (error) {
    console.error(error);
  }
}
