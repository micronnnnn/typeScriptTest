"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { body, validationResult } = require('express-validator');
const dessert_1 = __importDefault(require("../models/dessert")); // 使用 import, 且 model 需加 export
const router = express_1.default.Router();
// 查詢甜點資料
router.post('/dessertQuery', async (req, res) => {
    try {
        const desserts = await dessert_1.default.findAll();
        res.json(desserts);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: '資料查詢失敗' });
    }
});
// // 新增甜點
// router.post(
//   '/dessertAdd',
//   body('dessertItem.dessert_name').notEmpty().withMessage('甜點名稱不能為空'),
//   body('dessertItem.dessert_price').isInt({ min: 0 }).withMessage('價格需為正整數'),
//   body('dessertItem.dessert_amount').isInt({ min: 0 }).withMessage('庫存需為正整數'),
//   async (req: Request, res: Response) => {
//     const errors = validationResult(req);
//     const dessertItem = req.body.dessertItem;
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     try {
//       // 圖片：Base64 轉 Buffer（若有值）
//       let dessertPicBuffer: Buffer | null = null;
//       if (dessertItem.dessertpic) {
//         dessertPicBuffer = Buffer.from(dessertItem.dessertpic, 'base64');
//       }
//       const newDessert = await Dessert.create({
//         dessert_preserve_date: dessertItem.dessert_preserve_date || 0,
//         dessert_type_id: dessertItem.dessert_type_id || 0,
//         dessert_name: dessertItem.dessert_name,
//         dessert_price: dessertItem.dessert_price || 0,
//         dessert_amount: dessertItem.dessert_amount || 0,
//         dessert_instruction: dessertItem.dessert_instruction || null,
//         dessert_total_score: dessertItem.dessert_total_score || 0,
//         dessert_total_people: dessertItem.dessert_total_people || 0,
//       });
//        res.send('新增成功');
//     } catch (error) {
//       console.error('資料新增失敗', error);
//       return res.status(500).json({ error: '新增甜點時發生錯誤' });
//     }
//   }
// );
exports.default = router;
