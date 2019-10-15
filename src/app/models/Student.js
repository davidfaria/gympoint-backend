import Sequelize, { Model } from 'sequelize';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        age: Sequelize.INTEGER,
        weight: Sequelize.DECIMAL(10, 2),
        feet_tall: Sequelize.DECIMAL(10, 2),
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Student;
