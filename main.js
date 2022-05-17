const r = require('./reader');
// const readlinePromises = require('node:readline/promises');
const readline = require('readline')
const fs = require('fs')

const Bases = {
    qtId:10,
    dir:'data/DB/',

}
async function createDB(name, bases = Bases){
    // cria o banco 
    try{
        if(!name) throw 'Sem nome para a Tabela '
        if(fs.existsSync(`${bases.dir}/${name}`)) throw 'erro BD ja exist'
        if(!r.readMakeDir(`${bases.dir}/${name}`)) throw 'Erro ao criar'
        return 'Sucesso'
    }catch(err){
        return err|| 'erro desconhecido ao criar DB'
    }

}

async function whriteData(dir,data){

    return await r.readMakeFile(dir,JSON.stringify(data))
}
async function addItem(dir,data,bases = Bases){
    // adiciona itens por arquivo de 0 a 9, cada linha equivale a um id
    // se for maior criar novo arquivo e adiona os outros ids
    try{
        if(!fs.existsSync(`${bases.dir}/${dir}`)) throw 'erro BD nao existe'
        let pastas = fs.readdirSync(`${bases.dir}/${dir}`);
        if(pastas)
        // const file = fs.readFileSync(dir, 'utf8').split('\n');
        // let matches = file.match(/\n/g);

        console.log(pastas)
        if(false && matches >= bases.qtId ){
            fs.writeFile(`${bases.dir}/${dir}`, data, (err) => {
                if (err) throw err;
            console.log('O arquivo foi criado!');
            return 'success'
            });
        }
    }catch(err){
        return err
    }

}
async function itFilter(item,query){
    try{
        return item.filter(el => el.toLowerCase().indexOf(query.toLowerCase()) > -1);
    }catch(err){
        return err
    }
}

async function findId(dir,regexData,basesParam= null){
    basesParam  =  basesParam||{noParam:0}
    // var bases = Bases 
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
        for(i in file){
            // optado por for ao inves de for each para reusar para pegar mais de um id
            var regex = new RegExp(data.regex,data.opt);
            if(regex.exec(file[i]) && i  >= data.qt){
                return i
            }
        }
        return 'none'
    }catch(err){
        return err
    }
}

let dataJson = {
    user:"usuario",
    erros:["erro","errei","errou"]
}
// let basesParam = {
//     qtId:2
// }
addItem('teste',JSON.stringify(dataJson)).then(console.log).catch(console.log);
// findId('teste/1.jsonl','contem').then(console.log).catch(console.log)
// createDB('teste').then(console.log).catch(console.log)
// itFilter(dataJson.erros,'ou').then((result)=>{
//     console.log(result)
// })