import {addItemSync} from './addDirect.js'
import {Bases} from '../bases.js'
import { enCrypto } from '../crypto/encrypto.js'
import {vCrypto} from '../crypto/verify.js'
import {forceString} from '../global/thisIs.js'
async function addItemIfCrypto(dir,data,params){
    try{
        params  =  vCrypto(params);

        if(typeof(params)=='string') throw params;
        if(typeof(data) != 'string'){
            data = forceString(data);
        }

        let item = enCrypto(data,params)
        letresult = addItemSync(dir,item,params).then((result)=>{return result}).catch((err)=>{if(err)throw err} )
        
        return result;
    }catch(err){
        throw err
    }

}

export {addItemIfCrypto}