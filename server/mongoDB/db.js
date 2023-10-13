const mongoose=require('mongoose')

const db=(url)=>{
    mongoose.connect(url)
    .then(()=>{
        console.log('Database connected succefully!')
    }).catch((error)=>{
        console.log(error.message)
    })
}

module.exports={db}

