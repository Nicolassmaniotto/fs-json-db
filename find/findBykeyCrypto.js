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
async function findItemByKeyCrypto(dir,keyName,valor =null,basesParam= null){

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
        if( typeof(keyName)=='object'&& keyName.key){
            valor = keyname.value;
            keyname = keyname.key
        }
        // console.log(data.key)
        if(!data.opt){
            data.opt = 'i'
        }
        // var calc;
        var pos = 0;
        // var file;
        if(typeof(keyName) =='number'){
            //console.log(pos)
            //22/08/2022
            pos = (parseInt(keyName)+parseInt(bases.qtId))/bases.qtId;
            pos = parseInt(pos)
            //console.log(keyName)
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
        if(!isNaN(keyName)){
            bases.qtId = pos
            console.log(pos)
            let data ={
                id : pos,
                item:  deCrypto(file[pos],bases)
            } 
            // result[cont] .id = i+1;
            result[cont++] = data
            //console.log(pos)
        }else{
            for(var i =0;i<bases.qtId;i++){
                // adicionar função de descryptografar
                let jsonParsed = deCrypto(file[i],bases)
                jsonParsed= tryJson(jsonParsed)
                // console.log(file[i])
                // console.log(keyName)
                // console.log(jsonParsed)
                if(!jsonParsed) continue
                if(keyName in jsonParsed){

                    if(valor){
                        if(jsonParsed[keyName] != valor || jsonParsed == null) continue;
                    }
                    // console.log(jsonParsed)
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
        }
        return result
    }catch(err){
        throw err
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