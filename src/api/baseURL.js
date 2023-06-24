import axios from "axios";


const baseURL = axios.create({ baseURL: "http://localhost:5000/" });   //local
//   const baseURL = axios.create({ baseURL: "https://node-mysql-api-m2jd.onrender.com/" }); //server  //sorry server not working yet



export default baseURL;
