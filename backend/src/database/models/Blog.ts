import { STRING, INTEGER, DATE, Model } from 'sequelize';
import db from '.';

export default class Blog extends Model {
  id!: number;

  name!: string;

  createdAt!: Date;

  updatedAt!: Date;
}

Blog.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    createdAt: {
      type: DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  },
  {
    underscored: false,
    sequelize: db,
    modelName: 'blogs',
    timestamps: true,
  },
);
