function dateFormat(val) {
  const dateTime = new Date(val);
  const year = dateTime.getFullYear();
  const month = (dateTime.getMonth() + 1 + '').padStart(2, '0');
  const day = (dateTime.getDate() + '').padStart(2, '0');
  const hh = (dateTime.getHours() + '').padStart(2, '0');
  const mm = (dateTime.getMinutes() + '').padStart(2, '0');
  const ss = (dateTime.getSeconds() + '').padStart(2, '0');
  return `${year}-${month}-${day} ${hh}:${mm}:${ss}`;
}

function deepCopy(obj) {
  let result = obj;
  if (typeof obj === 'object' && obj !== null) {
    result = Object.prototype.toString.call(obj) === '[object Array]' ? [] : {};
    for (let prop in obj) {
      result[prop] = deepCopy(obj[prop]);
    }
  }
  return result;
}

export { dateFormat, deepCopy };
