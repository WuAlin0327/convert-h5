const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  footer_name: state => state.footer.footer_name,
  bank: state => state.user.bank

};
export default getters
