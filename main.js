// const r = require('./reader');
// const readline = require('readline')
// const fs = require('fs')

import * as r from './reader.js';

import * as fs from 'fs';
import {Bases} from './bases.js'

import {findIdInAll,findItemInAll} from './find/index.js';
import { addItem,addItemSync, addItemIfCrypto } from './add/index.js';
import {update} from './update/index.js'
// import { addItemIfCrypto } from './add/addUsingCrypto.js';



// const Bases = {
//     qtId:10,
//     dir:'data/DB/'

// }
async function createDB(name,basesParam=null){
    // cria o banco 
    basesParam  =  basesParam||{noParam:0}
    let bases  = Bases
    Object.assign(bases,basesParam);
    try{
        if(!name) throw 'Sem nome para a Tabela'
        if(fs.existsSync(`${bases.dir}/${name}`)) throw 'erro BD ja exist'
        if(!r.readMakeDir(`${bases.dir}/${name}`)) throw 'Erro ao criar'
        return 'Sucesso'
    }catch(err){
        return err|| 'erro desconhecido ao criar DB'
    }

}






export{createDB,update,addItem,addItemSync,findIdInAll,findItemInAll,addItemIfCrypto} /* // testes comente essa linha para testar

// export{createDB,update,addItemSync,findIdInAll,findItemInAll}
// /* // testes comente essa linha para testar


let basesParam = {
    qtId:2
}
    // let argv = require('process')['argv']

    // console.log(argv)
    // if(argv[2] == 'create' || argv[1] == 'create'){
    //     createDB('teste').then(console.log).catch(console.log)
    // }else if(argv[2] == 'add' || argv[1] == '(e) add'){
    //     addItem('teste',JSON.stringify(dataJson)).then(console.log).catch(console.log);
    // }else if(argv[2] == 'find' || argv[1] == 'find'){
    //     findId('teste/1.jsonl','contem').then(console.log).catch(console.log)
    // } 
   await  createDB('teste')
for(let i =11;i<=20;i++){
    let dataJson = {
        user:i,
        erros:["erro","contem","errou"]
    }
    // console.log(i)
    addItem('teste',JSON.stringify(dataJson),null,'2').then(console.log).catch(console.log)
}
let bases = {
    findQt : 1,
    find: '11',
    id:'50'
}
await findItemInAll('teste','user',bases,'3').then(console.table).catch(console.log)
// createDB('teste').then(console.log).catch(console.log)l
let jsonVar = {
    user:"usuario",
    nome:"unamed",
    algo:['algo','2','5']
}
update('teste',5,JSON.stringify(jsonVar),null,'2').then(console.log).catch(console.log)
/* */