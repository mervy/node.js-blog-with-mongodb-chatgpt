const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcrypt');
const app = express();

// Configurar EJS como view engine
app.set('view engine', 'ejs');

// Configurar middleware
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: '12345', resave: true, saveUninitialized: true }));

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/blog_com_mongodb');

// Definir o modelo do usuário
const User = mongoose.model('User', {
  username: String,
  password: String,
});

// Rota principal
app.get('/', (req, res) => {
  res.render('index');
});

// Rota de registro
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Criptografar a senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Criar novo usuário
  const newUser = new User({
    username,
    password: hashedPassword,
  });

  await newUser.save();

  res.redirect('/');
});

// Rota de login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Procurar usuário no banco de dados
  const user = await User.findOne({ username });

  // Verificar a senha
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.user = user;
    res.redirect('/dashboard');
  } else {
    res.redirect('/');
  }
});

// Rota de dashboard
app.get('/dashboard', (req, res) => {
  if (req.session.user) {
    res.render('dashboard', { username: req.session.user.username });
  } else {
    res.redirect('/');
  }
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});