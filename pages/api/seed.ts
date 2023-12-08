/**Podremos hacer peticiones a api/seed
 * Aca voy a purgar la base de datos, en produccion yo 
 * no quiero que se tenga acceso a este servicio, por eso si la variable 
 * de entorno de NODE es production, voy a mandar un errror
 * El objetivo de este archivo es que al hacer /api/seed se borre todo lo 
 * que esta en la base de datos
 */
import { db } from '@/database';
import { seedDataBase } from '@/database/seed-database';
import Entrada from '@/models/Entrada';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string;
}

export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    if( process.env.NODE_ENV === 'production' ) {
        /**Si es en produccion no lo voy a ejecutar */
        return res.status(401).json({
            message:'No tiene acceso a este servicio'
        })
    }
    await db.connect(); //Me conecto a la base de datos
    /**Aca podemos hacer cualquier peticion a la base de datos, ya que 
     * estamos conectados
     */
    /**Luego de crear mi seed-database que tiene la info necesaria, voy a 
     * insertarla en la base de datos
     */
    await Entrada.deleteMany(); /**Esto si o si, sino borrara todo */
    await Entrada.insertMany( seedDataBase.entradas ); //Voy a insertar el arreglo de entradas, para probar esto debo probar mi endpoint para que se haga
    /**Aqui ya cree mi base de datos llamada entradas y tengo mis entradas que cree manualmente */

    await db.disconnect(); //me desconecto
    res.status(200).json({ message: 'Proceso realizado correctamente' })
}