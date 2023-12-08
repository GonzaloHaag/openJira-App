/**Aqui crearemos la conexion a la base de datos, luego de crear la 
 * imagen de mongo y conectarnos desde el mongo compass
 * Para esta conexion utilizaremos mongoose que nos permite 
 * trabajar con la base de datos de mongo de una manera muy facil
 * npm install mongoose --save
 */
import mongoose from "mongoose";

/**
 * El 0 va a ser = a disconnected (desconectado)
 * El 1 va a ser = a connected (conectado)
 * El 2 va a ser = a coneccting (conectando)
 * El 3 va a ser = a disconnecting (desconectando)
 */

const mongoConnection = {
    isConnected:0
}
export const connect = async () => {
   /**Voy a evaluar el objeto de mongoConnection ya que si 
    * estoy conectado (1) no hago nada
    */
   if ( mongoConnection.isConnected === 1 ) {
    console.log('Ya estas conectado');
    return; //Para no continuar
   }
   if( mongoose.connections.length > 0 ) {
    mongoConnection.isConnected = mongoose.connections[0].readyState; //Para tomar esa conexion
    if( mongoConnection.isConnected === 1) {
        console.log('Usando conexion anterior');
        return;
    }
    /**Si la respuesta es diferente a 1 quiero desconectarme */
    await mongoose.disconnect();
   }

   await mongoose.connect(process.env.MONGO_URL || ''); //Le mando la url de conexion a mongo
   mongoConnection.isConnected = 1; //Porque si pasamos lo de arriba quiere decir que ya estamos conectados
   console.log('Conectado a MongoDb: ', process.env.MONGO_URL)

}
export const disconnect = async() => {
    if ( process.env.NODE_ENV === 'development') return; //Si estoy en desarrollo no quiero desconectarme
    if ( mongoConnection.isConnected === 0 ) return; //Si es igual a 0 me desconecto
   
    await mongoose.disconnect();
    mongoConnection.isConnected = 0; //Aca ya me estoy desconectando
    console.log('Desconectado de MongoDB')
}