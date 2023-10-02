const { MongoClient, ServerApiVersion } = require('mongodb');

const mongo_user = process.env.USER_MONGO;
const mongo_pass = process.env.PASS_MONGO;

// URL de conexión a la base de datos MongoDB
const url = `mongodb://127.0.0.1:27017/`;
//const url = `mongodb+srv://${mongo_user}:${mongo_pass}@cluster0.nipfwih.mongodb.net/?retryWrites=true&w=majority`;

// Nombre de la base de datos
const dbName = 'shop';

// Crea una instancia del cliente de MongoDB
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Función para conectar a la base de datos
async function run() {
  try {
    await client.connect();
    
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err);
    throw err;
  }
}

// Función para obtener la instancia de la base de datos
function getDb() {
  return client.db(dbName);
}

// Exporta las funciones para su uso en otros módulos
module.exports = {
  run,
  getDb,
};
