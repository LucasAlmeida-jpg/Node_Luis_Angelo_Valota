import express from 'express';
import User from "../models/Usuario.js";

const userRouter = express.Router()


userRouter.get('/novo', (req, res) => {
  if(req.session.usuarioLogado || req.session.usuarioLogado!=null)
  {
      res.render('usuario/novo');   
  }
  else{
    res.render('index/login', {erroLogin: "Página restrita aos usuários do sistema!"});   
  }   
});

userRouter.get('/exibir/:id', async (req, res) => {
  if(req.session.usuarioLogado || req.session.usuarioLogado!=null)
  {
      const usuario = await User.findOne({ where: { id: req.params.id } });    
      if(usuario!=null)
      {
        res.render('usuario/editar', {id: usuario.id, nome: usuario.nome, sobrenome:usuario.sobrenome, email: usuario.email});
      }
      else{
        res.send("Usuario não encontrado!");
      }        
  }
  else{
    res.render('index/login', {erroLogin: "Página restrita aos usuários do sistema!"});   
  }
  
});

userRouter.get('/excluir/:id', async (req, res) => {
  
  if(req.session.usuarioLogado || req.session.usuarioLogado!=null)
  {
      const usuario = await User.destroy({ where: { id: req.params.id } }).then(function(){
        res.redirect("/usuario/listar")
      }).catch(function(erro){
        res.send('Erro ao excluir o usuário: '+erro);
      });      
  }
  else{
    res.render('index/login', {erroLogin: "Página restrita aos usuários do sistema!"});   
  }      
  
  
});

userRouter.get('/listar', async (req, res) => {
  
  if(req.session.usuarioLogado || req.session.usuarioLogado!=null)
  {  
      const usuarios = await User.findAll();  
      if(usuarios!=null)
      {
        res.render('usuario/listar', {layout: 'painel', usuarios: usuarios, tituloPagina: "Listagem de usuários"});
      }
      else{
        res.send("Usuario não encontrado!");
      } 
  }
  else{
    res.render('index/login', {erroLogin: "Página restrita aos usuários do sistema!"});   
  }    
});


userRouter.post('/cadastrar', (req, res) => {

  const user = User.create({ 
    nome: req.body.nome, 
    sobrenome: req.body.sobrenome, 
    email: req.body.email,
    senha: req.body.senha
  }).then(function(){
    res.redirect("/usuario/listar");
  }).catch(function(erro){
    res.send('Erro ao inserir o usuário: '+erro);
  });
    
    
});

userRouter.post('/editar', (req, res) => {

  
  const user = User.update({ 
    nome: req.body.nome, 
    sobrenome: req.body.sobrenome, 
    email: req.body.email,
    senha: req.body.senha 
  }, { where: {id: req.body.id}} ).then(function(){
    res.redirect("/usuario/listar");
  }).catch(function(erro){
    res.send('Erro ao atualizar o usuário: '+erro);
  });
  
  
});

userRouter.post('/logar', async (req, res) => {

  const email = req.body.email;
  const senha = req.body.senha;

  const usuario = await User.findOne({ where: { email: email, senha: senha } });    
  if(usuario!=null)
  {
    //res.render('usuario/editar', {id: usuario.id, nome: usuario.nome, sobrenome:usuario.sobrenome, email: usuario.email});
    req.session.usuarioLogado = usuario;        
    res.redirect("/usuario/listar");
  }
  else{
    req.session.usuarioLogado = null;    
    res.render('index/login', {erroLogin: "Usuario ou senha inválidos"});        
  }  
});

userRouter.get('/logout', async (req, res) => {

  req.session.usuarioLogado = null;    
  res.redirect('../login');        
  
});

export default userRouter

