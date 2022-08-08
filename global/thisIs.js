export function tryJson(data) {
    try {
        if(typeof(data) == 'object') return data
        let result = JSON.parse(data);
        return result;
    } catch{
        return false;
    }

}