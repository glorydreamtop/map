import { GetDict, GetDictItems } from '@/api';
import { Message } from 'element-ui';
window.appDataDict = new Map();

export async function getList() {
    try {
        const list = await GetDict();
        await tree2map(list, true);
        Message.success('数据字典本地化成功')
        return 'success';
    } catch (error) {
        console.log(error);
        Message.error('数据字典本地化失败，请刷新页面')
    }

}

const tree2map = async (array, deep = false) => {
    const all = [];
    const flat = (array)=>{
        for (let i = 0; i < array.length; i++) {
            const item = array[i];
            appDataDict.set(item.ucode, item.uname)
            if (item.children) {
                flat(item.children)
            } else if (deep) {
                all.push(getItems(item.id));
            }
        }
    }
    flat(array);
    await Promise.all(all);
    return 'success';
}

async function getItems(id) {
    const list = await GetDictItems({ id });
    await tree2map(list,false);
    return 'success';
}

export function c2t(code) {
    return appDataDict.get(code);
}