import { STRING, INTEGER, DATE, Model } from 'sequelize';
import db from '.';

export default class Link extends Model {
  id!: number;

  title!: string;

  link!: string;

  userId!: number;

  createdAt!: Date;

  updatedAt!: Date;
}

Link.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: STRING,
      allowNull: false,
    },
    link: {
      type: STRING,
      allowNull: false,
    },
    userId: {
      type: INTEGER,
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
    modelName: 'links',
    timestamps: true,
  },
);
