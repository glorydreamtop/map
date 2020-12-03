// 将列表转换为树形
export function listToTree(data, id, pid) {
  let result = []
  if (!Array.isArray(data)) {
    return result
  }
  data.forEach(item => {
    delete item.children;
  });
  let map = {};
  data.forEach(item => {
    map[item[id]] = item;
  });
  data.forEach(item => {
    let parent = map[item[pid]];
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      result.push(item);
    }
  });
  return result;
}
