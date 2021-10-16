const get = (key) => (localState) => localState[key];
const getArrayAsDictionary = (key, mappedKey) => {
  const fn = (localState) => Object.assign({},
    ...localState[key].map((s) => ({ [s[mappedKey]]: s })));
  return fn;
};

const getArrayCopy = (key) => (localState) => (localState[key] ? [...localState[key]] : null);

const getObjectCopy = (key) => (localState) => JSON.parse(JSON.stringify(localState[key]));

export default {
  get,
  getArrayAsDictionary,
  getArrayCopy,
  getObjectCopy,
};
