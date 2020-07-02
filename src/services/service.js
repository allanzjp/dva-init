import axios from 'axios';
import {proxyUrl, portalUrl} from '../defaultSetting'
import request from '../utils/request'

export function ipInfo() {
  return axios.get(proxyUrl);
}
export function login (payload) {
  return axios.post(`${portalUrl}/login?username=${payload.username}&password=${payload.password}`,)
}
export async function logout(payload) {
  return axios.post(`${proxyUrl}/logout`, payload)
}
export function employeeInfo (payload) {
  return axios.post(`${proxyUrl}/hr/sign/employee/info`, payload)
}
export function agreements (payload) {
  return axios.post(`${proxyUrl}/hr/sign/record/employee/list`, payload)
}
export function agreement (payload) {
  return axios.post(`${proxyUrl}/hr/sign/record`, payload)
}
export function employeeUpdate (payload) {
  return axios.post(`${proxyUrl}/hr/sign/employee/update`, payload)
}
export function getAuthUrl (payload) {
  return axios.post(`${proxyUrl}/hr/sign/getAuthUrl`, payload)
}
export function getSignUrl (payload) {
  return axios.post(`${proxyUrl}/hr/sign/getSignUrl`, payload)
}
export function getCiBankCardInfo (payload) {
  return axios.post(`${proxyUrl}/hr/sign/getCiBankCardInfo`, payload)
}

