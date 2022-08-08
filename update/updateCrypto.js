// import * as fs from 'fs';
// import { update } from './updateDirect.js';
import { updateDirect } from "./updateDirect.js";
import {Bases} from '../bases.js'
import { enCrypto } from '../crypto/encrypto.js'
import {vCrypto} from '../crypto/verify.js'

async function updateCrypto(dir,id,data,params =null){
    try{
        // console.log(JSON.stringify(params))
        let result;
        params  =  params||{noParam:0}
        let bases  = Bases
        Object.assign(params,bases);
        // console.log(JSON.stringify(params))
        params  =  vCrypto(params);
        // console.log(JSON.stringify(params))
        if(typeof(params)=='string') throw params;

        if(typeof(data) != 'string'){
            data = JSON.stringify(data);
        }
        let item = enCrypto(data,params)
        result = updateDirect(dir,id,item,params =null)
        return result;
    }catch(err){
        return err
    }

}

export {updateCrypto}