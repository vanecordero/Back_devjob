const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')


usersRouter.get('/', async (req, res)=>{
  const users = await User.find({}).populate('job', {
    "name_company": 1,
    "url_comp": 1,
    "cuidad": 1,
    "modo": 1,
    "tipo": 1,
    "titulo_vacante": 1,
    "descripcion":1,
    "hora_post":1
  })
  res.json(users)
})

usersRouter.post('/', async (req, res) =>{
  try{
    const {body}=req

    const { username, name, password} = body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
      username, 
      name, 
      passwordHash
    })
    const saveUser = await user.save()

    res.status(201).json(saveUser)
  }catch(error){
    res.status(400).json(error.message)
  }
    
    
})

module.exports = usersRouter