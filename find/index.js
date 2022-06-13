import {Bases} from '../bases.js'

import {findId,findItem} from './findByRegex.js'
import * as fs from 'fs'
async function findIdInAll(dir,findVar,basesParam =null){
    basesParam  =  basesParam||{noParam:0}
    let bases  = Bases
    Object.assign(bases,basesParam);
    try{
        let pasta = fs.readdirSync(`${bases.dir}/${dir}`);
    // console.log(pasta.length)

        let  id;
        let  arrayReturn=[];
        var cont=0;
        for(var i =1; i<= pasta.length; i++){
            // var file = parseInt(i)+1
            // console.log('item '+i+' de '+pasta.length)
        
            await findId(`${dir}/${i}.jsonl` ,findVar).then((result)=>{
                id = result
            }).catch(console.log)
            //    console.log(id)
            if(id > 0){
                arrayReturn[cont]= i*bases.qtId-bases.qtId+id
                cont++;
                id = null
            }else{
                    // console.log('else')
            }
            // console.log(i)
        }
        return arrayReturn
    }catch(err){
        console.log('erro')
        return err
    }
}

async function findItemInAll(dir,findVar,basesParam =null){
    basesParam  =  basesParam||{noParam:0}
    let bases  = Bases
    Object.assign(bases,basesParam);
    try{

        let pasta = fs.readdirSync(`${bases.dir}/${dir}`);
    // console.log(pasta.length)
        if(bases.id){
            var calc = (parseInt(findVar)+parseInt(bases.qtId))/bases.qtId;
            console.log(calc)
            var file = fs.readFileSync(`${bases.dir}/${dir}/${parseInt(calc)}.jsonl`, 'utf8').split('\n');
            calc = calc%1;
            calc = (calc.toFixed(1))*10
            // console.log(calc)
            return file[calc]
            // throw calc
        }
        let  item=[];
        var cont =0;
        for(var i =1; i<= pasta.length; i++){
            // var file = parseInt(i)+1
            // console.log('item '+i+' de '+pasta.length)

            await findItem(`${dir}/${i}.jsonl` ,findVar).then((result)=>{
                // console.log(result)
                if(result!=0){
                    result.id = i*bases.qtId-bases.qtId+result.id
                    item[cont++] = result
                    // console.log(item)
                }
            }).catch(console.log)
            
            // console.log(item)
            // console.log(i)
        }
        return item
    }catch(err){
        console.log('erro')
        return err
    }
}

export {findIdInAll,findItemInAll}