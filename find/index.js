import {Bases} from '../bases.js'

import {findId,findItem} from './findByRegex.js'
import { findIdByKey,findItemByKey } from './findBykey.js'
import { findItemByKeyCrypto } from './findBykeyCrypto.js'
import { tryJson } from '../global/thisIs.js'
import * as fs from 'fs'
async function findIdInAll(dir,findVar,basesParam =null,typeFind = '1'){
    basesParam  =  basesParam||{noParam:0}
    let bases  = Bases
    Object.assign(bases,basesParam);
    try{
        let pasta = fs.readdirSync(`${bases.dir}/${dir}`);
    // console.log(pasta.length)

        let  id;
        let  arrayReturn=[];
        var cont=0;
        if(typeFind.toLowerCase() == 'regex' || typeFind =='1' || typeFind == null){
            for(var i =1; i<= pasta.length; i++){
                await findId(`${dir}/${i}.jsonl` ,findVar).then((result)=>{
                    if(result!=0){
                        // result.id = i*bases.qtId-bases.qtId+result.id
                        for(let j in result){
                            result[j] = i*bases.qtId-bases.qtId+result[j]
                        }
                        arrayReturn[cont++] = result
                        // console.log(result) 
                        // console.log(item)
                    }
                }).catch(console.log)
                // if(id > 0){
                //     arrayReturn[cont]= i*bases.qtId-bases.qtId+id
                //     cont++;
                //     id = null
                // }else{
                //         // console.log('else')
                // }
            }
        }else if(typeFind.toLowerCase() == 'key'|| typeFind == '2'){
            for(var i =1; i<= pasta.length; i++){
                await findIdByKey(`${dir}/${i}.jsonl` ,findVar).then((result)=>{
                    // console.log(result)
                    if(result!=0){
                        // result.id = i*bases.qtId-bases.qtId+result.id
                        for(let j in result){
                            result[j] = i*bases.qtId-bases.qtId+result[j]
                        }
                        arrayReturn[cont++] = result
                    }
                }).catch(console.log)
            }
        }else if(typeFind.toLowerCase() == 'keycripto'|| typeFind == '3'){
        }
        return arrayReturn
    }catch(err){
        console.log('erro')
        return err
    }
}


