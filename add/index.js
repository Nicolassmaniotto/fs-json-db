import { addItemAsync, addItemSync } from './addDirect.js'
import { addItemIfCrypto } from './addUsingCrypto.js'
import { addItemIfFunction } from './addUsingFunction.js'
import { Bases } from '../bases.js'
import { tryJson, tryString } from "../global/thisIs.js"
async function addItem(dir, data, params = null, typeAdd = '1') {
    try {
        params = tryJson(params) || { noParam: 0 }
        Object.assign(Bases, params);
        typeAdd = tryString(typeAdd)
        params = Bases
        if (typeAdd.toLowerCase() == 'sync' || typeAdd == '1' || typeAdd == null) {
            return addItemSync(dir, data, params).then((result) => {
                return result
            }).catch((err) => {
                if (err) throw err;
            })
        } else if (typeAdd.toLowerCase() == 'crypto' || typeAdd == '2') {
            // deprecate progress
            return addItemIfCrypto(dir, data, params).then((result) => { return result }).catch((err) => { if (err) throw err })
        } else if (typeAdd.toLowerCase() == 'func' || typeAdd == '3') {
            return addItemIfFunction(dir, data, params).then((result) => { return result }).catch((err) => { if (err) throw err })
        }

    } catch (err) {
        throw err
    }

}
// let params = {
//     dir: '../data/DB/'
// }
// addItem('teste','ola',params).then(console.log).catch(console.log)
export { addItem, addItemAsync, addItemSync, addItemIfCrypto }