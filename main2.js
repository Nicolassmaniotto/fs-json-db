// import {Bases} from './bases.js'
// import * as fs from 'fs'
// import {decryptoSimple} from 'encryptosumsimple'
// const Bases = require('./bases.js')
const fs  = require('fs')
const{decryptoSimple,encryptoSimple}=require('encryptosumsimple');

const Bases = {
    qtId:10,
    dir:'./data/DB',
    findQt : null,
    crypto:{
        type:'sumsymple',
        key:'isso_é_uma_senha'
    }
}


function tryJson(data) {
    try {
        if(typeof(data) == 'object') return data
        let result = JSON.parse(data);
        return result;
    } catch{
        return false;
    }

}
function tryString(data){
    try{    
        if(typeof(data)=='number'){
            return `${data}`
        }else if(typeof(data)=='string'){
            return data
        }else{
            throw data
        }
    }catch{
        return false
    }
}
function vCrypto(params){
    //verifica a criptpografia
    // e prepara os parametros
    try{
        if(!params.crypto) throw '03180900' //cry01 sem dados para cryptografia
        if(!params.crypto.type) throw '03180901' //cry01 sem parametro type para cryptografia
        if(!params.crypto.key) throw '03180902' //cry01 sem parametro key para criptografia'
        if(params.crypto.type.toLowerCase() == 'aes' && !params.crypto.iv) throw '03180903' //cry01 sem parametros para criptografia aes
        if(params.crypto.type.toLowerCase() == 'sumsymple' && !params.crypto.separe){
            params.crypto.separe = ':'
        }
        return params
    }catch(err){
         return err;
    }
}
function deCrypto(data,params){
    //função para tratar a cryptografia
    try{
        var result = 'null'; // variavel de resultados
        params = vCrypto(params)
        // console.log(params)
        if(typeof(params) != 'object') throw params;
        if(params.crypto.type.toLowerCase() == 'sumsymple'){
            // criptografia chave valor por soma
            //console.log(data)
            if(!data) return result
            data = Buffer.from(data,'base64').toString('utf8')
            result = decryptoSimple(data,params.crypto.key,params.crypto.separe )
            result = Buffer.from(data,'base64').toString('utf8')
        }
        return result
    }catch(err){
        return err
    }
}
function enCrypto(data,params){
    //função para tratar a cryptografia
    try{
        // console.log(JSON.stringify(params))
        var result = 'null'; // variavel de resultados
        params = vCrypto(params)
        if(typeof(params) != 'object') throw params;
        if(params.crypto.type.toLowerCase() == 'sumsymple'){
            // criptografia chave valor por soma
            data = Buffer.from(data,'utf8').toString('base64') // forçado o uso de utf8 por segurança
            result = encryptoSimple(data,params.crypto.key,params.crypto.separe )
            result = Buffer.from(data,'utf8').toString('base64')
            //  =  addItemSync(dir,item,params)
        }
        return result
    }catch(err){
        return err
    }
}
async function readMakeDir(dir){
    if(!fs.existsSync(dir)){
       fs.mkdir(dir,{ recursive: true }, (err) => {
            if (err) {
                return err
            }else{
                return 'Sucesso'
            }
        });
    }
    return 0
}
async function createDB(name,basesParam=null){
    // cria o banco 
    basesParam  =  basesParam||{noParam:0}
    let bases  = Bases
    Object.assign(bases,basesParam);
    try{
        if(!name) throw 'Sem nome para a Tabela'
        if(fs.existsSync(`${bases.dir}/${name}`)) throw 'erro BD ja exist'
        if(!readMakeDir(`${bases.dir}/${name}`)) throw 'Erro ao criar'
        return 'Sucesso'
    }catch(err){
        return err|| 'erro desconhecido ao criar DB'
    }

}

async function addItemSync(dir,data,bases){
    // adiciona itens por arquivo de 0 a 9, cada linha equivale a um id
    // se for maior criar novo arquivo e adiona os outros ids
    // era Syncrono, so nome continua assim
    // basesParam  =  basesParam||{noParam:0}
    // console.log(basesParam)
    // let bases  = Bases
    // console.log(bases)
    // Object.assign(bases,basesParam);
    // console.log(bases)

    try{
        if(!fs.existsSync(`${bases.dir}/${dir}`)) throw 'erro DB nao existe'
        let pastas = fs.readdirSync(`${bases.dir}/${dir}`);
        // console.log(pastas[pastas.length-1])
        if(!pastas[pastas.length-1]||!fs.existsSync(`${bases.dir}/${dir}/1.jsonl`)){
            fs.writeFileSync(`${bases.dir}/${dir}/1.jsonl`,`${data}\n`, (err) => {
                if (err) throw err;
            // console.log('O arquivo foi criado!');
            return 'success'
            })
            return  'criado'
        }
        let files = fs.readFileSync(`${bases.dir}/${dir}/${pastas.length}.jsonl`, 'utf8');
        // console.table(files)
        let calc = files.match(/\n/g).length;
        // console.log(calc)
        if(calc >= bases.qtId){
            fs.writeFileSync(`${bases.dir}/${dir}/${pastas.length+1}.jsonl`, `${data}\n`, (err) => {
                if (err) throw err;
            // console.log('O arquivo foi criado!');
            return 'success'
            });
            return 'add item E OU criado novo'
        }else if(calc < bases.qtId){
            fs.appendFileSync(`${bases.dir}/${dir}/${pastas.length}.jsonl`,`${data}\n`,(err)=>{
                if(!err){
                    // console.log('The file has been saved!');
                    // return 'success';
                }
                else{
                    throw 'error'
                }
            })
            return 'add item'
        }
        return 'por algum motivo algo não aconteceu'
    }catch(err){
        return err
    }

}
async function addItemIfCrypto(dir,data,params){
    try{
        // console.log(JSON.stringify(params))
        let result;
        // params  =  params||{noParam:0}
        // let bases  = Bases
        // Object.assign(params,bases);
        // console.log(JSON.stringify(params))
        params  =  vCrypto(params);
        // console.log(JSON.stringify(params))
        if(typeof(params)=='string') throw params;

        if(typeof(data) != 'string'){
            data = JSON.stringify(data);
        }
        let item = enCrypto(data,params)
        result = addItemSync(dir,item,params).then((result)=>{return result}).catch((err)=>{if(err)throw err} )
        
        
        return result;
    }catch(err){
        throw err
    }

}

