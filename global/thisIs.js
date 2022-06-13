export function tryJson(data) {
    try {
        let result = JSON.parse(data);
        return result;
    } catch (e) {
        return false;
    }

}