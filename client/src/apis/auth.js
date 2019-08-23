import axios from 'axios';

export default axios.create({
  // baseURL: 'http://localhost:3001/auth'
  baseURL: 'http://192.168.0.135:3001/auth'
})