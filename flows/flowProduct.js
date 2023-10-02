const { addKeyword } = require("@bot-whatsapp/bot");
const { run, getDb } = require("../module/mongo");

const sendAd = require("../module/sendAd");

// Flujo de Productos
const flowProduct = addKeyword("PRODUCTOS", { sensitive: true })
  .addAnswer([
    "*_Seleccione una categoría:_*",
    "",
    "*1* 👕 ```Ropa superior: Camisas, Pullovers, etc.```",
    "*2* 👖 ```Pantalones y Shorts```",
    "*3* 👗 ```Vestidos y Conjuntos Completos```",
    "*4* 👟 ```Calzado```",
    "*5* 🎩 ```Sombreros y Gorros```",
    "*6* 📿 ```Otros Accesorios```",
    "",
    "_Para seleccionar una categoría basta con escribir su número._",
  ])
  .addAction(
    { capture: true },
    async (ctx, { flowDynamic, provider, fallBack }) => {
      if (ctx.body >= 1 && ctx.body <= 6) {
        flowDynamic(`Bien, mostrando categoría *${ctx.body}*...`);

        try {
          await run();
          const db = getDb();
          const _pants = db.collection("pants");
          const cursor = _pants.find();

          // Usar el método toArray para obtener los documentos en un arreglo
          const documents = await cursor.toArray();

          // Recorrer el arreglo de documentos
          documents.forEach((doc) => {
            const messageOptions = {text: `Precio: *$${doc.descr.price}*\nTallas: *${doc.descr.size.join(" ")}*\nColores: *${doc.descr.color.join("")}*\nCantidad: *${doc.descr.cant}*`,
              title: doc.title,
              body: doc.body,
              thumbnailUrl: doc.thumbnailUrl,
              sourceUrl: doc.sourceUrl,
              renderLargerThumbnail: doc.renderLargerThumbnail,
            };

            sendAd(ctx, provider, messageOptions);
          });
        } catch (err) {
          console.error("Error al conectar a la base de datos:", err);
          return fallBack(
            `*Ocurrió un error al obtener los datos de la base de datos.*`
          );
        }
      } else {
        return fallBack(`*Por favor escriba una categoría.*`);
      }
    }
  );
  
  module.exports = flowProduct;
