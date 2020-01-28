var mongoose = require('mongoose')
export class MongooseDaoBase{
    
    mongooseConnection = null
    mongoUrl = 'mongodb://localhost:27017/crm'

    constructor(){
        if(this.mongooseConnection == null){
            mongoose.connect(this.mongoUrl)
            mongoose.connection.on('open', () => {
                console.log('DB connection success')
            })
        }

    }
}