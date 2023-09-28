const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')
const express = require('express')
const bodyParser = require("body-parser");

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const { EVENTS } = require('@bot-whatsapp/bot')


const flowBienvenida = addKeyword(EVENTS.WELCOME)
    .addAnswer('Bienvenido a este chatbot')
    .addAnswer([
        'Escribe cualquiera de los comandos:',
        '*info* para...',
        '*agente* para...',
    ])
    .addAction(async(ctx) => {

        console.log(ctx)
        
    })

const app = express();
app.use(bodyParser.json());

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowBienvenida])
    const adapterProvider = createProvider(BaileysProvider)

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
