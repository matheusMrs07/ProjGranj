module.exports = (sequelize, Sequelize) => {
    const Tempreatura = sequelize.define("temperatura", {
      id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      max: {
        type: Sequelize.FLOAT
      },
      min: {    
        type: Sequelize.FLOAT
      },
      data:{
        type: Sequelize.DATE
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
  
    return Tempreatura;
  };