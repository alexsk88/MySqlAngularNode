import { Request, Response } from 'express';
import pool from '../database';

class GamesController {


  async list(req: Request, res: Response): Promise<void> {

    await pool.query('SELECT g.*, c.title AS categoria_name FROM games g INNER JOIN categorias c ON g.categoria_id = c.id', (err, result, fields) => {
      if (err) throw err;

      res.json(result);
    });

  }

  async getOne(req: Request, res: Response): Promise<void> {

    const { id } = req.params;
    // Se le llama destructuring, solo saca una parte de un OBJETO, en este caso solo id

    let select = "SELECT g.*, c.title AS categoria_name FROM games g ";
    let inner = `INNER JOIN categorias c ON g.categoria_id = c.id AND g.id = ${id}`;

    await pool.query(`${select}${inner}`, (err, result, fields) => {
      if (err) throw err;

      if (result.length == 0) {

        res.json({
          status: 'success',
          message: `No hay nada con este ID: ${id}`
        });
      }
      else {
        res.json({
          status: 'success',
          data: result
        });
      }
    });
  }

  async create(req: Request, res: Response): Promise<void> {

    await pool.query("INSERT INTO games set ?", [req.body]);
    // console.log("EL GAME ES", req.body);

    res.json({
      message: "Juego Guardado"
    });

  }

  async delete(req: Request, res: Response): Promise<void> {

    const { id } = req.params;

    await pool.query(`DELETE FROM games WHERE id = ${id}`);

    res.json({
      status: 'success',
      texto: "Delete game"
    });
  }

  async edit(req: Request, res: Response): Promise<void> {

    const { id } = req.params;

    await pool.query(`UPDATE games SET ? WHERE id = ${id}`, [req.body]);
    // se puede utilizar ${} para req.body pero, pues de otra manera show here

    res.json({
      texto: "Game editado"
    });
  }
}

export const gamesController = new GamesController();