import {addItemSync} from './addDirect.js'
import {Bases} from '../bases.js'
import {encryptoSimple} from 'encryptosumsimple'

async function addItemIfCrypto(dir,data,params){
    try{
        params  =  params||{noParam:0}
        let bases  = Bases
        Object.assign(bases,params);
        let result;
        if(!params.crypto) throw '03180901' //cry01 sem cryptografia
        if(!params.crypto.type) throw '03180901' //cry01 sem cryptografia
        if(!params.crypto.key) throw '03180902' //cry01 sem parametros para criptografia'
        if(params.crypto.type.toLowerCase() == 'aes' && !params.crypto.iv) throw '03180902' //cry01 sem parametros para criptografia'
        if(params.crypto.type.toLowerCase() == 'sumsymple' && !params.crypto.separe){
            params.crypto.separe = ':'
        }
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