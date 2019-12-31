"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    index(req, res) {
        // let sql = pool.query("SELECT * categorias");
        res.json({
            texto: "Hola desde el controller INDEC",
        });
    }
}
const indexController = new IndexController();
exports.default = indexController;
