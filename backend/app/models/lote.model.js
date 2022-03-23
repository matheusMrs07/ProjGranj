module.exports = (sequelize, Sequelize) => {
    const Lotes = sequelize.define("lotes", {
      id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      numero: {
        type: Sequelize.STRING
      },
      granjaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         
          model: 'granjas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete:'CASCADE'
      }
    });
  
    return Lotes;
  };