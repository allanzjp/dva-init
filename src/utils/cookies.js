import Cookies from 'js-cookie';

const TokenKey = 'token';

export function getToken() {
  return Cookies.get(TokenKey)
  // return 'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImFiMjQ2ODljLTgzM2EtNDNjMi04MDU3LTIzMWI1YjJlOTc2NCJ9.vTOnexLOKaEti0V-ms_JFfQ0YrEze_RHqphg3aa9sXUoAxFnQE_CdzvqXL2VgeYx7Yq19loFWdpr67zeSgfdNg'
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