async function addItem(dir,data,params =null,typeAdd = '1'){
    try{
        //console.log('addItem')
        params  =  tryJson(params)||{noParam:0}
        // console.log(Bases)
        Object.assign(Bases,params);
        typeAdd = tryString(typeAdd)
        // console.log(Bases)
        params = Bases
        //console.log(params)
        if(typeAdd.toLowerCase() == 'sync' || typeAdd =='1' || typeAdd == null){
           return addItemSync(dir,data,params).then((result)=>{
            return result
           }).catch((err)=>{
            if(err)throw err;})
        }else if(typeAdd.toLowerCase() == 'crypto' || typeAdd =='2'){
           return addItemIfCrypto(dir,data,params).then((result)=>{return result}).catch((err)=>{if(err)throw err} )
        }
    }catch(err){
        throw err
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
async function findItemByKey(dir,keyName,valor =1,basesParam= null){
    basesParam  =  basesParam||{noParam:0}
    let bases  = Bases
    Object.assign(bases,basesParam);
    // console.log(bases)
    try{
        var data = {};
        if(!keyName) throw 'key não definida'
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

async function updateDirect(dir,id,data,basesParam =null){
    basesParam  =  basesParam||{noParam:0}
    let bases  = Bases
    Object.assign(bases,basesParam);
    try{
        if(!fs.existsSync(`${bases.dir}/${dir}`)) throw 'erro BD não exist'
        let pasta = fs.readdirSync(`${bases.dir}/${dir}`);
        var calc;
        if(pasta.length==0){
            var file = fs.readFileSync(`${bases.dir}/${dir}/${1}.jsonl`, 'utf8').split('\n');
            // console.log(file[id])
            return 'if 1'
        }else{
            var calc = parseInt((bases.qtId+id)/bases.qtId)
            if(calc>pasta.length) throw calc
            // console.log(calc)
            var resto = parseFloat((((bases.qtId+id)/bases.qtId)%1).toFixed(1))*10
            // console.log(resto)
            // calc = calc -id
            var file = fs.readFileSync(`${bases.dir}/${dir}/${calc}.jsonl`, 'utf8').split('\n');
            // como o resto vai de 0 a 9 e o array file começa em 0 se subtrai 1 para achar a linha correta
            file[resto-1] = data
            var result = file.join("\n")
            await fs.writeFile(`${bases.dir}/${dir}/${calc}.jsonl`, `${result}\n`, (err) => {
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
async function updateCrypto(dir,id,data,params =null){
    try{
        // console.log(JSON.stringify(params))
        let result;
        params  =  params||{noParam:0}
        let bases  = Bases
        Object.assign(params,bases);
        // console.log(JSON.stringify(params))
        params  =  vCrypto(params);
        // console.log(JSON.stringify(params))
        if(typeof(params)=='string') throw params;

        if(typeof(data) != 'string'){
            data = JSON.stringify(data);
        }
        let item = enCrypto(data,params)
        result = updateDirect(dir,id,item,params =null)
        return result;
    }catch(err){
        return err
    }

}

async function update(dir,id,data,params =null,typeAdd = '1'){
    try{
        typeAdd = (typeof(typeAdd)!='string')? `${typeAdd}`:typeAdd
        params  =  params||{noParam:0}
        Object.assign(Bases,params);
        // console.log(Bases)
        params = Bases
        if(typeAdd.toLowerCase() == 'direct' ||typeAdd.toLowerCase() == 'sync' || typeAdd =='1' || typeAdd == null){
           return updateDirect(dir,id,data,params =null)
        }else if(typeAdd.toLowerCase() == 'crypto' || typeAdd =='2'){
        //    return addItemIfCrypto(dir,data,params)
        // console.log('cry')
           return  updateCrypto(dir,id,data,params =null)
        }
    }catch(err){
        return err
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
       await  createDB('teste')
    for(let i =11;i<=20;i++){
        let dataJson = {
            user:i,
            erros:["erro","contem","errou"]
        }
        // console.log(i)
        // addItem('teste',JSON.stringify(dataJson),null,'2').then(console.log).catch(console.log)
    }
    let bases = {
        findQt : 1,
        find: '11',
        id:'50'
    }
    await findItemInAll('teste','user','11','3').then(console.table).catch(console.log)
    // createDB('teste').then(console.log).catch(console.log)l
    let jsonVar = {
        user:"usuario",
        nome:"unamed",
        algo:['algo','2','5']
    }
    // update('teste',5,JSON.stringify(jsonVar),null,'2').then(console.log).catch(console.log)
}

//teste()/*
 module.exports = {createDB,update,addItem,addItemSync,findIdInAll,findItemInAll,addItemIfCrypto}
/**/