import {addItemSync} from './addDirect.js'
import {Bases} from '../bases.js'
import { enCrypto } from '../crypto/encrypto.js'
import {vCrypto} from '../crypto/verify.js'

async function addItemIfCrypto(dir,data,params){
    try{
        params  =  params||{noParam:0}
        params  =  vCrypto(params);
        console.log(params)
        let bases  = Bases
        Object.assign(params,bases);
        if(typeof(params)=='string') throw params;
        let result;
        if(typeof(data) != 'string'){
            data = JSON.stringify(data);
        }
        let item = enCrypto(data,bases)
        addItemSync(dir,item,params)
        return result;
    }catch(err){
        return err
    }

}

export {addItemIfCrypto}