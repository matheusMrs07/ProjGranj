const db = require("../models");
const Lotes = db.lotes;
const Op = db.Sequelize.Op;

Lotes.belongsTo(db.granjas);

exports.create = (req, res) => { // Validate request
    

    // Criar Propeiedade
    const lote = {
        numero: req.body.numero,
        granjaId: req.body.granjaId
    }; 

    // Save Ususario in the database
    Lotes.create(lote).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Lote."
        });
    });
};

// Retrieve all Ususarios from the database.
exports.findAll = (req, res) => {
    
    const params = req.query;
    console.log(params);

    Lotes.findAll({
        where: params,  
        include: db.granjas
    }).then(data => {
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

    Lotes.findByPk(id).then(data => {
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
    

    Lotes.update(req.body, {
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

    Lotes.destroy({
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
    Lotes.destroy({where: {}, truncate: false}).then(nums => {
        res.send({message: `${nums} Ususarios were deleted successfully!`});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all Ususarios."
        });
    });
};
