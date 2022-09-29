import {readMakeDir} from '../global/reader.js'
import {Bases} from '../bases.js'
import {existsSync} from 'fs'
export async function createDB(name,basesParam=null){
    // cria o banco 
    basesParam  =  basesParam||{noParam:0}
    let bases  = Bases
    Object.assign(bases,basesParam);
    try{
        if(!name) throw 'Sem nome para a Tabela'
        if(existsSync(`${bases.dir}/${name}`)) throw 'erro BD ja exist'
        if(!readMakeDir(`${bases.dir}/${name}`)) throw 'Erro ao criar'
        return 'Sucesso'
    }catch(err){
        return err|| 'erro desconhecido ao criar DB'
    }

}