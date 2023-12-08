/**Aca voy a hacer la solicitud http con axios */
import axios from "axios";

const entradasApi = axios.create({
    //Como sale del mismo servidor, solo pongo lo que quiero como base, esto lo interpeta como localhost:3000/api y luego para llamarlo pongo lo que le sigue al endpoint de api    
    baseURL:'/api'
});
export default entradasApi;