const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'FOMEZERO'
});

const app = express();

app.use(bodyParser.json());


// Rota para registrar um novo usuário
app.post('/register', (req, res) => {
  const { email, nome, cpf, senha, telefone } = req.body;

  const sql = 'INSERT INTO Usuarios (Email_Usuario, Nome_Usuario, Cpf_Usuario, Senha_Usuario, Telefone_Usuario) VALUES (?, ?, ?, ?, ?)';
  const values = [email, nome, cpf, senha, telefone];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao cadastrar usuário');
    }

    res.status(200).send('Usuário cadastrado com sucesso');
  });
});

// Rota para buscar o Login e Senha
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT ID_Usuario FROM Usuarios WHERE BINARY Nome_Usuario = ? AND BINARY Senha_Usuario = ?';
  connection.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error('Erro ao verificar credenciais: ' + err);
      res.status(500).json({ error: 'Login ou Senha Invalidos' });
    } else if (results.length > 0) {
      const idUsuario = results[0].ID_Usuario;
      res.json({ success: true, message: 'Login bem-sucedido', idUsuario });
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

// Rota para buscar os produtos de uma empresa
app.post('/produtos-empresa', (req, res) => {
  const { idEmpresa } = req.body;
  const sql = 'SELECT * FROM Produtos WHERE ID_Empresa = ?';
  connection.query(sql, [idEmpresa], (err, results) => {
    if (err) {
      console.error('Erro ao consultar o banco de dados: ' + err);
      res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
    } else if (results.length > 0) {
      results.forEach(result => {
        if (result.Foto_Produto instanceof Buffer) {
          result.Foto_Produto = result.Foto_Produto.toString('base64');
        }
      });
      res.json({ success: true, message: 'Sucesso', data: results });
    } else {
      res.json({ success: false, message: 'Nenhum produto disponível para esta empresa' });
    }
  });
});



// Rota para enviar para o carrinho
app.post('/adicionar-ao-carrinho', (req, res) => {
  const { Id_Usuario, produtoId, empresaId, quantidade } = req.body;

  const sql = 'INSERT INTO Carrinho (Id_Usuario, ID_Produto, ID_Empresa, Quantidade) VALUES (?, ?, ?, ?)';
  connection.query(sql, [Id_Usuario, produtoId, empresaId, quantidade], (err, results) => {
    if (err) {
      console.error('Erro ao adicionar ao carrinho: ' + err);
      res.status(500).json({ error: 'Erro ao adicionar ao carrinho' });
    } else {
      res.json({ success: true, message: 'Produto adicionado ao carrinho com sucesso' });
    }
  });
});



// Rota para obter o carrinho do usuário
app.get('/carrinho-usuario/:userId', (req, res) => {
  const userId = req.params.userId;
  const sql = `
    SELECT Carrinho.*, Produtos.Foto_Produto, Produtos.Preco_Produtos, Produtos.Nome_Produtos, Produtos.Descricao_Produtos
    FROM Carrinho
    INNER JOIN Produtos ON Carrinho.ID_Produto = Produtos.ID_Produto
    WHERE Carrinho.Id_Usuario = ?;
  `;
  connection.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Erro ao obter carrinho do usuário:', err);
      res.status(500).json({ success: false, message: 'Erro ao obter carrinho do usuário' });
    } else if (results.length > 0) {
      console.log('Dados do Carrinho:', results);
      results.forEach(result => {
        if (result.Foto_Produto instanceof Buffer) {
          result.Foto_Produto = result.Foto_Produto.toString('base64');
        }
      });
      res.json({ success: true, data: results });
    }
  });
});

// Rota para remover um item do carrinho
app.delete('/remover-do-carrinho/:userId/:productId', (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;

  const sql = 'DELETE FROM Carrinho WHERE ID_Usuario = ? AND ID_Produto = ?';
  connection.query(sql, [userId, productId], (err, results) => {
    if (err) {
      console.error('Erro ao remover item do carrinho:', err);
      res.status(500).json({ success: false, message: 'Erro ao remover item do carrinho' });
    } else {
      res.json({ success: true, message: 'Item removido do carrinho com sucesso' });
    }
  });
});

app.post('/pesquisa', (req, res) => {
  const { termoPesquisa } = req.body;
  if (!termoPesquisa) {
    return res.json({ success: false, message: 'Nenhum termo de pesquisa fornecido' });
  }
  
  const empresaSql = 'SELECT * FROM Empresas WHERE Nome_Empresa LIKE ?';
  const termoFormatado = `%${termoPesquisa}%`;

  connection.query(empresaSql, [termoFormatado], (errEmpresas, resultadosEmpresas) => {
    if (errEmpresas) {
      console.error('Erro ao consultar empresas:', errEmpresas);
      return res.status(500).json({ success: false, message: 'Erro ao consultar empresas' });
    }

    if (resultadosEmpresas.length > 0) {
      resultadosEmpresas.forEach(empresaResult => {
        if (empresaResult.Foto_Empresa instanceof Buffer) {
          empresaResult.Foto_Empresa = empresaResult.Foto_Empresa.toString('base64');
        }
      });
      return res.json({ success: true, message: 'Sucesso', data: resultadosEmpresas });
    }

    return res.json({ success: false, message: 'Nenhum resultado encontrado' });
  });
});

