require('dotenv').config()
require('./mongo')

const express = require('express')
const cors = require('cors')
const app = express()
const logger = require('./loggerMiddleware')
const JobModel = require('./models/job')
const notFound = require('./middleware/notFound.js')
const handleErrors=require('./middleware/handleErrors.js')

const usersRouter = require('./controllers/users')
//const { response } = require('express')
const User = require('./models/User')


app.use(cors())
app.use(express.json())
app.use(logger)


app.get("/", (request, response)=>{
    response.status(404).end()
})

app.get("/api/jobs", async (request, response)=>{
   const Jobs = await JobModel.find({}).populate('user', {
    username: 1,
    name:1
   })
    response.json(Jobs).end()
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

app.post("/api/jobs", async (req, res, next)=>{
    const {
        name_company,
        url_comp, 
        cuidad,
        modo,
        tipo,
        titulo_vacante,
        descripcion,
        userId
    } = req.body
    
    const userFinId = await User.findById(userId)

    if (req.body.length === 0 || req.body === null){
        return res.status(400).json({
            error: 'required "content" field is missing'
        })
    }
 
    const newJob = new JobModel({
        name_company,
        url_comp,
        "hora_post": new Date(),
        cuidad,
        modo,
        tipo,
        titulo_vacante,
        descripcion,
        user: userFinId._id
    })
  
    try{
        const savedJob = await newJob.save()
        
        userFinId.job = userFinId.job.concat(savedJob._id)
        await userFinId.save()

        res.status(201).json(savedJob)        
    } catch (error){
        next(error)
    }
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

app.use('/api/users', usersRouter)

app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT 
const server = app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})


module.exports = {app, server}