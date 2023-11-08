import axios from 'axios';
import { env } from './index';
export const GET = (path, payload) => {
  const header = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'X-Requested-With':' XMLHttpRequest'
  }
  return new Promise((resolve ,reject) => {
    axios.get(`${env}${path}`, {
      headers: header,
      params: payload
    }).then((response) => {
      let data = response.data;
      if(response.status === 200){
        return resolve(data);
      }else{
        const error = { message: 'error' }
        return reject(error)
      }
    }).catch((err) => {
      return reject(err.response.data.message)
    })
  })
}

export const POST = (path, payload) => {
  const header = {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  }
  return new Promise((resolve ,reject) => {
    axios.post(`${env}${path}`,payload, {
      headers: header
    }).then((response) => {
      if(response.status === 200){
        return resolve(response.data);
      }else{
        return reject();
      }
    }).catch((err) => {
      return reject(err.response.data.message);
    })
  })
}

export const POST_FORM_DATA = (path, payload) => {
  return new Promise((resolve, reject) => {
    axios.post(`${env}${path}`, payload, {
      headers: {
        'Content-Type' : 'multipart/form-data',
        'X-Requested-With': 'XMLHttpRequest',
        'Cache-Control': 'no-cache'
      },
    }).then((response) => {
      if(response.status === 200){
        return resolve(response.data);
      }else{
        return reject();
      }
    }).catch((err) => {
      return reject(err.response.data.message);
    })
  }) 
}