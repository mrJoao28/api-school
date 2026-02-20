const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const {Alunos , Professores , Coordenacao , Direcao , Users} = require("../model/class")
require("dotenv").config()

const tokenAccess = {"aluno":process.env.ACCESS_TOKEN_ALUNO,"professor":process.env.ACCESS_TOKEN_PROFESSOR,"coordenador":process.env.ACCESS_TOKEN_COORDENADOR,"diretor":process.env.ACCESS_TOKEN_DIRETOR}
const tokenRefresh = {"aluno":process.env.REFRESH_TOKEN_ALUNO,"professor":process.env.REFRESH_TOKEN_PROFESSOR,"coordenador":process.env.REFRESH_TOKEN_COORDENADOR,"diretor":process.env.REFRESH_TOKEN_DIRETOR}
const criarNovoUser = async (req,res)=>{
    const name = req.body.username
    const pwd = req.body.password
    const title = req.body.title
    if (!name || !pwd ||!title) return res.status(402).json({"message":"o nome e a senha precisao ser colocados"})
    try{
        const pwdHashed = await bcrypt.hash(pwd,10)
        const newUser = await Users.create({"username":name,"password":pwdHashed,"title":title});
       return res.status(200).json(newUser)
    }catch(err){
        return res.status(500).json({"erro":err.message})
    }
}

const acessar = async (req,res)=>{
    const name = req.body.username;
    const pwd = req.body.password;
    const id = req.params.id;
    try {
    if (!name || !pwd || !id) return res.status(403).json({"message":"preencha todos os dados"});
    const foundUser = await Users.findOne({_id:id});
    if (!foundUser) return res.status(404).json({"message":"usuario nao encontrado"});
    const checkPwd = await bcrypt.compare(pwd,foundUser.password);
    if(!checkPwd) return res.status(405).json({"message":"senha errada"})
    const title = foundUser.title;
    const accessToken = jwt.sign(
                        {"username":foundUser.username},
                    tokenAccess[title],
                {expiresIn: '360s'});
    const refreshToken = jwt.sign(
                        {"username":foundUser.username},
                    tokenRefresh[title],
                {expiresIn: '2d'});
    await Users.findByIdAndUpdate({_id:id,"token":refreshToken})
    res.cookie('jwt',refreshToken,{httpOnly:true, maxAge:2*24*60*60*1000})
    res.json({accessToken})
    } catch(err){
        return res.status(500).json({"message":err.message})
    }
}




const getAllAlunos = async (req,res)=>{
    try{
        const alunos = await Alunos.find({})
        res.status(200).json({"data":alunos})
    }catch(err){
        res.status(500).json({"message":err.message})
    }
}

const getAluno = async (req,res)=>{
    try {
        const id = req.params.id
        if (!id) return res.status(402).json({"message":"envie uma identificaçao valida"})
        const aluno = await Alunos.find({_id:id})
         res.status(200).json(aluno)
    } catch (err) {
        return res.status(500).json({"message":err.message})
    }
}

const registerAluno = async (req,res) =>{
    const name = req.body.name;
    const age = req.body.age;
    try {
        const refreshToken = process.env.ALUNO_TOKEN_REFRESH
        const aluno = await Alunos.create({"name":name,"age":age});
        res.status(200).json(aluno)
    }catch(err){
       return res.status(500).json({"message":err.message})
    }
}

const deleteAluno = async (req,res)=>{
    try {
        const id = req.params.id
        if (!id) return res.status(402).json({"message":"envie uma identificaçao valida"})
        await Alunos.findByIdAndDelete({_id:id})
         res.status(200).json({"message":"aluno removido"})
    } catch (err) {
        return res.status(500).json({"message":err.message})
    }
}



const getAllProfessores = async (req,res)=>{
    try{
        const professores = await Professores.find({})
        res.status(200).json({"data":professores})
    }catch(err){
       return res.status(500).json({"message":err.message})
    }
}

const getProfessor = async (req,res)=>{
    try {
        const id = req.params.id
        if (!id) return res.status(402).json({"message":"envie uma identificaçao valida"})
        const professor = await Professores.find({_id:id})
         res.status(200).json(professor)
    } catch (err) {
       return res.status(500).json({"message":err.message})
    }
}

const deleteProfessor = async (req,res)=>{
    try {
        const id = req.params.id
        if (!id) return res.status(402).json({"message":"envie uma identificaçao valida"})
        await Professores.findByIdAndDelete({_id:id})
         res.status(200).json({"message":"professor removido"})
    } catch (err) {
        return res.status(500).json({"message":err.message})
    }
}

const registerProfessor = async (req,res) =>{
    const name = req.body.name;
    const age = req.body.age;
    const forma = req.body.formacao;
    try {
        const professor = await Professores.create({"name":name,"age":age,"formacao":forma});
        res.status(200).json(professor)
    }catch(err){
       return res.status(500).json({"message":err.message})
    }
}


const getAllCoordenadores = async (req,res)=>{
    try{
        const coordenadores = await Coordenacao.find({})
        res.status(200).json({"data":coordenadores})
    }catch(err){
       return res.status(500).json({"message":err.message})
    }
}

const getCoordenador = async (req,res)=>{
    try {
        const id = req.params.id
        if (!id) return res.status(402).json({"message":"envie uma identificaçao valida"})
        const coordenador = await Coordenacao.find({_id:id})
        return res.status(200).json(coordenador)
    } catch (err) {
       return res.status(500).json({"message":err.message})
    }
}

const deleteCoordenador = async (req,res)=>{
    try {
        const id = req.params.id
        if (!id) return res.status(402).json({"message":"envie uma identificaçao valida"})
        await Coordenacao.findByIdAndDelete({_id:id})
         res.status(200).json({"message":"coordenador removido"})
    } catch (err) {
        return res.status(500).json({"message":err.message})
    }
}

const registerCoordenador = async (req,res) =>{
    const name = req.body.name;
    const age = req.body.age;
    try {
        const coordenador = await Coordenacao.create({"name":name,"age":age});
        res.status(200).json(coordenador)
    }catch(err){
       return res.status(500).json({"message":err.message})
    }
}


const getAllDiretores = async (req,res)=>{
    try{
        const diretores = await Direcao.find({})
       return res.status(200).json({"data":diretores})
    }catch(err){
       return res.status(500).json({"message":err.message})
    }
}

const getDiretor = async (req,res)=>{
    try {
        const id = req.params.id
        if (!id) return res.status(402).json({"message":"envie uma identificaçao valida"})
        const diretor = await Direcao.find({_id:id})
       return res.status(200).json(diretor)

    } catch (err) {
       return res.status(500).json({"message":err.message})
    }
}

const deleteDiretor = async (req,res)=>{
    try {
        const id = req.params.id
        if (!id) return res.status(402).json({"message":"envie uma identificaçao valida"})
        await Direcao.findByIdAndDelete({_id:id})
         res.status(200).json({"message":"diretor removido"})
    } catch (err) {
        return res.status(500).json({"message":err.message})
    }
}

const registerDiretor = async (req,res) =>{
    const name = req.body.name;
    const age = req.body.age;
    try {
        const diretor = await Direcao.create({"name":name,"age":age});
        res.status(200).json(diretor)
    }catch(err){
       return res.status(500).json({"message":err.message})
    }
}


module.exports = {registerDiretor,deleteDiretor,getDiretor,getAllDiretores,registerCoordenador,deleteCoordenador,getCoordenador,getAllCoordenadores,registerProfessor,deleteProfessor,
    getProfessor ,getAllProfessores,deleteAluno,registerAluno,getAluno , getAllAlunos,acessar,criarNovoUser
}