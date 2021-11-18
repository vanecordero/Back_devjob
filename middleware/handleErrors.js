module.exports = (error, request, response, next)=>{    
    if(error.name === 'CastError'){
        response.status(404).json({
            error: 'Incorrect ID user'
        })
    }else{
        response.status(500).end()
    }
    
}