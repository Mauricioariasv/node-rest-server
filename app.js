require('dotenv').config();

const Server = require('./models/server');



// Levantar el servidor a través de las clases 
const server = new Server();
server.listen();