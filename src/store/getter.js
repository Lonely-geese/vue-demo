export default {
  loading: (state) => {
    return state.isShow;
  },
  shownav: (state) => {
    return state.isNavShow;
  },
  getUserInfo: (state) => {
    return state.userInfo;
  }
}
//把获得的信息写入view层

