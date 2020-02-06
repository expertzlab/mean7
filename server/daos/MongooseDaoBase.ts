var mongoose = require('mongoose')
export class MongooseDaoBase{
    
    mongoUrl = 'mongodb://localhost:27017/crm'
    mongooseConnection = mongoose.connect(this.mongoUrl)

    constructor(){
        if(this.mongooseConnection == null){
            mongoose.connect(this.mongoUrl)
            mongoose.connection.on('open', () => {
                console.log('DB connection success')
            })
        }

    }

}