const mongoose = require("mongoose");

const Alunos = mongoose.Schema({
    "nome":{
        type:String,
        required:true
    },
    "idade":{
        type:Number,
        required:true
    },
    "Notas":{
        "1bim":[],
        "2bim":[],
        "3bim":[],
        "4bim":[],
        type:Number
    }
})

const Professores = mongoose.Schema({
    "nome":{
        type:String,
        required:true
    },
    "idade":{
        type:Number,
        required:true
    },
    "formacao":{
        type:String,
        required:true
    }
});

const Coordenacao = mongoose.Schema({
    "nome":{
        type:String,
        required:true
    },
    "idade":{
        type:Number,
        required:true
    }
})

const Direcao = mongoose.Schema({
    "nome":{
        type:String,
        required:true
    },
    "idade":{
        type:Number,
        required:true
    }
})

const Users = mongoose.Schema({
    "username":{
        type:String,
        required:true
    },
    "password":{
        type:String,
        required:true
    },
    "title":{
        type:String,
        required:true
    },
    "token":{
        type:String
    }
})

module.exports = {"Alunos":mongoose.model("Alunos",Alunos) , 
    "Professores":mongoose.model("Professores",Professores), 
    "Coordenacao":mongoose.model("Coodenação",Coordenacao), 
    "Direcao":mongoose.model("Direção",Direcao),
    "Users":mongoose.model("Users",Users)
}
    