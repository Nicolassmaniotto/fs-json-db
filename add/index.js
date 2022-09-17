import {addItemAsync,addItemSync} from './addDirect.js'
import { addItemIfCrypto } from './addUsingCrypto.js'
import {Bases} from '../bases.js'

async function addItem(dir,data,params =null,typeAdd = '1'){
    try{
        //console.log('addItem')
        params  =  tryJson(params)||{noParam:0}
        // console.log(Bases)
        Object.assign(Bases,params);
        typeAdd = tryString(typeAdd)
        // console.log(Bases)
        params = Bases
        //console.log(params)
        if(typeAdd.toLowerCase() == 'sync' || typeAdd =='1' || typeAdd == null){
           return addItemSync(dir,data,params).then((result)=>{
            return result
           }).catch((err)=>{
            if(err)throw err;})
        }else if(typeAdd.toLowerCase() == 'crypto' || typeAdd =='2'){
           return addItemIfCrypto(dir,data,params).then((result)=>{return result}).catch((err)=>{if(err)throw err} )
        }
    }catch(err){
        throw err
    }

}
// let params = {
//     dir: '../data/DB/'
// }
// addItem('teste','ola',params).then(console.log).catch(console.log)
export{addItem,addItemAsync,addItemSync,addItemIfCrypto}