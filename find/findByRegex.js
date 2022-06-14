import { Bases } from '../bases.js';
import * as fs from 'fs'

async function findId(dir,regexData,basesParam= null){
    basesParam  =  basesParam||{noParam:0}
    let bases  = Bases
    Object.assign(bases,basesParam);
    try{
        var data = {};
        if(!regexData) throw 'regex não definido'
        if(!regexData.regex||regexData.regex == null || typeof(regexData.regex)=='undefined'){
            data.regex = regexData
            data.qt    = 1
        }
        if(!data.opt){
            data.opt = 'i'
        }
        // console.log(dir)
       let files = fs.readFileSync(`${bases.dir}/${dir}`, 'utf8').split('\n');
    //    console.log(files[1])
        var cont = 0;
        var result =[]
        for(let i in files){
            // console.log(files[i])
            // console.log(i)
            // optado por for ao inves de foreach
            // id == fileatual*qtId-qtId+(i+1)
            var regex = new RegExp(data.regex,data.opt);
            // console.log(i)//&& 
            // console.log(file[i])
            // if(regex.exec(file[i]) != null && cont++  >= data.qt){
            if(regex.exec(files[i])){
                // console.log(i)//&& 
                result[cont] = parseInt(i)+1;
                cont++;
                // return parseInt(i)+1
            }
        }
        return result
    }catch(err){
        return err
    }
}


async function findItem(dir,regexData,basesParam= null){
    // pega items pelo regex
    basesParam  =  basesParam||{noParam:0}
    let bases  = Bases
    Object.assign(bases,basesParam);
    try{
        var data = {};
        if(!regexData) throw 'regex não definido'
        if(!regexData.regex||regexData.regex == null || typeof(regexData.regex)=='undefined'){
            data.regex = regexData
            data.qt    = 1
        }
        if(!data.opt){
            data.opt = 'i'
        }
        const file = fs.readFileSync(`${bases.dir}/${dir}`, 'utf8').split('\n');
        var cont = 0;
        var item ={};
        item.item =[];
        item.id = [];
        for(let i in file){
            var regex = new RegExp(data.regex,data.opt);
            if(regex.exec(file[i])){
                item.id[cont]   = parseInt(i)+1
                // console.log(file[i])
                item.item[cont++] = file[i]
            }
        }
        if(item.id.length>0){
            return item
        }else{
            // console.log(item.id[i])item
            return 0
        }


    }catch(err){
        return err
    }
}




export {findId,findItem}