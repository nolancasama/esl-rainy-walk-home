export function createState(initial = {}) {
  return { ...initial };
}

export function applyEffects(state, effects = {}) {
  if (effects.set) {
    Object.assign(state, effects.set);
  }

  for (const [key, amount] of Object.entries(effects.add || {})) {
    state[key] = (Number(state[key]) || 0) + Number(amount);
  }

  return state;
}
