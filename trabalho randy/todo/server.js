const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

// Rota para obter as anotações
app.get('/api/todos', (req, res) => {
  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o banco de dados:', err);
      res.status(500).json({ error: 'Erro ao obter as anotações.' });
      return;
    }

    const todos = JSON.parse(data);
    res.json(todos);
  });
});

// Rota para adicionar uma anotação
app.post('/api/todos', (req, res) => {
  const { text, category } = req.body;

  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o banco de dados:', err);
      res.status(500).json({ error: 'Erro ao adicionar a anotação.' });
      return;
    }

    const todos = JSON.parse(data);
    const newTodo = {
      id: Math.floor(Math.random() * 10000),
      text,
      category,
      isCompleted: false,
    };
    todos.push(newTodo);

    fs.writeFile('db.json', JSON.stringify(todos), (err) => {
      if (err) {
        console.error('Erro ao escrever no banco de dados:', err);
        res.status(500).json({ error: 'Erro ao adicionar a anotação.' });
        return;
      }

      res.json(newTodo);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
