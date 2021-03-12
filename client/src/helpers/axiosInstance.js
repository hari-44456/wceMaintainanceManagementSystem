import axios from 'axios';

const Instance = axios.create({
  baseURL: `${window.location.protocol}//${window.location.hostname}:5000`,
  withCredentials: true,
});

export default Instance;
