import { DataTypes, Model } from 'sequelize';
import db from '.';

class Match extends Model {
  public id!: number;
  public homeTeam!: number;
  public homeTeamGoals!: string;
  public awayTeam!: number;
  public awayTeamGoals!: string;
  public inProgress!: string;
}

Match.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  awayTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default Match;
