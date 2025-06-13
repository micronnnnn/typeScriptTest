"use strict";
// 使用 CommonJS 模式的 TypeScript 寫法
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dessertRoute_1 = __importDefault(require("./routes/dessertRoute"));
const dessertPicRoute_1 = __importDefault(require("./routes/dessertPicRoute"));
// 建立 app 實例
const app = (0, express_1.default)();
// ✅ 使用 CommonJS 的 __dirname
// const isPkg = (process as any).pkg;
const basePath = path_1.default.resolve(__dirname, '..', 'src');
// 設定靜態資源與中介層
app.use(express_1.default.static(path_1.default.join(basePath, 'public')));
app.use(express_1.default.json({ limit: '100mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
// 匯入路由（用 require 可以避免 module type 問題，也可用 import）
// const dessertRouter = require('./routes/dessertRoute');
// const picRouter = require('./routes/dessertPicRoute');
// const shoppingCartRouter = require('./routes/shoppingCartRoute');
// const promoteRoute = require('./routes/promoteRoute');
// const lineBotRoute = require('./routes/lineBotRoute');
// const orderRoute = require('./routes/orderRoute');
// 路由註冊
app.use('/dessert', dessertRoute_1.default);
// app.use('/dessert', shoppingCartRouter);
// app.use('/dessert', promoteRoute);
app.use('/dessertPic', dessertPicRoute_1.default);
// app.use('/', lineBotRoute);
// app.use('/dessert', orderRoute);
// 前端畫面路由
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(basePath, 'public', 'index.html'));
});
app.get('/backView', (req, res) => {
    res.sendFile(path_1.default.join(basePath, 'public', 'backView', 'dessert.html'));
});
app.get('/orderView', (req, res) => {
    res.sendFile(path_1.default.join(basePath, 'public', 'backView', 'order.html'));
});
app.get('/promoteView', (req, res) => {
    res.sendFile(path_1.default.join(basePath, 'public', 'backView', 'promotcode.html'));
});
app.get('/frontView', (req, res) => {
    res.sendFile(path_1.default.join(basePath, 'public', 'index.html'));
});
app.get('/checkoutView', (req, res) => {
    res.sendFile(path_1.default.join(basePath, 'public', 'frontView', 'order.html'));
});
// 啟動伺服器
app.listen(3000, () => {
    console.log('✅ Server is running on http://localhost:3000');
});
