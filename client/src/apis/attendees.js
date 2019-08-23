import axios from 'axios';
import baseURL from './config.js';

export default axios.create({
  baseURL: `${baseURL}/attendees`
})