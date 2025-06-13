import { Sequelize } from 'sequelize';

// 建立 Sequelize 實例
export const sequelize = new Sequelize('mitactest', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    connectTimeout: 30000
  },
  pool: {
    max: 50,
    min: 10,
    acquire: 30000,
    idle: 600000
  }
});

// 定義重試連線函式
export async function connectWithRetry(retries: number = 5, delay: number = 5000): Promise<Sequelize> {
  for (let i = 0; i < retries; i++) {
    try {
      await sequelize.authenticate();
      console.log('✅ 資料庫連線成功！');
      return sequelize;
    } catch (err: any) {
      console.error(`❌ 第 ${i + 1} 次連線失敗：`, err.message);
      if (i < retries - 1) {
        console.log(`⏳ 等待 ${delay / 1000} 秒後重試...`);
        await new Promise(res => setTimeout(res, delay));
      } else {
        console.error('🚫 已達最大重試次數，無法連線資料庫。');
        throw err;
      }
    }
  }
    // 這裡補一個 throw，理論不會到這裡，但 TS 要求：
  throw new Error('Unreachable code: failed to connect but did not throw.');
}

// 自動執行一次
connectWithRetry();
