async function findItemByKey(dir,keyName,valor =null,basesParam= null){
    basesParam  =  basesParam||{noParam:0}
    let bases  = Bases
    Object.assign(bases,basesParam);
    try{
        var data = {};
        if(!keyName) throw 'key não definido'
        if(!keyName.key||keyName.key == null || typeof(keyName.key)=='undefined'){
            data.key = keyName
            data.qt    = 1
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
                let valor ={
                    id : i+1,
                    item: jsonParsed
                } 
                // result[cont] .id = i+1;
                result[cont++] = valor
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