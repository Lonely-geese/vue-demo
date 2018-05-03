export default {
  showLoading: ({ commit }) => {
    commit('showLoading')
  },
  hideLoading: ({ commit }) => {
    commit('hideLoading')
  },
  showNav: ({ commit }) => {
    commit('showNav')
  },
  hideNav: ({ commit }) => {
    commit('hideNav')
  },
  setUserInfo: ({
                  commit,
                  userInfo,
                }) => {
    commit('setUserInfo', userInfo);
  }
}
//让server知道你做了什么操作
