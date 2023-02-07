import { STRING, INTEGER, DATE, Model } from 'sequelize';
import db from '.';
import Link from './Link';

export default class User extends Model {
  id!: number;

  username!: string;

  email!: string;

  password!: string;

  createdAt!: Date;

  updatedAt!: Date;
}

User.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: STRING,
      allowNull: false,
    },
    email: {
      type: STRING,
      allowNull: false,
    },
    password: {
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
    modelName: 'users',
    timestamps: true,
  },
);

Link.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Link, { foreignKey: 'id' });
