import { Bases } from '../bases.js';
import { tryJson } from '../global/thisIs.js';
import { deCrypto } from '../crypto/decrypto.js';

import * as fs from 'fs'
import { vCrypto } from '../crypto/verify.js';
//buscas por chave valor
async function findIdByKey(dir,keyName,valor =null,basesParam= null){
    basesParam  =  basesParam||{noParam:0}
    let bases  = Bases
    Object.assign(bases,basesParam);
    try{
        var data = {};
        if(!keyName) throw 'key não definido'
        if(!keyName.key||keyName.key == null || typeof(keyName.key)=='undefined'){
            data.key = keyName
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
                result[cont++] = i+1;
                if(bases.findQt && cont>=bases.findQt){
                    break
                }
            }

        } 
        return result
    }catch(err){
        return err
    }
}
async function findItemByKeyCrypto(dir,keyName,valor =1,basesParam= null){

    try{
        // console.log(dir)
        // console.log(keyName)
        // console.log(valor)
        basesParam  =  basesParam||{noParam:0}
        let bases  = Bases
        Object.assign(bases,basesParam);
        // console.log(bases)
        bases = vCrypto(bases) //valida dados de criptografia
        var data = {};
        if(!keyName) throw 'key não definida'
        if(!keyName.key||keyName.key == null || typeof(keyName.key)=='undefined'){
            data.key = keyName
        }
        if(!data.opt){
            data.opt = 'i'
        }
        // var calc;
        var pos = 0;
        // var file;
        if(typeof(keyName) =='number'){
            // console.log(pos)
            pos = (parseInt(keyName)+parseInt(bases.qtId))/bases.qtId;
            pos = parseInt(pos)
            console.log(keyName)
            pos = pos%1;
            pos = (pos.toFixed(1))*10
            pos = parseInt(pos)
            // console.log(calc)
            // return file[calc]
            // throw calc
        }

        var file = fs.readFileSync(`${bases.dir}/${dir}`, 'utf8').split('\n');
        var result = []
        var cont = 0;
        if(pos>0){
            bases.qtId = pos
            // console.log(pos)
        }
        for(var i =pos;i<bases.qtId;i++){
            // adicionar função de descryptografar
            let jsonParsed = deCrypto(file[i],bases)
            jsonParsed= tryJson(jsonParsed)
            // console.log(file[i])
            if(!jsonParsed) continue
            // if(pos>0){
            //     let data ={
            //         id : pos,
            //         item: jsonParsed
            //     } 
            //     // result[cont] .id = i+1;
            //     result[cont++] = data
            //     break
            //     continue
            // }
            if(keyName in jsonParsed){

                if(valor){
                    if(jsonParsed[keyName] != valor || jsonParsed == null) continue;
                }
                let data ={
                    id : i+1,
                    item: jsonParsed
                } 
                // result[cont] .id = i+1;
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

export {findItemByKeyCrypto}

/*

const BasesParam = {
    dir:'../data/DB'

}

findIdByKey(`/teste/${1}.jsonl`,'user',null,BasesParam).then(console.log)
// var
// async function findByKey(){

    
// }
// */ 