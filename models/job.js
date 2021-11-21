
const {model, Schema} = require('mongoose')

const jobSchema= new Schema({
    "name_company" : String,
    "url_comp": String,
    "hora_post": Date,
    "cuidad" : String,
    "modo": String,
    "tipo": String,
    "titulo_vacante": String,
    "descripcion":String,
    "user": {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

jobSchema.set('toJSON',{
    transform: (document, returnedObject)=>{
        returnedObject.id=returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Job = model('Job', jobSchema)

module.exports = Job