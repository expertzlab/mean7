var MongoClient = require('mongodb').MongoClient

export class MongoConnection{

    static instance = new MongoConnection()
    mongoClient
    connectionUrl = 'mongodb://localhost:27017'

    constructor(){
        this.mongoClient = MongoClient.connect(this.connectionUrl,{useNewUrlParser: true, useUnifiedTopology: true})
    }

     static async getConnection(){
       
        return this.instance.mongoClient
    }
}