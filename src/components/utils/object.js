export function objectSize(obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
}

export function objectHasValue(obj, value) {
  if (Object.values(obj).indexOf(value) > -1) {
    return true;
  } else return false;
}

export function cleanObject(obj) {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
}
