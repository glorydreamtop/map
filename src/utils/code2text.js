import { GetDict, GetDictItems } from '@/api';
window.appDataDict = new Map();

export async function getList() {
    const list = await GetDict();
    tree2map(list, getItems);
    return 'success';
}

const tree2map = (array, cb) => {
    const flat = (array) => {
        array.forEach(item => {
            appDataDict.set(item.ucode, item.uname)
            if (item.children) {
                flat(item.children)
            } else if (cb) {
                cb(item.id)
            }
        })
    }
    flat(array);
}

async function getItems(id) {
    const list = await GetDictItems({ id });
    tree2map(list);
    return 'success';
}

export function c2t(code) {
    return appDataDict.get(code);
}