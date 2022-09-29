import { vCrypto } from "./verify.js";
import {decryptoSimple} from 'encryptosumsimple'

function deCrypto(data,params){
    //função para tratar a cryptografia
    try{
        var result = 'null'; // variavel de resultados
        params = vCrypto(params)
        // console.log(params)
        if(typeof(params) != 'object') throw params;
        if(params.crypto.type.toLowerCase() == 'sumsymple'){
            // criptografia chave valor por soma
            //console.log(data)
            if(!data) return result
            data = Buffer.from(data,'base64').toString('utf8')
            result = decryptoSimple(data,params.crypto.key,params.crypto.separe )
            result = Buffer.from(result,'base64').toString('utf8')
        }
        if(params.crypto.type.toLowerCase() == 'aes-256-cbc'){
            let decipher = crypto.createDecipheriv('aes-256-cbc', params.crypto.key, params.crypto.iv);
            decipher.update(data, 'base64', 'utf8');
            result + decipher.final('utf8')
        }
        return result
    }catch(err){
        return err
    }
}
export {deCrypto}