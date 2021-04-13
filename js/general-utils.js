

/* Object Funcs */
function objToMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}
function mapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    // Doesn't escape the key '__proto__'
    // which can cause problems on older engines
    obj[k] = v;
  }
  return obj;
}

function cloneObj(obj){
  return JSON.parse(JSON.stringify(obj));
}


/* Capitalizing */
function capitalizeWord(word){
  if(word == null){ return null;}
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function capitalizeFirstLetterOfWord(word){
  if(word == null){ return null;}
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function capitalizeWords(str){
  if(str == null){ return null;}
  return str.toLowerCase().replace(/(?:^|\s|["([{_-])+\S/g, match => match.toUpperCase());
}


/* Misc */
function hashCode(str) {
  return str.split('').reduce((prevHash, currVal) =>
    (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0);
}

function signNum(number) {
  return number < 0 ? `${number}` : `+${number}`;
}

function round(value, precision) {
  let multiplier = Math.pow(10, precision || 0);
  return Math.floor(value * multiplier) / multiplier;
}
