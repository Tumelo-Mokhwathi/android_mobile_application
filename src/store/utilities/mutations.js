const set = ((key) => ((localState, payload) => {
  const s = localState;
  s[key] = payload;
}));

export default {
  set,
};
