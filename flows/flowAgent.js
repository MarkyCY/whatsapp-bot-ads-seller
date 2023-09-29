const { addKeyword } = require("@bot-whatsapp/bot");

const enviarObjetoCtx = require("../app")

/**
 * Esto se ejeuta cunado la persona escribe "AGENTE"
 */
const flowAgent = addKeyword("AGENTE", { sensitive: true })
  .addAnswer(
   "Estamos desviando tu conversacion a nuestro agente"
  )
  .addAction(async (ctx, {provider}) => {

    enviarObjetoCtx(ctx)

    const msg = `El cliente ${ctx.pushName} con el número +${ctx.from} le solicita.`

    await provider.sendText(`5350965015@c.us`, msg);

  })
  .addAnswer([
    'Un agente se pondrá en contacto con usted', 
    'Tenga Paciencia'
  ])

module.exports = flowAgent;
