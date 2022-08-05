import { vCrypto } from "./verify";
import {decryptoSimple} from 'encryptosumsimple'

export function deCrypto(dir,data,params){
    //função para tratar a cryptografia
    try{
        var result = 'null'; // variavel de resultados
        params = vCrypto(params)
        if(typeOf(params) != 'object') throw params;
        if(params.crypto.type.toLowerCase() == 'sumsymple'){
            // criptografia chave valor por soma
            data = Buffer.from(data,'base64').toString('ascii')
            result = decryptoSimple(data,params.crypto.key,params.crypto.separe )
        }
        return result
    }catch(err){
        return err
    }
}