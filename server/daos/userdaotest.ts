import { UserDao } from "./userdao";


function testUserFind(){
    let userdao = UserDao.getUserDaoObject()
    let userPromise = userdao.findUser('james','abc123')
    userPromise.then((user)=> {
        console.log('user loaded:', user)
        userdao.closeConnection()
    })

}

testUserFind()
