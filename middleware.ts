/**LOS MIDDLEWARES SON PARA MANEJAR ERRORES */
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // console.log({ request:request.nextUrl.pathname }) Aca se tiene el nombre del path donde se hace la peticion
    if( request.nextUrl.pathname.startsWith('/api/entradas/') ) {
        /**Si el pathname arranca con '/api/entradas/ --> Porque yo solo quiero ejecutar el
         * middleware cuando me hacen una peticion a ese endpoint
         */
        /**Ahora yo quiero quedarme solo con el id que viene en la url, por lo tanto voy a reemplazar 
         * la primer parte por un '' y me quedo solo con el ID
         */
        const id = request.nextUrl.pathname.replace('/api/entradas/',''); 
        // console.log({ id })
        /**Ahora que tenemos el id, podemos hacer una validacion EXACTA para ver 
         * si es un mongoID, podemos crear una expresion regular
         */
        const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");
        if ( !checkMongoIDRegExp.test( id ) ) {
            /**Si esto no machea, entonces retorno un error */
            const url = request.nextUrl.clone();
            /**Clono la url y ahora lo que hago es dirigir al endpoint de bad-request, el cual arroja 
             * un error, ya que esto es cuando no es un ID valido de mongo
             * Entonces ahora si me dan un ID en el endpoint que no es valido, se arrojara la 
             * respuesta que defini en api/bad-request.ts
             */
            url.pathname = '/api/bad-request'; 
            //Yo en mi endpoint de bad-request defini que me pueden mandar un mensaje con el error, entonces:
            url.search = `?message=${ id } no es un mongoID válido`; //Este es el mensaje que le envio a bad-request, entonces si sale un error sera este mensaje para especificarlo
            return NextResponse.rewrite( url ); //Reescribo la url
        }
    }
    return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
//   matcher: '/about/:path*',
  /**Yo quiero aplicar los middlewares solo a las rutas de mi api/entradas/cualquierPath que siga (ID DE LA ENTRADA POR EJEMPLO) */
     matcher: [
        // '/api/:path*',
        '/api/entradas/:path*'
    ]
}