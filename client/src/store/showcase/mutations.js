export function someMutation (/* state */) {
}
export const updateDrawerState = (state, opened) => {
  state.drawerState = opened
}

export const setToken = (state, token) => {
  state.token = token
}

export const setRefreshToken = (state, refreshToken) => {
  state.refreshToken = refreshToken
}

export const setUsername = (state, username) => {
  state.username = username
}
