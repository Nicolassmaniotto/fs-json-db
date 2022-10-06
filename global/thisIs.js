export function tryJson(data) {
    try {
        if(typeof(data) == 'object') return data
        let result = JSON.parse(data);
        return result;
    } catch{
        return false;
    }

}
export function tryString(data){
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
export function forceString(data){
    try{    
        if(typeof(data)=='number'){
            return `${data}`
        }else if(typeof(data)=='string'){
            return data
        }else if(typeof(data)=='undefined'){
            return false
        }else if(typeof(data)==='object'){
            return JSON.stringify(data)
        }else{
            return false
        }
    }catch{
        return false
    }
}