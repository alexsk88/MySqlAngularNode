import express, { Application } from 'express'
import indexRoutes from './routes/indexRoutes';
import gamesRoutes from './routes/gamesRoutes';
import morgan from 'morgan';
import cors from 'cors';

class Server {

  app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config(): void {
    this.app.set('port', process.env.PORT || 3000);
    this.app.use(morgan('dev')); // Show http code
    this.app.use(cors()); // El CORS , ¡ ya tu sabe !

    this.app.use(express.json()); // Acepta JSON de clientes
    this.app.use(express.urlencoded({ extended: false })); // Acepta formulario HTML
  }

  routes(): void {
    this.app.use(indexRoutes);
    this.app.use('/api/games', gamesRoutes);
  }

  start(): void {
    this.app.listen(this.app.get('port'), () => {
      console.log("Server On Port", this.app.get('port'));

    })
  }
}

const server = new Server();
server.start();


