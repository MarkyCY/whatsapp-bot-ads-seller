const { addKeyword } = require("@bot-whatsapp/bot");

const enviarObjetoCtx = require("../app")

const flowServices = addKeyword("SERVICIOS", { sensitive: true })
    .addAction(async (ctx, {provider}) => {

        enviarObjetoCtx(ctx)

        await provider.vendor.sendMessage(`${ctx.from}@c.us`, {
            text: '👤*Creador del Bot*🤖',
            contextInfo: {
              externalAdReply: {
                title: 'Marcos J Cardenas P',
                body: 'Desarrollador Full-Stack',
                mediaType: 'IMAGE', //VIDEO - IMAGE - NONE
                //showAdAttribution: false, //Mensaje a partir de un anuncio
                renderLargerThumbnail: true, 
                //mediaUrl: 'https://i.postimg.cc/vH4vMtPg/bc45c28a-fe24-48c3-807c-dd600f50e6b4.jpg',
                thumbnailUrl: 'https://i.postimg.cc/R0s0nxSC/Air-Brush-20230929011514.jpg', //url imagen
                sourceUrl: 'https://wa.me/5350965015',
              },
            },
          }); 
    })

module.exports = flowServices;