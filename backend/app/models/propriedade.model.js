module.exports = (sequelize, Sequelize) => {
    const Propriedades = sequelize.define("propriedades", {
      id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      latitude: {
        type: Sequelize.STRING
      },
      longitude: {
        type: Sequelize.STRING
      },
      endereco: {
        type: Sequelize.STRING
      },
      usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         
          model: 'usuarios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete:'CASCADE'
      },
      createdAt: {
        field: 'CREATED_AT',
        type: Sequelize.DATE,
      },
      updatedAt: {
          field: 'UPDATED_AT',
          type: Sequelize.DATE,
      },
    });
  
    return Propriedades;
  };