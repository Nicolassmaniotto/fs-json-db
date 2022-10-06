import { Bases } from '../bases.js';
import * as fs from "fs"
import { tryJson } from '../global/thisIs.js';
async function findItemByFunctionJSON(dir,find, func,basesParam= null){
    basesParam  =  basesParam||{noParam:0}
    let bases  = Bases
    Object.assign(bases,basesParam);
    // console.log(bases)
    try{
        let file = fs.readFileSync(`${bases.dir}/${dir}`, 'utf8').split('\n');
        var result = []
        var cont = 0;
        for(var i =0;i<bases.qtId;i++){
            let jsonParsed = tryJson(func(file[i]))
            if(!jsonParsed) continue
            if(find.keyName in jsonParsed){
                if(find.value){
                    if(jsonParsed[find.keyName] != find.value || jsonParsed == null) continue;
                }
                let data ={
                    id : i+1,
                    item: jsonParsed
                } 
                result[cont++] = data
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
export {findItemByFunctionJSON}

//microteste
/*
let bases ={
    dir:'../data/DB',
}
let find={
    keyName:'user',
    value:"11"
}
findItemByFunctionJSON("teste/1.jsonl",find, (result)=>result,bases).then(console.log)
/**/