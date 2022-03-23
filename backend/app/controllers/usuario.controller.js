const db = require("../models");
const Usuario = db.usuarios;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');

Usuario.hasMany(db.propriedades, {foreingKey: 'userId', as: 'propriedades'});



exports.create = (req, res) => { // Validate request
    if (!req.body.nome) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }

    // Criar Usuario
    const usuario = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        telefone: req.body.telefone,
        email: req.body.email,
        senha: bcrypt.hashSync(req.body.senha, 10),
        tipo: req.body.tipo
    }; 

    // Save Ususario in the database
    Usuario.create(usuario).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Ususario."
        });
    });
};

// Retrieve all Ususarios from the database.
exports.findAll = (req, res) => {
    const nome = req.query.nome;
    var condition = nome ? {
        nome: {
            [Op.like]: `%${nome}%`
        }
    } : null;
    const tipo = req.query.tipo;
    var condition = tipo ? {
        tipo: tipo
    } : null;

    Usuario.findAll({where: condition}).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Ususarios."
        });
    });
};

// Find a single Ususario with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log(id);

    Usuario.findByPk(id).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error retrieving Ususario with id=" + id
        });
    });
};

// Update a Ususario by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    if (req.body.senha) 
        req.body.senha = bcrypt.hashSync(req.body.senha, 10);
    

    Usuario.update(req.body, {
        where: {
            id: id
        }
    }).then(num => {
        if (num == 1) {
            res.send({message: "Ususario was updated successfully."});
        } else {
            res.send({message: `Cannot update Usuario with id=${id}. Maybe Ususario was not found or req.body is empty!`});
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error updating Ususario with id=" + id
        });
    });
};

// Delete a Ususario with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Usuario.destroy({
        where: {
            id: id
        }
    }).then(num => {
        if (num == 1) {
            res.send({message: "Ususario was deleted successfully!"});
        } else {
            res.send({message: `Cannot delete Ususario with id=${id}. Maybe Ususario was not found!`});
        }
    }).catch(err => {
        res.status(500).send({
            message: "Could not delete Ususario with id=" + id
        });
    });
};

// Delete all Ususarios from the database.
exports.deleteAll = (req, res) => {
    Usuario.destroy({where: {}, truncate: false}).then(nums => {
        res.send({message: `${nums} Ususarios were deleted successfully!`});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all Ususarios."
        });
    });
};
