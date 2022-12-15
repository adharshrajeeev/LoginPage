var db=require('../config/connection')
var collection=require('../config/collections')
const { response } = require('../app')
var objectId=require('mongodb').ObjectId
module.exports={
    getAllUsers:()=>{
        return new Promise(async(resolve,reject)=>{
            let usersdetails= await db.get().collection(collection.USER_COLLECTION).find().toArray()
            resolve(usersdetails)
        })
    },
    deleteUser:(userId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).deleteOne({_id:objectId(userId)}).then((response)=>{
            //    console.log(response)
                resolve(response)
            })
        })
    },
    getUserDetails:(userId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).findOne({_id:objectId(userId)}).then((userdetails)=>{
                resolve(userdetails)
            })
        })
    },
    updateUser:(userId,userD)=>{
        return new Promise((resolve,reject)=>{
           db.get().collection(collection.USER_COLLECTION).updateOne({_id:objectId(userId)},{
               $set:{
                  name:userD.name,
                  email:userD.email
               }
           }).then((response)=>{
               resolve()
           })
        })
   }
}