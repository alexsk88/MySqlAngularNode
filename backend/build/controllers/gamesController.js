"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class GamesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT g.*, c.title AS categoria_name FROM games g INNER JOIN categorias c ON g.categoria_id = c.id', (err, result, fields) => {
                if (err)
                    throw err;
                res.json(result);
            });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            // Se le llama destructuring, solo saca una parte de un OBJETO, en este caso solo id
            let select = "SELECT g.*, c.title AS categoria_name FROM games g ";
            let inner = `INNER JOIN categorias c ON g.categoria_id = c.id AND g.id = ${id}`;
            yield database_1.default.query(`${select}${inner}`, (err, result, fields) => {
                if (err)
                    throw err;
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
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("INSERT INTO games set ?", [req.body]);
            // console.log("EL GAME ES", req.body);
            res.json({
                message: "Juego Guardado"
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query(`DELETE FROM games WHERE id = ${id}`);
            res.json({
                status: 'success',
                texto: "Delete game"
            });
        });
    }
    edit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query(`UPDATE games SET ? WHERE id = ${id}`, [req.body]);
            // se puede utilizar ${} para req.body pero, pues de otra manera show here
            res.json({
                texto: "Game editado"
            });
        });
    }
}
exports.gamesController = new GamesController();
