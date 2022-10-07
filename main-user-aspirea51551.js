// import {Bases} from './bases.js'
// "use strict"
// import * as fs from 'fs'
import {decryptoSimple,encryptoSimple} from 'encryptosumsimple'
import { addItem } from './add/index.js'
import { findIdInAll } from './find/index.js'
import { findItemInAll } from './find/index.js'
import { update } from './update/index.js'
import { createDB } from './create/index.js'

// const Bases = require('./bases.js')
// const fs  = require('fs')
// const{decryptoSimple,encryptoSimple}=require('encryptosumsimple');

const Bases = {
    qtId:10,
    dir:'./data/DB',
    findQt : null,
    crypto:{
        type:'sumsymple',
        key:'isso_é_uma_senha'
    }
}

async function teste(){
    let basesParam = {
        qtId:2
    }
        // let argv = require('process')['argv']
    
        // console.log(argv)
        // if(argv[2] == 'create' || argv[1] == 'create'){
            // createDB('teste').then(console.log).catch(console.log)
        // }else if(argv[2] == 'add' || argv[1] == '(e) add'){
        //     addItem('teste',JSON.stringify(dataJson)).then(console.log).catch(console.log);
        // }else if(argv[2] == 'find' || argv[1] == 'find'){
        //     findId('teste/1.jsonl','contem').then(console.log).catch(console.log)
        // } 
    
    await createDB('teste').then(console.log).catch(console.log)
    // /*
    // addItem('teste',JSON.stringify('4545454'),null,'2').then(console.log).catch(console.log)
    
    
    // /*

    
    for(let i =0;i<=1;i++){
        let dataJson = {
            user:i,
            erros:["erro","contem","errou"],
            teste:'testé'
        }
        // console.log(i)
        addItem('teste',JSON.stringify(dataJson),null,'2').then(console.log).catch(console.log)
    }
    // /*
    let bases = {
        findQt : 1,
        find: '11',
        id:'50'
    }
    await findItemInAll('teste','teste','testé','3').then(console.table).catch(console.log)
    // createDB('teste').then(console.log).catch(console.log)l
    let jsonVar = {
        user:"11",
        nome:"unamed",
        algo:['algo','2','5']
    }
    update('teste',7,JSON.stringify(jsonVar),null,'2').then(console.log).catch(console.log)
    /**/
}

teste()/*
export{createDB,update,addItem,findIdInAll,findItemInAll}
/**/