import {addItemAsync,addItemSync} from './addDirect.js'
import { addItemIfCrypto } from './addUsingCrypto.js'
import {Bases} from '../bases.js'

function addItem(dir,data,params =null,typeAdd = '1'){
    try{
        params  =  params||{noParam:0}
        Object.assign(Bases,params);
        console.log(Bases)
        params = Bases
        if(typeAdd.toLowerCase() == 'sync' || typeAdd =='1' || typeAdd == null){
           return addItemSync(dir,data,params)
        }else if(typeAdd.toLowerCase() == 'crypto' || typeAdd =='2'){
           return addItemIfCrypto(dir,data,params)
        }
    }catch(err){
        return err
    }

}
// let params = {
//     dir: '../data/DB/'
// }
// addItem('teste','ola',params).then(console.log).catch(console.log)
export{addItem,addItemAsync,addItemSync,addItemIfCrypto}