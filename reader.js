const fs = require('fs');
const readline = require('readline')

// abstração do fs
async function readMake(dir,data){
    readStatus(dir)
    .then(
        fs.writeFileSync(dir,data))
    .catch((err)=>{
        readMake(dir)
        console.log(err)

    }
    )
    return 1
}
async function readMakeFile(dir,data){
    readStatus(dir)
    .then(
        fs.writeFileSync(dir,data))
    .catch((err)=>{
        readMake(dir)
        console.log(err)

    }
    )
    return 1 
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
async function saveFile($data){
    fs.appendFile('log.line',data,(err)=>{
        if(!err){
            console.log('The file has been saved!');
            return 'success';
        }
        return 'error'
    })
    return 0

}
async function readStatus($dir){
    if(!(data = fs.readFileSync($dir ,"utf8"))){
        // console.log(data)
        let dir = $dir.split(path.sep).pop();
        readMake(dir)
        fs.writeFileSync($dir,'/n')
        return 0
    }else{
        // console.log(data)
        return data
    }
}
async function updateStatus(dir,data){
    await readStatus(dir)
    .then(()=>{
        fs.writeFileSync(dir,data)
        return 1
    })
    .catch((err)=>{
        readMake(dir)
        console.log(err)
        return 0

    }
    )
}
async function updateJSON(dir,data){
    let readData =fs.existsSync(dir)
    if(!readData){
        fs.mkdir(dir,{ recursive: true }, (err) => {
             if (err) {
                 return err
             }else{
                fs.writeFileSync(dir,JSON.stringify(data));
             }
         });
     }else{
        var jsonRead = JSON.parse(readData);
        var result;
        jsonRead.forEach(element => {
            element
        });
     }
}

async function readLineFile(dir,func){
    var rl = readline.createInterface({
        input : fs.createReadStream(dir),
        output: process.stdout,
        terminal: false
  })
  rl.on('line',func)
}


module.exports = {readMakeDir,updateStatus,readStatus,readMakeFile,readLineFile};
// module.exports = {}