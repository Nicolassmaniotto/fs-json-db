import { vCrypto } from "./verify.js";
import {encryptoSimple} from 'encryptosumsimple'

function enCrypto(data,params){
    //função para tratar a cryptografia
    try{
        // console.log(JSON.stringify(params))
        var result = 'null'; // variavel de resultados
        params = vCrypto(params)
        if(typeof(params) != 'object') throw params;
        if(params.crypto.type.toLowerCase() == 'sumsymple'){
            // criptografia chave valor por soma
            data = Buffer.from(data,'utf8').toString('base64') // forçado o uso de utf8 por segurança
            result = encryptoSimple(data,params.crypto.key,params.crypto.separe )
            result = Buffer.from(data,'utf8').toString('base64')
            //  =  addItemSync(dir,item,params)
        }
        return result
    }catch(err){
        return err
    }
}
export {enCrypto}