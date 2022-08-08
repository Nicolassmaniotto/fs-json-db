import { updateDirect } from "./updateDirect.js";
import {updateCrypto} from "./updateCrypto.js"
import {Bases} from '../bases.js'
async function update(dir,id,data,params =null,typeAdd = '1'){
    try{
        typeAdd = (typeof(typeAdd)!='string')? `${typeAdd}`:typeAdd
        params  =  params||{noParam:0}
        Object.assign(Bases,params);
        // console.log(Bases)
        params = Bases
        if(typeAdd.toLowerCase() == 'direct' ||typeAdd.toLowerCase() == 'sync' || typeAdd =='1' || typeAdd == null){
           return updateDirect(dir,id,data,params =null)
        }else if(typeAdd.toLowerCase() == 'crypto' || typeAdd =='2'){
        //    return addItemIfCrypto(dir,data,params)
        console.log('cry')
           return  updateCrypto(dir,id,data,params =null)
        }
    }catch(err){
        return err
    }

}
export {update}