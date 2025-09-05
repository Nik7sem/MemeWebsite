import axios from 'axios';

export const API = axios.create({baseURL: '/api'})
export const AppVersion = '0.0.1'