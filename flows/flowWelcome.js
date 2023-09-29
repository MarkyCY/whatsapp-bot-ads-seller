const { addKeyword } = require("@bot-whatsapp/bot");

const enviarObjetoCtx = require("../app")

const flowWelcome = addKeyword(['hola!'])
    .addAnswer('Gracias por comunicarte con TeamHouse')
    .addAnswer([
        'Use los siguientes comandos para su acción correspondiente:',
        '',
        '*SERVICIOS* ver la lista de productos.',
        '*AGENTE* comunicarse con un agente.',
        '*SOBRE* información de la aplicación.',
    ])
    .addAction(async (ctx, {provider}) => {

        enviarObjetoCtx(ctx)

    })

    module.exports = flowWelcome;