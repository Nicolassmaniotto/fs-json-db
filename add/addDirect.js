import {Bases} from '../bases.js'
import * as fs from 'fs'

async function addItemAsync(dir,data,bases){
    // adiciona itens por arquivo de 0 a 9, cada linha equivale a um id
    // se for maior criar novo arquivo e adiona os outros ids
    // basesParam  =  basesParam||{noParam:0}
    // let bases  = Bases
    // Object.assign(bases,basesParam);
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
        let files = fs.readFileSync(`${bases.dir}/${dir}/${pastas.length}.jsonl`, 'utf8');
        let calc = files.match(/\n/g).length;
        // console.log(calc)
        if(calc >= bases.qtId){
            fs.writeFile(`${bases.dir}/${dir}/${pastas.length+1}.jsonl`, `${data}\n`, (err) => {
                if (err) throw err;
            // console.log('O arquivo foi criado!');
            return 'success'
            });
            return 'add item E OU criado novo'
        }else if(calc < bases.qtId){
            fs.appendFile(`${bases.dir}/${dir}/${pastas.length}.jsonl`,`${data}\n`,(err)=>{
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
        throw err
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

export{addItemAsync,addItemSync}