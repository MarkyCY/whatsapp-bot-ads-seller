const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')
const express = require('express')
const bodyParser = require("body-parser");

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
//const TwilioProvider = require('@bot-whatsapp/provider/twilio')
const MockAdapter = require('@bot-whatsapp/database/mock')

/*
    WebSockets
*/

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('Cliente conectado');

  ws.on('message', function incoming(message) {
    console.log('Mensaje recibido: ', message);
  });

  ws.on('close', function close() {
    console.log('Cliente desconectado');
  });
});

// Enviar el objeto ctx a través de websockets
function enviarObjetoCtx(objeto) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(objeto));
    }
  });
}

module.exports = enviarObjetoCtx

/*
    Flujos de Conversación
*/

const flowWelcome = require("./flows/flowWelcome")

//const flowServices = require("./flows/flowServices")

const flowAgent = require("./flows/flowAgent");

const flowAbout = require("./flows/flowAbout")

/*
    Run App
*/
const app = express();
app.use(bodyParser.json());

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterProvider = createProvider(BaileysProvider)
    /*const adapterProvider = createProvider(TwilioProvider, {
        accountSid: "ACedf23e4ef05767a1a0eec8422f2a191b", //AC4695aa720b4d700a***************
        authToken: "1cc8bab1c0149f1488e1c41005901233", //3f6fae09f7a1c3534***************
        vendorNumber: "+14155238886", //+14155238886
    })*/
    const adapterFlow = createFlow([
        flowWelcome,
        flowAgent, 
        flowAbout,
    ])

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()

    /*
        Api de envio de mensajes
    */
    app.post("/send-message-bot", async (req, res) => {
    const num = req.body.number;
    const text = req.body.text;
    await adapterProvider.sendText(`${num}@c.us`, text);
    res.send({ data: "enviado!" });
  });

      const PORT = 4000;
      app.listen(PORT, () => console.log(`Servidor API: http://localhost:${PORT}`));
    };
    

main()
