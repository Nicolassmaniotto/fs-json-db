const r = require('./reader');
const readline = require('readline')
const fs = require('fs')

const Bases = {
    qtId:10,
    dir:'data/DB/',

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
       const file = fs.readFileSync(`${bases.dir}/${dir}`, 'utf8').split('\n');
        var cont = 0;
        for(i in file){
            // optado por for ao inves de foreach para reusar para pegar mais de um id
            // id == fileatual*qtId-qtId+(i+1)
            var regex = new RegExp(data.regex,data.opt);
            // console.log(i)//&& 
            // console.log(file[i])
            // if(regex.exec(file[i]) != null && cont++  >= data.qt){
            if(regex.exec(file[i])){
                // console.log(i)//&& 
                return parseInt(i)+1
            }
        }
        return 0
    }catch(err){
        return err
    }
}
async function findIdInAll(dir,regex,basesParam =null){
    basesParam  =  basesParam||{noParam:0}
    let bases  = Bases
    Object.assign(bases,basesParam);
    try{
        let pasta = fs.readdirSync(`${bases.dir}/${dir}`);
    // console.log(pasta.length)

        let  id;
        for(var i =1; i<= pasta.length; i++){
            // var file = parseInt(i)+1
            // console.log('item '+i+' de '+pasta.length)
        
            await findId(`${dir}/${i}.jsonl` ,regex).then((result)=>{
                id = result
            }).catch(console.log)
            //    console.log(id)
            if(id > 0){
                return `${i}${id}`
            }else{
                    // console.log('else')
            }
            // console.log(i)
        }
        return id
    }catch(err){
        console.log('erro')
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
        for(i in file){
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
async function findItemInAll(dir,regex,basesParam =null){
    basesParam  =  basesParam||{noParam:0}
    let bases  = Bases
    Object.assign(bases,basesParam);
    try{
        let pasta = fs.readdirSync(`${bases.dir}/${dir}`);
    // console.log(pasta.length)

        let  item=[];
        var cont =0;
        for(var i =1; i<= pasta.length; i++){
            // var file = parseInt(i)+1
            // console.log('item '+i+' de '+pasta.length)

            await findItem(`${dir}/${i}.jsonl` ,regex).then((result)=>{
                // console.log(result)
                if(result!=0){
                    result.id = `${i}${result.id}`
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

// let dataJson = {
//     user:"usuario",
//     erros:["erro","errei","errou"]
// }



module.exports ={createDB,addItem,findId,update,addItemSync,findIdInAll,findItemInAll}
/* // testes comente essa linha para testar
let basesParam = {
    qtId:2
}
    let argv = require('process')['argv']
    console.log(argv)
    if(argv[2] == 'create' || argv[1] == 'create'){
        createDB('teste').then(console.log).catch(console.log)
    }else if(argv[2] == 'add' || argv[1] == 'add'){
        addItem('teste',JSON.stringify(dataJson)).then(console.log).catch(console.log);
    }else if(argv[2] == 'find' || argv[1] == 'find'){
        findId('teste/1.jsonl','contem').then(console.log).catch(console.log)
    } 

addItem('teste',JSON.stringify(dataJson)).then(console.log).catch(console.log);
findId('teste/1.jsonl','contem').then(console.log).catch(console.log)
createDB('teste').then(console.log).catch(console.log)
update('teste',13,'carroca').then(console.log).catch(console.log)
/* */