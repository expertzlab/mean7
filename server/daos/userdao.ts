
/*(async function(){
var MongoClient = require('mongodb').MongoClient
var connectionUrl = 'mongodb://localhost:27017'
var collectionName = 'users'
var user = {name:'', profession:'', password:''}
user.name = 'Aswin'
user.profession = 'Office'
user.password = 'abc333'
let mongoclient = new MongoClient(connectionUrl, 
                                  { useNewUrlParser: true },
                                  { useUnifiedTopology: true }
                                  )
await mongoclient.connect()
var db = mongoclient.db('crm')
var collection = db.collection(collectionName)
collection.insert(user, (err, result)=>{
    if(err)
        console.log('insertion failed',err)
    else 
        console.log('successfully inserted', result)
        mongoclient.close()
})
})();
*/

export class UserDao{

    async insertUser(user, db, cb){
        var collection = await db.collection('registration')
        collection.insertOne(user, (err, resp) => {
            if(err){
                console.log('user insertion failed',err)
            } else {
                console.log('user insertion successful')
            }
            console.log('DB Out:',resp.ops[0])
            cb(resp.ops[0])
        })
    }
}