async function findItemInAll(dir,findVar,basesParam =null,typeFind = '1'){
    
    // console.log(basesParam)
    if(typeof(basesParam) == 'string'){
        basesParam = { find:basesParam}
    }
    basesParam  =  basesParam||{noParam:0,find:null}
    let bases  = Bases
    
    Object.assign(bases,basesParam);
    try{

        let pasta = fs.readdirSync(`${bases.dir}/${dir}`);
    // console.log(pasta.length)
        if(typeof(findVar) == 'number'){
            //correção devido a  escolha de usar 1 como id inicial
            findVar = typeFind-1
        }
            typeFind = tryString(typeFind)
        // console.log(typeFind)
        // console.log(bases)
        let  item=[];
        var cont =0;
        var pos = 1;
        var comprimento = pasta.length;
        if(typeFind.toLowerCase() == 'regex' || typeFind =='1' || typeFind == null){
            if(typeof(findVar) =='number' || bases.id){
                var calc = (parseInt(findVar)+parseInt(bases.qtId))/bases.qtId;
                // console.log(calc)
                var file = fs.readFileSync(`${bases.dir}/${dir}/${parseInt(calc)}.jsonl`, 'utf8').split('\n');
                calc = calc%1;
                calc = (calc.toFixed(1))*10
                // console.log(calc)
                return file[calc]
                // throw calc
            }else{
                for(var i =1; i<= pasta.length; i++){
                    await findItem(`${dir}/${i}.jsonl` ,findVar,bases).then((result)=>{
                        // console.log(result)
                        if(result!=0){
                            result.id = i*bases                
                            item[cont++] = result
                            // console.log(item)
                        }
                    }).catch(console.log)
                }
            }
        }else if(typeFind.toLowerCase() == 'key'|| typeFind == '2'){
            // console.log('passou aqui')
            for(var i =1; i<= pasta.length; i++){
                if(typeof(findVar) == 'string'){
                    await findItemByKey(`${dir}/${i}.jsonl` ,findVar,bases.find,bases).then((result)=>{
                        // console.log(result)
                        if(result!=0){
                            // result.id = i*bases.qtId-bases.qtId+result.id
                            for(let j in result){
                                result[j].id = i*bases.qtId-bases.qtId+result[j].id
                            }
                            item = item.concat(result)
                        }
                    }).catch(console.log)
                }else if(typeof(findVar) == 'object'){
                    await findItemByKey(`${dir}/${i}.jsonl` ,findVar.keyname,findVar.value,bases).then((result)=>{
                        // console.log(result)
                        if(result!=0){
                            // result.id = i*bases.qtId-bases.qtId+result.id
                            for(let j in result){
                                result[j].id = i*bases.qtId-bases.qtId+result[j].id
                            }
                            item = item.concat(result)
                        }
                    }).catch(console.log)
                }

                if(item.length>= bases.findQt && bases.findQt != null){
                    // console.log(bases.findQt )
                    break
                }
            }
        }else if(typeFind.toLowerCase() == 'keycripto'|| typeFind == '3'){
            if(typeof(findVar) =='number'|| !isNaN(findVar)){
                var calc = (parseInt(findVar)+parseInt(bases.qtId))/bases.qtId;
                // console.log(calc)
                let file = Math.floor(calc)

                // console.log(Math.floor(calc))
                // var file = fs.readFileSync(`${bases.dir}/${dir}/${Math.floor(calc)}.jsonl`, 'utf8').split('\n');
                // calc = calc%1;
                // calc = (calc.toFixed(1))*10
                //22/08/2022
                // console.log(calc)
                await findItemByKeyCrypto(`${dir}/${Math.floor(calc)}.jsonl` ,findVar,bases.find,bases).then((result)=>{
                    //dir == pasta dos dados ; i == arquivo ; findVar == chave a ser procurada ;  bases.find = valor a ser procurado; bases == parametros de controle 
                    if(result!=0 && result!=null && tryJson(result)){
                        // result.id = i*bases.qtId-bases.qtId+result.id
                        // console.log(result)
                        for(let j in result){
                            result[j].id = i*bases.qtId-bases.qtId+result[j].id
                        }
                        item = item.concat(result)
                        //console.log(item)
                    }
                }).catch(console.log)
                // return file[calc]
                // throw calc
            }else{
                for(var i =pos; i<= comprimento; i++){
                    if(typeof(findVar) == 'string'){
                        await findItemByKeyCrypto(`${dir}/${i}.jsonl` ,findVar,bases.find,bases).then((result)=>{
                            //dir == pasta dos dados ; i == arquivo ; findVar == chave a ser procurada ;  bases.find = valor a ser procurado; bases == parametros de controle 
                            // console.log(result)
                            if(result!=0 && result!=null && tryJson(result)){
                                // result.id = i*bases.qtId-bases.qtId+result.id
                                // console.log(result)
                                for(let j in result){
                                    result[j].id = i*bases.qtId-bases.qtId+result[j].id
                                }
                                item = item.concat(result)
                                //console.log(item)
                            }
                        }).catch(console.log)
                    }else if(typeof(findVar) == 'object'){
                        // console.log(findVar)
                        // console.log(findVar.keyname)
                        await findItemByKeyCrypto(`${dir}/${i}.jsonl` ,findVar.keyname,findVar.value,bases).then((result)=>{
                            //dir == pasta dos dados ; i == arquivo ; findVar == chave a ser procurada ;  bases.find = valor a ser procurado; bases == parametros de controle 
                            // console.log(result)
                            if(result!=0 && result!=null && tryJson(result)){
                                // result.id = i*bases.qtId-bases.qtId+result.id
                                // console.log(result)
                                for(let j in result){
                                    result[j].id = i*bases.qtId-bases.qtId+result[j].id
                                }
                                item = item.concat(result)
                                //console.log(item)
                            }
                        }).catch(console.log)

                    }
                    if(item.length>= bases.findQt && bases.findQt != null){
                        // console.log(bases.findQt )
                        break
                    }
                }
            }
    }
        return item
    }catch(err){
        // console.log('erro')
        console.log(err)
        return err
    }
}

export {findIdInAll,findItemInAll}