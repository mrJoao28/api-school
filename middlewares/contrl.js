const jwt = require("jsonwebtoken");
require("dotenv").config();

const tokenAccess = {"aluno":process.env.ACCESS_TOKEN_ALUNO,"professor":process.env.ACCESS_TOKEN_PROFESSOR,"coordenador":process.env.ACCESS_TOKEN_COORDENADOR,"diretor":process.env.ACCESS_TOKEN_DIRETOR}
const tokenRefresh = {"aluno":process.env.REFRESH_TOKEN_ALUNO,"professor":process.env.REFRESH_TOKEN_PROFESSOR,"coordenador":process.env.REFRESH_TOKEN_COORDENADOR,"diretor":process.env.REFRESH_TOKEN_DIRETOR}


const verify= (req,res,next)=>{
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({"message":"nao autorizado"});
    console.log(authHeader);
    const token = authHeader.split(" ")[1]
    const title = Object.keys(tokenAccess).find(key => tokenAccess[key] === token)
    if (!title) return res.status(400).json({"message":"usuario invalido"})
    jwt.verify(
        token,
        tokenAccess[title],
        (err, decoded)=>{
            if (err) return res.sendStatus(403)
                req.user = decoded.username;
            next();
        }
    )
}

module.exports = verify