// Rota para criar um novo pedido
app.post('/criar-pedido', (req, res) => {
  console.log('Requisição para /criar-pedido recebida:', req.body);
  const {
    userId,
    endereco,
    cep,
    numeroCasa,
    pontoReferencia,
    numeroContato,
    codigoConfirmacao,
    itensPedido
  } = req.body;

  const sqlPedido = `
    INSERT INTO Pedidos (ID_Usuario, Endereco, Cep, Numero_Casa, Ponto_Referencia, Numero_Contato, Codigo_Confirmacao)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const valuesPedido = [userId, endereco, cep, numeroCasa, pontoReferencia, numeroContato, codigoConfirmacao];

  connection.query(sqlPedido, valuesPedido, (errPedido, resultsPedido) => {
    if (errPedido) {
      console.error('Erro ao criar pedido:', errPedido);
      res.status(500).json({ success: false, message: 'Erro ao criar pedido' });
    } else {
      const pedidoId = resultsPedido.insertId;

      const sqlItensPedido = `
        INSERT INTO Itens_Pedido (ID_Pedido, ID_Produto, Quantidade, Preco_Unitario)
        VALUES ?
      `;

      const valuesItensPedido = itensPedido.map(item => [pedidoId, item.ID_Produto, item.Quantidade, item.Preco_Unitario]);

      connection.query(sqlItensPedido, [valuesItensPedido], (errItensPedido, resultsItensPedido) => {
        if (errItensPedido) {
          console.error('Erro ao adicionar itens ao pedido:', errItensPedido);
          res.status(500).json({ success: false, message: 'Erro ao adicionar itens ao pedido' });
        } else {
          res.json({ success: true, message: 'Pedido criado com sucesso', data: { ID_Pedido: pedidoId } });
        }
      });
    }
  });
});

// Rota para limpar o carrinho do usuário
app.delete('/limpar-carrinho/:userId', (req, res) => {
  const userId = req.params.userId;

  const sql = 'DELETE FROM Carrinho WHERE Id_Usuario = ?';
  connection.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Erro ao limpar carrinho do usuário:', err);
      res.status(500).json({ success: false, message: 'Erro ao limpar carrinho do usuário' });
    } else {
      res.json({ success: true, message: 'Carrinho do usuário limpo com sucesso' });
    }
  });
});


// Rota para obter todos os pedidos do usuário
app.get('/pedidos/:userId', (req, res) => {
  const userId = req.params.userId;

  const sql = `
    SELECT *
    FROM Pedidos
    WHERE ID_Usuario = ? AND (Status_Pedido = 'pendente' OR Status_Pedido = 'a caminho')
  `;
  connection.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Erro ao obter pedidos do usuário:', err);
      res.status(500).json({ success: false, message: 'Erro ao obter pedidos do usuário' });
    } else if (results.length > 0) {
      const pedidosPendentes = results.filter(pedido => (
        pedido.Status_Pedido !== 'Finalizado' ||
        (pedido.Status_Pedido === 'Finalizado' &&
         (Date.now() - new Date(pedido.Hora_Pedido).getTime()) < 7200000)
      ));
      
      res.json({ success: true, data: pedidosPendentes });
    } else {
      res.json({ success: true, message: 'Nenhum pedido encontrado', data: [] });
    }
  });
});

// Rota para obter detalhes de um pedido (itens do pedido)
app.get('/detalhes-pedido/:pedidoId', (req, res) => {
  const pedidoId = req.params.pedidoId;

  const sql = `
    SELECT IP.*, P.Nome_Produtos
    FROM Itens_Pedido IP
    JOIN Produtos P ON IP.ID_Produto = P.ID_Produto
    WHERE IP.ID_Pedido = ?
  `;

  connection.query(sql, [pedidoId], (err, results) => {
    if (err) {
      console.error('Erro ao obter detalhes do pedido:', err);
      res.status(500).json({ success: false, message: 'Erro ao obter detalhes do pedido' });
    } else if (results.length > 0) {
      res.json({ success: true, message: 'Sucesso', data: results });
    } else {
      res.json({ success: false, message: 'Nenhum item encontrado para este pedido' });
    }
  });
});



app.post('/avaliar-pedido/:pedidoId', (req, res) => {
  const pedidoId = req.params.pedidoId;
  const { avaliacao } = req.body;

  const sql = 'UPDATE Pedidos SET Avaliacao = ? WHERE ID_Pedido = ?';
  connection.query(sql, [avaliacao, pedidoId], (err, results) => {
    if (err) {
      console.error('Erro ao avaliar pedido:', err);
      res.status(500).json({ success: false, message: 'Erro ao avaliar pedido' });
    } else {
      res.json({ success: true, message: 'Pedido avaliado com sucesso' });
    }
  });
});

const porta = 3000;

app.listen(porta, () => {
  console.log(`Servidor Node.js executando na porta ${porta}`);
});