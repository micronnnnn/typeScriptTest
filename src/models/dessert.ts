// src/models/Dessert.ts
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/RDB';  // 請根據實際路徑修改

// 先定義 Dessert 的欄位型別
interface DessertAttributes {
  dessert_id: number;
  dessert_preserve_date: number;
  dessert_type_id: number;
  dessert_name: string;
  dessert_price: number;
  dessert_amount: number;
  dessert_instruction: string;
  dessert_total_score?: number | null;
  dessert_total_people?: number | null;
  dessert_pic?: string | null;
}

// 新增時可選擇不帶 primary key，故要用 Optional
interface DessertCreationAttributes extends Optional<DessertAttributes, 'dessert_id'> {}

// 用類別擴充 Sequelize Model
class Dessert extends Model<DessertAttributes, DessertCreationAttributes> implements DessertAttributes {
  public dessert_id!: number;
  public dessert_preserve_date!: number;
  public dessert_type_id!: number;
  public dessert_name!: string;
  public dessert_price!: number;
  public dessert_amount!: number;
  public dessert_instruction!: string;
  public dessert_total_score!: number | null;
  public dessert_total_people!: number | null;
  public dessert_pic!: string | null;
}

// 定義 model
Dessert.init(
  {
    dessert_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'DESSERT_ID',
    },
    dessert_preserve_date: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
      field: 'DESSERT_DATE',
    },
    dessert_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 2,
      },
      field: 'DESSERT_TYPE_ID',
    },
    dessert_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: /^[\u4e00-\u9fa5a-zA-Z]+$/i,
      },
      field: 'DESSERT_NAME',
    },
    dessert_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
      field: 'DESSERT_PRICE',
    },
    dessert_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
      field: 'DESSERT_AMOUNT',
    },
    dessert_instruction: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      field: 'DESSERT_INSTRUCTION',
    },
    dessert_total_score: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'TKT_TOTAL_SCORE',
    },
    dessert_total_people: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'TKT_TOTAL_PEOPLE',
    },
    dessert_pic: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'DESSERT_IMG',
    },
  },
  {
    sequelize,
    tableName: 'dessert',
    timestamps: false,
  }
);

export default Dessert;

