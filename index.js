const express = require('express');

const server = express();
server.use(express.json());

const projects = [ {id:"1", title:"Desafio 01", tasks: ['criar servidor', 'montar rotas' ]}]


function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: 'Project not found' });
  }

  return next();
}

function logRequests(req, res, next) {

  console.count("Número de requisições");

  return next();
}

server.use(logRequests);


//retorna todos os projetos
server.get('/projects', (req, res) => {
  return res.json(projects);
})


// insere um projeto
server.post('/projects', (req, res) =>{
  const { id, title } = req.body;

  const arryTasksProject = [];

  projects.push({id, title , arryTasksProject});
  return res.json(projects);
});

server.put('/projects/:id',checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);
  
  project.title = title;

  return res.json(project);
});

server.delete('/projects/:id', checkProjectExists, (req, res) => {

  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id == id);

  projects.splice(projectIndex, 1);

  return res.send();
});

server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
});


server.listen(3333);

server.put('')