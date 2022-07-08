import { DataTypes, Model } from 'sequelize';
import db from '.';
// import Match from './Match.model';

class Team extends Model {
  public id!: number;
  public teamName!: string;
}

Team.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

// Team.hasMany(Match, { foreignKey: 'id', as: 'matches' });

export default Team;
