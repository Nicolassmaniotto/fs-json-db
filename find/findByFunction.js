import { Bases } from '../bases.js';
import * as fs from "fs"
import {forceString } from '../global/thisIs.js';
async function findItemByFunction(dir,func,basesParam= null){
    basesParam  =  basesParam||{noParam:0}
    let bases  = Bases
    Object.assign(bases,basesParam);
    try{
        if(typeof(func)!=="function") throw "not function"
        let file = fs.readFileSync(`${bases.dir}/${dir}`, 'utf8').split('\n');
        var result = []
        var cont = 0;
        for(var i =0;i<bases.qtId;i++){
            let data = forceString(func(file[i]))
            if(data){
                result[cont]=data
                cont++;
                if(bases.findQt && cont>=bases.findQt && bases.findQt != null){
                    break
                }
            }
        }
        return result
    }catch(err){
        return err
    }
}
export default findItemByFunction
export {findItemByFunction}

/* microteste 
let bases ={
    dir:'../data/DB',
}
let find={
    keyName:'user',
    value:"11"
}

findItemByFunction("teste/1.jsonl",(result)=>{
    let data= JSON.parse(result)
    // return data.user
},bases).then(console.log)
/**/