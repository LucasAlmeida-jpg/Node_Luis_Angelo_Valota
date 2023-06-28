import express from 'express';


const indexRouter = express.Router()


indexRouter.get('/', (req, res) => {
  res.render('index/home');
});

indexRouter.get('/login', (req, res) => {
  res.render('index/login',{title:'Login do Sistema'});
});

export default indexRouter

