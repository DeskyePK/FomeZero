const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createPool({
  host: "db4free.net",
  port: 3306,
  user: "fomezero",
  password: "Senhagerada123!",
  database: "fomezero",
});

const app = express();

app.use(bodyParser.json());

// Rota para buscar o Login e Senha
app.post('/login', (req, res) => {
  const { username, password } = req.body;

 
  const sql = 'SELECT * FROM Usuarios WHERE BINARY  Nome_Usuario = ? AND BINARY  Senha_Usuario = ?';
  connection.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error('Erro ao verificar credenciais: ' + err);
      res.status(500).json({ error: 'Login ou Senha Invalidos' });
    } else if (results.length > 0) {
     
      res.json({ success: true, message: 'Login bem-sucedido' });
    } else {
     
      res.json({ success: false, message: 'Login ou Senha Errados' });
    }
  });
});


// Rota para buscar o Lanches
app.post('/lanches', (req, res) => {
  const sql = 'SELECT E.ID_Empresa, E.Nome_Empresa, E.Foto_Empresa FROM Empresas E JOIN Empresas_Categorias EC ON E.ID_Empresa = EC.ID_Empresa WHERE EC.Categoria = "Lanches"';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao consultar o banco de dados: ' + err);
      res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
    } else if (results.length > 0) {
      // Converter a imagem para base64 antes de enviar
      results.forEach(result => {
        result.Foto_Empresa = result.Foto_Empresa.toString('base64');
      });
      res.json({ success: true, message: 'Sucesso', data: results });
    } else {
      res.json({ success: false, message: 'Nenhum estabelecimento disponível' });
    }
  });
});

// Rota para buscar o Sobremesas
app.post('/sobremesas', (req, res) => {
  const sql = 'SELECT E.ID_Empresa, E.Nome_Empresa, E.Foto_Empresa FROM Empresas E JOIN Empresas_Categorias EC ON E.ID_Empresa = EC.ID_Empresa WHERE EC.Categoria = "Sobremesas"';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao consultar o banco de dados: ' + err);
      res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
    } else if (results.length > 0) {
      // Converter a imagem para base64 antes de enviar
      results.forEach(result => {
        result.Foto_Empresa = result.Foto_Empresa.toString('base64');
      });
      res.json({ success: true, message: 'Sucesso', data: results });
    } else {
      res.json({ success: false, message: 'Nenhum estabelecimento disponível' });
    }
  });
});

// Rota para buscar o Massas
app.post('/massas', (req, res) => {
  const sql = 'SELECT E.ID_Empresa, E.Nome_Empresa, E.Foto_Empresa FROM Empresas E JOIN Empresas_Categorias EC ON E.ID_Empresa = EC.ID_Empresa WHERE EC.Categoria = "Massas"';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao consultar o banco de dados: ' + err);
      res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
    } else if (results.length > 0) {
      // Converter a imagem para base64 antes de enviar
      results.forEach(result => {
        result.Foto_Empresa = result.Foto_Empresa.toString('base64');
      });
      res.json({ success: true, message: 'Sucesso', data: results });
    } else {
      res.json({ success: false, message: 'Nenhum estabelecimento disponível' });
    }
  });
});

// Rota para buscar o Carnes
app.post('/carnes', (req, res) => {
  const sql = 'SELECT E.ID_Empresa, E.Nome_Empresa, E.Foto_Empresa FROM Empresas E JOIN Empresas_Categorias EC ON E.ID_Empresa = EC.ID_Empresa WHERE EC.Categoria = "Carnes"';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao consultar o banco de dados: ' + err);
      res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
    } else if (results.length > 0) {
      // Converter a imagem para base64 antes de enviar
      results.forEach(result => {
        result.Foto_Empresa = result.Foto_Empresa.toString('base64');
      });
      res.json({ success: true, message: 'Sucesso', data: results });
    } else {
      res.json({ success: false, message: 'Nenhum estabelecimento disponível' });
    }
  });
});

// Rota para buscar o Salgados
app.post('/salgados', (req, res) => {
  const sql = 'SELECT E.ID_Empresa, E.Nome_Empresa, E.Foto_Empresa FROM Empresas E JOIN Empresas_Categorias EC ON E.ID_Empresa = EC.ID_Empresa WHERE EC.Categoria = "Salgados"';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao consultar o banco de dados: ' + err);
      res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
    } else if (results.length > 0) {
      // Converter a imagem para base64 antes de enviar
      results.forEach(result => {
        result.Foto_Empresa = result.Foto_Empresa.toString('base64');
      });
      res.json({ success: true, message: 'Sucesso', data: results });
    } else {
      res.json({ success: false, message: 'Nenhum estabelecimento disponível' });
    }
  });
});

// Rota para buscar o Japonesa
app.post('/japonesa', (req, res) => {
  const sql = 'SELECT E.ID_Empresa, E.Nome_Empresa, E.Foto_Empresa FROM Empresas E JOIN Empresas_Categorias EC ON E.ID_Empresa = EC.ID_Empresa WHERE EC.Categoria = "Japonesa"';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao consultar o banco de dados: ' + err);
      res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
    } else if (results.length > 0) {
      // Converter a imagem para base64 antes de enviar
      results.forEach(result => {
        result.Foto_Empresa = result.Foto_Empresa.toString('base64');
      });
      res.json({ success: true, message: 'Sucesso', data: results });
    } else {
      res.json({ success: false, message: 'Nenhum estabelecimento disponível' });
    }
  });
});

// Rota para buscar o Mar
app.post('/mar', (req, res) => {
  const sql = 'SELECT E.ID_Empresa, E.Nome_Empresa, E.Foto_Empresa FROM Empresas E JOIN Empresas_Categorias EC ON E.ID_Empresa = EC.ID_Empresa WHERE EC.Categoria = "Maritimos"';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao consultar o banco de dados: ' + err);
      res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
    } else if (results.length > 0) {
      // Converter a imagem para base64 antes de enviar
      results.forEach(result => {
        result.Foto_Empresa = result.Foto_Empresa.toString('base64');
      });
      res.json({ success: true, message: 'Sucesso', data: results });
    } else {
      res.json({ success: false, message: 'Nenhum estabelecimento disponível' });
    }
  });
});


// Rota para buscar todas as empresas ordenadas por avaliação
app.post('/empresas-avaliadas', (req, res) => {
  const sql = 'SELECT E.ID_Empresa, E.Nome_Empresa, E.Foto_Empresa, AVG(A.Nota) AS MediaAvaliacoes FROM Empresas E LEFT JOIN Avaliacoes A ON E.ID_Empresa = A.ID_Empresa GROUP BY E.ID_Empresa ORDER BY MediaAvaliacoes DESC';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao consultar o banco de dados: ' + err);
      res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
    } else if (results.length > 0) {
      // Converter a imagem para base64 antes de enviar
      results.forEach(result => {
        if (result.Foto_Empresa instanceof Buffer) {
          result.Foto_Empresa = result.Foto_Empresa.toString('base64');
        }
      });
      res.json({ success: true, message: 'Sucesso', data: results });
    } else {
      res.json({ success: false, message: 'Nenhum estabelecimento disponível' });
    }
  });
});


const porta = 8000;

app.listen(porta, () => {
  console.log(`Servidor Node.js executando na porta ${porta}`);
});