import express, { Request, Response } from 'express';
import mysql, { RowDataPacket } from 'mysql2/promise';

// const router: Router = express.Router();
const router = express.Router();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'mitactest',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

interface DessertRow extends RowDataPacket {
  DESSERT_IMG: Buffer;
}

router.get('/', async (req: Request, res: Response): Promise<void> => {


  const id = req.query.id as string;

  if (!id) {
    res.status(400).send('缺少id參數');
  }

  try {
    const [rows] = await pool.query<DessertRow[]>('SELECT DESSERT_IMG FROM dessert WHERE DESSERT_ID = ?', [id]);

    if (rows.length === 0) {
       res.status(404).send('找不到圖片');
    }

    const imgBuffer = rows[0].DESSERT_IMG;

    res.contentType('image/gif');
    res.send(imgBuffer);

  } catch (err) {
    console.error(err);
    res.status(500).send('伺服器錯誤');
  }
});

export default router;
