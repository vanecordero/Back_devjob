require('dotenv').config()
require('./mongo')

const express = require('express')
const cors = require('cors')
const app = express()
const logger = require('./loggerMiddleware')
const JobModel = require('./models/job')
const notFound = require('./middleware/notFound.js')
const handleErrors=require('./middleware/handleErrors.js')
app.use(cors())

app.use(express.json())
app.use(logger)

app.get("/", (request, response)=>{
    response.send("<h1>Hello World from Node.js</h1>")
})

app.get("/api/jobs/all", (request, response)=>{
    JobModel.find({}).then(jobs=>{
        const {_id, __v, ...restOfJobs} = jobs
        return{
            ...response.json(jobs),
            id: _id
        }
    })
})

app.get("/api/jobs/:id", (request, response, next)=>{
    const {id} = request.params
    const job = JobModel.findById(id).then(searchJob=>{
        return searchJob?
            response.json(searchJob)
            : response.status(404).end()
    }).catch(err=>{
        next(err)
    })    
})

app.delete("/api/jobs/:id", (request, response, next)=>{
    const {id} = request.params
    JobModel.findByIdAndDelete(id).then(()=>{
    response.status(204).end()
    }).catch(err=>{
        next(err)
    })
})

app.post("/api/jobs", (req, res)=>{
    const jobPost = req.body
    
    if (Object.keys(jobPost).length === 0 || jobPost === null){
        return res.status(400).json({
            error: 'required "content" field is missing',
            contentstatus: !jobPost.content,
            contentText: jobPost
        })
    }
 
    const newJob = new JobModel({
        "name_company":jobPost.name_company,
        "url_comp": jobPost.url_comp,
        "hora_post": new Date(),
        "cuidad": jobPost.cuidad,
        "modo": jobPost.modo,
        "tipo": jobPost.tipo,
        "titulo_vacante": jobPost.titulo_vacante,
        "descripcion": jobPost.descripcion
    })
    newJob.save().then(savedPost=>{
        res.json(savedPost)
    })
})

app.put("/api/jobs/:id", (req, res, next)=>{    
    const {id} = req.params
    const jobPost = req.body

    const editJob = {
        "name_company":jobPost.name_company,
        "url_comp": jobPost.url_comp,
        "cuidad": jobPost.cuidad,
        "modo": jobPost.modo,
        "tipo": jobPost.tipo,
        "titulo_vacante": jobPost.titulo_vacante,
        "descripcion": jobPost.descripcion
    }

   JobModel.findByIdAndUpdate(id, editJob, {new:true})
   .then(result=>{
    res.json(result)
   })
})



app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT 
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})

