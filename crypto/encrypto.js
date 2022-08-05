import { vCrypto } from "./verify";
import {encryptoSimple} from 'encryptosumsimple'

export function enCrypto(data,params){
    //função para tratar a cryptografia
    try{
        var result = 'null'; // variavel de resultados
        params = vCrypto(params)
        if(typeOf(params) != 'object') throw params;
        if(params.crypto.type.toLowerCase() == 'sumsymple'){
            // criptografia chave valor por soma
            data = Buffer.from(data).toString('base64')
            result = encryptoSimple(data,params.crypto.key,params.crypto.separe )
            //  =  addItemSync(dir,item,params)
        }
        return result
    }catch(err){
        return err
    }
}