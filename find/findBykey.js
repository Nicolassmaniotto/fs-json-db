import { Bases } from '../bases.js';
import { tryJson } from '../global/thisIs.js';
import * as fs from 'fs'

async function findIdByKey(dir,keyName,valor =null,basesParam= null){
    basesParam  =  basesParam||{noParam:0}
    let bases  = Bases
    Object.assign(bases,basesParam);
    try{
        var data = {};
        if(!keyName) throw 'key não definido'
        if(!keyName.key||keyName.key == null || typeof(keyName.key)=='undefined'){
            data.key = keyName
            data.qt    = 1
        }
        if(!data.opt){
            data.opt = 'i'
        }
        let file = fs.readFileSync(`${bases.dir}/${dir}`, 'utf8').split('\n');
        var result = []
        var cont = 0;
        for(var i =0;i<bases.qtId;i++){
            let jsonParsed = tryJson(file[i])
            if(!jsonParsed) continue
            if(keyName in jsonParsed){
                result[cont] = i+1;
                cont++;
            }

        } 
        return result
    }catch(err){
        return err
    }
}
async function findItemByKey(dir,keyName,valor =null,basesParam= null){
    basesParam  =  basesParam||{noParam:0}
    let bases  = Bases
    Object.assign(bases,basesParam);
    try{
        var data = {};
        if(!keyName) throw 'key não definido'
        if(!keyName.key||keyName.key == null || typeof(keyName.key)=='undefined'){
            data.key = keyName
            data.qt    = 1
        }
        if(!data.opt){
            data.opt = 'i'
        }
        let file = fs.readFileSync(`${bases.dir}/${dir}`, 'utf8').split('\n');
        var result = []
        var cont = 0;
        for(var i =0;i<bases.qtId;i++){
            let jsonParsed = tryJson(file[i])
            if(!jsonParsed) continue
            if(keyName in jsonParsed){
                let valor ={
                    id : i+1,
                    item: jsonParsed
                } 
                // result[cont] .id = i+1;
                result[cont++] = valor
            }

        } 
        return result
    }catch(err){
        return err
    }
}

export {findIdByKey,findItemByKey}

/*

const BasesParam = {
    dir:'../data/DB'

}

findIdByKey(`/teste/${1}.jsonl`,'user',null,BasesParam).then(console.log)
// var
// async function findByKey(){

    
// }
// */ 