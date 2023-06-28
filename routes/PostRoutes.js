import express from 'express';
import Post from "../models/Post.js";

const postRouter = express.Router()


postRouter.get('/novo', (req, res) => {
  if(req.session.usuarioLogado || req.session.usuarioLogado!=null)
  {
      res.render('post/novo');   
  }
  else{
    res.render('index/login', {erroLogin: "Página restrita aos usuários do sistema!"});   
  }     
});

postRouter.get('/exibir/:id', async (req, res) => {
  if(req.session.usuarioLogado || req.session.usuarioLogado!=null)
  {
    const post = await Post.findOne({ where: { id: req.params.id } });    
  if(post!=null)
  {
    res.render('post/editar', 
    {id: post.id, titulo: post.titulo, texto: post.texto, autor: post.autor, status: post.status, admin: req.session.usuarioLogado.admin, comentario: post.comentario, curtidas: post.curtidas});
  }
  else{
    res.send("Post não encontrado!");
  }
  
}
else{
  res.render('index/login', {erroLogin: "Página restrita aos usuários do sistema!"});   
}

});

postRouter.get('/excluir/:id', async (req, res) => {
  if(req.session.usuarioLogado || req.session.usuarioLogado!=null)
  {
  const post = await Post.destroy({ where: { id: req.params.id } }).then(function(){
    res.redirect("/post/listar")
  }).catch(function(erro){
    res.send('Erro ao excluir o post: '+erro);
  });
  
}else{
    res.render('index/login', {erroLogin: "Página restrita aos usuários do sistema!"});   
  }   
  
  
});

postRouter.get('/listar', async (req, res) => {
  if(req.session.usuarioLogado || req.session.usuarioLogado!=null)
  {
    const isAdmin = req.session.usuarioLogado.admin;
    const posts = await Post.findAll({
      where: isAdmin ? {} : {status: 1}
    });  
    console.log(req.session.usuarioLogado)
  if(posts!=null)
  {
    res.render('post/listar', {posts: posts});
  }
  else{
    res.send("Post não encontrado!");
  } 
}
else{
  res.render('index/login', {erroLogin: "Página restrita aos usuários do sistema!"});   
}  
});


postRouter.post('/cadastrar', (req, res) => {
  if(req.session.usuarioLogado || req.session.usuarioLogado!=null)
  {
    const post = Post.create({ 
        titulo: req.body.titulo, 
        texto: req.body.texto, 
        autor: req.session.usuarioLogado.id,
      }).then(function(){
        res.redirect("/post/listar");
      }).catch(function(erro){
        res.send('Erro ao inserir o post: '+erro);
      });
    }
    else{
      res.render('index/login', {erroLogin: "Página restrita aos usuários do sistema!"});   
    }   
    
});

postRouter.post('/editar', (req, res) => {

  if(req.session.usuarioLogado || req.session.usuarioLogado!=null)
  {
  const post = Post.update({ 
    titulo: req.body.titulo, 
    texto: req.body.texto, 
    autor: req.body.autor, 
    status: req.body.status,
    comentario: req.body.comentario,
    curtidas: req.body.curtidas,
    }, { where: {id: req.body.id}} ).then(function(){
      res.redirect("/post/listar");
    }).catch(function(erro){
      res.send('Erro ao atualizar o post: '+erro);
    });
  }
  else{
    res.render('index/login', {erroLogin: "Página restrita aos usuários do sistema!"});   
  }
  
});
export default postRouter

