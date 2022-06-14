// const r = require('./reader');
// const readline = require('readline')
// const fs = require('fs')

import * as r from './reader.js';
import * as readline from 'readline';
import * as fs from 'fs';
import {findIdInAll,findItemInAll} from './find/index.js';

const Bases = {
    qtId:10,
    dir:'data/DB/'

}
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
async function addItem(dir,data,basesParam =null){
    // adiciona itens por arquivo de 0 a 9, cada linha equivale a um id
    // se for maior criar novo arquivo e adiona os outros ids
    basesParam  =  basesParam||{noParam:0}
    let bases  = Bases
    Object.assign(bases,basesParam);
    try{
        if(!fs.existsSync(`${bases.dir}/${dir}`)) throw 'erro BD nao existe'
        let pastas = fs.readdirSync(`${bases.dir}/${dir}`);
        // console.log(pastas[pastas.length-1])
        if(!pastas[pastas.length-1]){
            fs.writeFile(`${bases.dir}/${dir}/1.jsonl`,`${data}\n`, (err) => {
                if (err) throw err;
            console.log('O arquivo foi criado!');
            return 'success'
            })
            return  'criado'
        }
        let files = fs.readFileSync(`${bases.dir}${dir}/${pastas.length}.jsonl`, 'utf8');
        let calc = files.match(/\n/g).length;
        // console.log(calc)
        if(calc >= bases.qtId){
            fs.writeFile(`${bases.dir}${dir}/${pastas.length+1}.jsonl`, `${data}\n`, (err) => {
                if (err) throw err;
            // console.log('O arquivo foi criado!');
            return 'success'
            });
            return 'add item E OU criado novo'
        }else if(calc < bases.qtId){
            fs.appendFile(`${bases.dir}${dir}/${pastas.length}.jsonl`,`${data}\n`,(err)=>{
                if(!err){
                    // console.log('The file has been saved!');
                    // return 'success';
                }
                return 'error'
            })
            return 'add item'
        }
        return 'por algum motivo algo não aconteceu'
    }catch(err){
        return err
    }

}
function addItemSync(dir,data,basesParam =null){
    // adiciona itens por arquivo de 0 a 9, cada linha equivale a um id
    // se for maior criar novo arquivo e adiona os outros ids
    basesParam  =  basesParam||{noParam:0}
    let bases  = Bases
    Object.assign(bases,basesParam);
    try{
        if(!fs.existsSync(`${bases.dir}/${dir}`)) throw 'erro BD nao existe'
        let pastas = fs.readdirSync(`${bases.dir}/${dir}`);
        // console.log(pastas[pastas.length-1])
        if(!pastas[pastas.length-1]){
            fs.writeFileSync(`${bases.dir}/${dir}/1.jsonl`,`${data}\n`, (err) => {
                if (err) throw err;
            console.log('O arquivo foi criado!');
            return 'success'
            })
            return  'criado'
        }
        let files = fs.readFileSync(`${bases.dir}${dir}/${pastas.length}.jsonl`, 'utf8');
        let calc = files.match(/\n/g).length;
        // console.log(calc)
        if(calc >= bases.qtId){
            fs.writeFileSync(`${bases.dir}${dir}/${pastas.length+1}.jsonl`, `${data}\n`, (err) => {
                if (err) throw err;
            // console.log('O arquivo foi criado!');
            return 'success'
            });
            return 'add item E OU criado novo'
        }else if(calc < bases.qtId){
            fs.appendFileSync(`${bases.dir}${dir}/${pastas.length}.jsonl`,`${data}\n`,(err)=>{
                if(!err){
                    // console.log('The file has been saved!');
                    // return 'success';
                }
                return 'error'
            })
            return 'add item'
        }
        return 'por algum motivo algo não aconteceu'
    }catch(err){
        return err
    }

}



async function update(dir,id,data,basesParam =null){
    basesParam  =  basesParam||{noParam:0}
    let bases  = Bases
    Object.assign(bases,basesParam);
    try{
        if(!fs.existsSync(`${bases.dir}/${dir}`)) throw 'erro BD não exist'
        let pasta = fs.readdirSync(`${bases.dir}/${dir}`);
        var calc;
        if(pasta.length==0){
            var file = fs.readFileSync(`${bases.dir}/${dir}/${1}.jsonl`, 'utf8').split('\n');
            console.log(file[id])
            return 'if 1'
        }else{
            var calc = parseInt((bases.qtId+id)/bases.qtId)
            if(calc>pasta.length) throw calc
            console.log(calc)
            var resto = parseFloat((((bases.qtId+id)/bases.qtId)%1).toFixed(1))*10
            console.log(resto)
            // calc = calc -id
            var file = fs.readFileSync(`${bases.dir}/${dir}/${calc}.jsonl`, 'utf8').split('\n');
            // como o resto vai de 0 a 9 e o array file começa em 0 se subtrai 1 para achar a linha correta
            file[resto-1] = data
            var result = file.join("\n")
            await fs.writeFile(`${bases.dir}${dir}/${calc}.jsonl`, `${result}\n`, (err) => {
                if (err) throw err;
            // console.log('O arquivo foi criado!');
            return 'success'
            });
            return 'atualizado'
        // calc
        }
    }catch(err){
        return err
    }
}




// module.exports ={createDB,addItem,findId,update,addItemSync,findIdInAll,findItemInAll}
// /* // testes comente essa linha para testar


let basesParam = {
    qtId:2
}
    // let argv = require('process')['argv']

    // console.log(argv)
    // if(argv[2] == 'create' || argv[1] == 'create'){
    //     createDB('teste').then(console.log).catch(console.log)
    // }else if(argv[2] == 'add' || argv[1] == 'add'){
    //     addItem('teste',JSON.stringify(dataJson)).then(console.log).catch(console.log);
    // }else if(argv[2] == 'find' || argv[1] == 'find'){
    //     findId('teste/1.jsonl','contem').then(console.log).catch(console.log)
    // } 
   await  createDB('teste')
for(let i =0;i<=100;i++){
    let dataJson = {
        user:i,
        erros:["erro","contem","errou"]
    }
    // addItemSync('teste',JSON.stringify(dataJson)) 
}

findItemInAll('teste','user',2).then(console.log).catch(console.log)
// createDB('teste').then(console.log).catch(console.log)l
let jsonVar = {
    user:"usuario",
    nome:"unamed",
    algo:['algo','2','5']
}
update('teste',5,JSON.stringify(jsonVar)).then(console.log).catch(console.log)
/* */