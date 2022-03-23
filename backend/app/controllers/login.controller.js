const db = require("../models");
const Usuario = db.usuarios;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = "mysecret";


// Find a single Ususario with an id
exports.get = (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;
    console.log(email);

    Usuario.findAll({
        where: {
            email: email
        }
    }).then(data => {
        
        if(data != null){
            dados =data[0].dataValues;
            if (bcrypt.compareSync(senha, dados.senha)) {

                const payload = { email };
                const token = jwt.sign(payload, secret, {
                    expiresIn: '24h'
                })

                res.cookie('token', token, {httpOnly: true});
                res.status(200).json({
                    status: 1, 
                    token: token, 
                    auth: true, 
                    id_client: dados.id,
                    user_name: dados.nome,
                    user_tipo: dados.tipo
                });
            }
            else {
                res.status(200).json({
                    status: 2, 
                    msg: "Senha incorreta"
                });
            }   
        }else{
            res.status(200).json({
                status: 3, 
                msg: "Usuário não encontrado"
            });
        }
        

    }).catch(err => {
        res.status(200).send({
            status: 3, 
            msg: "Usuário não encontrado"
        });
    });
};

exports.checkToken = (req, res)=>{
    const token = req.headers.token;
    if(!token){
        res.json({status: 401, msg: "Nao autorizado! Token não encontrado"});
    }else{
        jwt.verify(token,secret, function(err, decoded){
            if(err){
                res.json({status: 401, msg: "Nao autorizado! Token inválido"});
            }else{
                res.json({status: 200});
            }
        })
    }
}

exports.destroyToken = (req, res) => {
    
    const token = req.headers.token;
    console.log(token);
    if(token){
        res.cookie('token', null, {httpOnly:true});
    }else{
        res.status(401).send("Logout não autorizado!");
    }
    res.send("Sessão finalizada com sucesso");
}
