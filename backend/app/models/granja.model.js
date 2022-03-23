module.exports = (sequelize, Sequelize) => {
    const Granjas = sequelize.define("granjas", {
      id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      capacidade: {
        type: Sequelize.INTEGER
      },
      propriedadeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         
          model: 'propriedades',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete:'CASCADE'
      }
    });
  
    return Granjas;
  };