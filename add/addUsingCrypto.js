import {addItemSync} from './addDirect.js'
import {Bases} from '../bases.js'
function addItemIfCrypto(data, params){
    try{
        if(!params.crypto) throw '03180901' //cry01 sem cryptografia
        if(!params.crypto.type) throw '03180901' //cry01 sem cryptografia
        if(!params.crypto.key) throw '03180902' //cry01 sem parametros para criptografia'
        if(params.crypto.type.toLowerCase() == 'aes' && !params.crypto.iv) throw '03180902' //cry01 sem parametros para criptografia'
        if(params.crypto.type.toLowerCase() == 'sumsymple' && !params.crypto.separe){
            params.crypto.separe = ':'
        }
        if(params.crypto.type.toLowerCase() == 'sumsymple'){
            addItemSync(dir,data,basesParam =null)
        }
    }catch(err){
        return err
    }

}