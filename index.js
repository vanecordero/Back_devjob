

const express = require('express')
const cors = require('cors')
const app = express()
const logger = require('./loggerMiddleware')

app.use(cors())

app.use(express.json())
app.use(logger)


let vacantes =[{
    "id_vacante": 1,
    "name_company":"Google",
    "url_comp": "Google.com",
    "hora_post": "17/11/2021",
    "cuidad": "San francisco",
    "modo": "Presencial",
    "tipo": "full time",
    "titulo_vacante": "Frontend",
    "descripcion": "Lorem insup"
},{
    "id_vacante": 2,
    "name_company":"Linkdin",
    "url_comp": "Linkdin.com",
    "hora_post": "18/11/2021",
    "cuidad": "Santo Domingo",
    "modo": "Presencial",
    "tipo": "Part time",
    "titulo_vacante": "Backend",
    "descripcion": "Lorem insup"
},{
    "id_vacante": 3,
    "name_company":"Facebook",
    "url_comp": "Facebook.com",
    "hora_post": "02/11/2021",
    "cuidad": "San francisco",
    "modo": "Remoto",
    "tipo": "full time",
    "titulo_vacante": "Data Analytics",
    "descripcion": "Lorem insup"
}

]


app.get("/", (request, response)=>{
    response.send("<h1>Hello</h1>")
})

app.get("/api/vacantes", (request, response)=>{
    response.json(vacantes)
})

app.get("/api/vacantes/:id", (request, response)=>{
    const id = Number(request.params.id)
    const vacante = vacantes.find(vac => vac.id_vacante === id)

    if(vacante){
        response.json(vacante)
    }
    else{
        response.status(404).end()
    }
})

app.delete("/api/vacantes/:id", (request, response)=>{
    const id = Number(request.params.id)
    const vacante = vacantes.filter(vac => vac.id_vacante !== id)
    response.status(204).end()
})


app.post("/api/vacantes", (request, response)=>{
    const job = request.body
console.log(job)
    const ids = vacantes.map(job=>job.id_vacante)
    const maxId = Math.max(...ids)
    const newJob = {
        id_vacante: maxId+1,
        "name_company":job.name_company,
    "url_comp": job.url_comp,
    "hora_post": new Date().toDateString(),
    "cuidad": job.cuidad,
    "modo": job.modo,
    "tipo": job.tipo,
    "titulo_vacante": job.titulo_vacante,
    "descripcion": job.descripcion
    }
    vacantes = [...vacantes,newJob]
    response.status(201).json(job)
})

app.use((request, response)=>{
    response.status(404).json({
        error: 'Not found'
    })
})


const PORT = 3001
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
