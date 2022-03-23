module.exports = (sequelize, Sequelize) => {
  const Usuarios = sequelize.define("usuarios", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    }, 
    nome: {
      type: Sequelize.STRING
    },
    cpf: {
      type: Sequelize.STRING
    },
    telefone: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    senha: {
      type: Sequelize.STRING
    },
    tipo: {
      type: Sequelize.INTEGER
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
  return Usuarios;
};
