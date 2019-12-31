import { Request, Response } from 'express';
import pool from '../database';

class IndexController {

  index(req: Request, res: Response) {

    // let sql = pool.query("SELECT * categorias");

    res.json({
      texto: "Hola desde el controller INDEC",

    });
  }


}

const indexController = new IndexController();
export default indexController;