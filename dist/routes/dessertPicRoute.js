"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const promise_1 = __importDefault(require("mysql2/promise"));
// const router: Router = express.Router();
const router = express_1.default.Router();
const pool = promise_1.default.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mitactest',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
router.get('/', async (req, res) => {
    const id = req.query.id;
    if (!id) {
        res.status(400).send('缺少id參數');
    }
    try {
        const [rows] = await pool.query('SELECT DESSERT_IMG FROM dessert WHERE DESSERT_ID = ?', [id]);
        if (rows.length === 0) {
            res.status(404).send('找不到圖片');
        }
        const imgBuffer = rows[0].DESSERT_IMG;
        res.contentType('image/gif');
        res.send(imgBuffer);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('伺服器錯誤');
    }
});
exports.default = router;
