import {addItemSync} from './addDirect.js'
import {Bases} from '../bases.js'
import { enCrypto } from '../crypto/encrypto.js'
import {vCrypto} from '../crypto/verify.js'

async function addItemIfCrypto(dir,data,params){
    try{
        // console.log(JSON.stringify(params))
        // let result;
        // params  =  params||{noParam:0}
        // let bases  = Bases
        // Object.assign(params,bases);
        // // console.log(JSON.stringify(params))
        // params  =  vCrypto(params);
        // console.log(JSON.stringify(params))
        if(typeof(params)=='string') throw params;

        if(typeof(data) != 'string'){
            data = JSON.stringify(data);
        }
        let item = enCrypto(data,params)
        result = addItemSync(dir,item,params)
        return result;
    }catch(err){
        throw err
    }

}

export {addItemIfCrypto}