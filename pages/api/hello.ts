/**Cuando yo haga un get,post,delete,put lo que sea hacia localhost3000/api/hello se debera 
 * responder lo que dice en mi respuesta
 * res.status.....
 */
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  ok:boolean; //Porque voy a responder con un ok: true o false
  message:string; //Y un mensaje voy a responder, que va a ser string
  method:string; //Para saber si me estan haciendo un PUT,DELETELE,POST O GET
}

export default function handler(req: NextApiRequest,res: NextApiResponse<Data>) { /**Que la respuesta sera de tipo Data*/ 
  // console.log(process.env);
  res.status(200).json({
     ok:true,
     message:'Todo correcto',
     method:req.method || 'no hay metodo',
    });
}
