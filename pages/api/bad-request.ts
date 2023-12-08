/**Archivo para retornar a este endpoint en caso de que suceda un 
 * bad request (error 400)
 * Esta endpoint es /api/bad-request
 */
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  ok:boolean; //Porque voy a responder con un ok: true o false
  message:string | string[]; //Y un mensaje voy a responder, que va a ser string
}

export default function handler(req: NextApiRequest,res: NextApiResponse<Data>) { /**Que la respuesta sera de tipo Data*/ 

/**Mediante la url yo voy a esperar un mensaje (asi extraigo eso, del req.query) y si no viene por defecto sera 'Bad request */
  const { message = 'Bad request' } = req.query; //Me mandaran el message desde el middleware
  res.status(400).json({
     ok:false,
     message : message
    });
}
