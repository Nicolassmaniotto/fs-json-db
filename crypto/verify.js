function vCrypto(params){
    //verifica a criptpografia
    // e prepara os parametros
    try{
        if(!params.crypto) throw '03180900' //cry01 sem dados para cryptografia
        if(!params.crypto.type) throw '03180901' //cry01 sem parametro type para cryptografia
        if(!params.crypto.key) throw '03180902' //cry01 sem parametro key para criptografia'
        if(params.crypto.type.toLowerCase() == 'aes' && !params.crypto.iv) throw '03180902' //cry01 sem parametros para criptografia'
        if(params.crypto.type.toLowerCase() == 'sumsymple' && !params.crypto.separe){
            params.crypto.separe = ':'
        }
        return params
    }catch(err){
         return err;
    }
}
export {vCrypto}