import {addItemSync} from './addDirect.js'
import {Bases} from '../bases.js'
import {encryptoSimple} from 'encryptosumsimple'
import {vCrypto} from '../crypto/verify.js'
async function addItemIfCrypto(dir,data,params){
    try{
        params  =  params||{noParam:0}
        let bases  = Bases
        Object.assign(params,bases);
        params  =  vCrypto(params);
        console.log(params)
        if(typeof(params)=='string') throw params;
        let result;
        if(typeof(data) != 'string'){
            data = JSON.stringify(data);
        } 
        if(params.crypto.type.toLowerCase() == 'sumsymple'){
            // criptografia chave valor por soma
            let item = encryptoSimple(data,params.crypto.key,params.crypto.separe )
            result =  addItemSync(dir,item,bases)
        }
        return result;
    }catch(err){
        return err
    }

}

export {addItemIfCrypto}