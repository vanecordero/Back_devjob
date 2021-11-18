
const {model, Schema} = require('mongoose')

const noteSchema= new Schema({
    "name_company" : String,
    "url_comp": String,
    "hora_post": Date,
    "cuidad" : String,
    "modo": String,
    "tipo": String,
    "titulo_vacante": String,
    "descripcion":String
})

noteSchema.set('toJSON',{
    transform: (document, returnedObject)=>{
        returnedObject.id=returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Job = model('Job', noteSchema)

module.exports = Job



/*
const job = new Job({
    "name_company" : "Prueba 1",
    "url_comp": "Prueba 1",
    "hora_post": Date(),
    "cuidad" : "Prueba 1",
    "modo": "Prueba 1",
    "tipo": "Prueba 1",
    "titulo_vacante": "Prueba 1",
    "descripcion": "Prueba 1"
})

job.save()
.then(result=>{
    console.log(result)
    mongoose.connection.close()
}).catch(err =>{
    console.error(err)
})

job.find({}).then(result=>{
    console.log(result)
    mongoose.connection.close()
}).catch(err =>{
    console.error(err)
})*/