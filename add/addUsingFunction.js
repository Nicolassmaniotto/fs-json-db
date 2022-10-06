import {addItemSync} from './addDirect.js'
import {tryJson, tryString} from "../global/thisIs.js"
async function addItemIfFunction(dir,func,params){
    try{
        
        params = tryJson(params)
        if(typeof(params)=='string') throw params;
        let result;
        if(typeof(func)==='function'){
            result =  tryString(func())
        }else{
            result =  tryString(func)
        }
        if(result){
            result = addItemSync(dir,result,params).then((result)=>{return result}).catch((err)=>{if(err)throw err} )
        }
        return result;
    }catch(err){
        throw err
    }

}




export {addItemIfFunction}

/*microteste
var Bases = {
    qtId:10,
    dir:'../data/DB',
    findQt : null,
    crypto:{
        type:'sumsymple',
        key:'senhasenhasenha'
        // iv:"algo_a_mais"
    }
}
    addItemIfFunction("teste",`()=>{
        let date = new Date
        var resultado = "ola:"+date.getTime()
        console.log(resultado)
            return resultado
            
    }`,Bases)

/* */