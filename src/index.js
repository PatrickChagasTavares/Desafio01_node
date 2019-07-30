const express = require("express")

const server = express();

server.use(express.json());

const projects = [];
numberRequest = 0;

function checkProject (req, res, next){
  const {id} = req.params;
  const project = projects.find(p => p.id == id);

  if (!project){
    return res.status(400).json({Error: "Project not found"})
  }

  return next();


}

function checkNumberRequest (req,res, next){
  numberRequest++;

  console.log(numberRequest);
  
  return next();
}

server.use(checkNumberRequest);

server.get('/projects', (req,res) =>{
  return res.json(projects)
});

server.post('/projects', (req,res) => {
  const {id, title} = req.body;

  if(!id || !title){
    return res.status(400).json({Error: "id or title weren't informed"})
  }

  const project = {
    id,
    title,
    tasks: []
  }

  projects.push(project)

  return res.json(projects)
});

server.put('/projects/:id',  checkProject, (req, res) =>{
  const {id} = req.params;
  const {title} = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project)

});

server.delete('/projects/:id',  checkProject,(req,res) => {
  const {id} = req.params;

  const projectIndex = projects.findIndex(p => p.id == id);
  
  projects.splice(projectIndex, 1);

  return res.send();
})

server.post('/projects/:id/tasks', checkProject, (req,res) =>{
  const {id} = req.params;
  const {title} = req.body;
  
  if(!title){
    return res.status(400).json({Error: "Title is null"});
  };

  const projectIndex = projects.find(p => p.id == id);
  
  projectIndex.tasks.push(title);

  return res.json(projectIndex);



})




server.listen(3000);