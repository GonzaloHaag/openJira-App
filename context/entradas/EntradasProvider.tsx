import { FC, useEffect, useReducer } from 'react';
import { EntradasContext,entriesReducer} from '.';
import { Entrada } from '@/interfaces';
import entradasApi from '@/apis/entradasApi';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
interface EntradasProviderProps{
    children?: JSX.Element | JSX.Element[]
}
export interface EntradasEstado {
    /**Voy a tener un arreglo de entradas de tipo Entrada, ya que cada una de las 
     * tareas tendra un id description y todo lo que esta en la interface de Entrada
     */
    entradas:Entrada[]
}
const ENTRADAS_INITIAL_STATE: EntradasEstado = {
    /**Aca definimos el estado inicial del arreglo 
     * de entradas, obviamente cada entrada debe 
     * tener lo que le dijimos en el tipado de E
     */
    entradas:[]
}
export const EntradasProvider: FC<EntradasProviderProps> = ({ children }) => {
    //Recibe el reducer y el estado inicial de las entradas()
    const [state, dispatch] = useReducer(entriesReducer, ENTRADAS_INITIAL_STATE);
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    /**Funcion para agregar entrada que va a recibir la 
     * descripcion de la tarea que es de tipo string
     */
    const addEntry = async( description:string ) => {
     /**   const nuevaEntrada:Entrada = { //va a ser de tipo Entrada
             _id:crypto.randomUUID(),
             description:description, //va a ser la que me manden por parametro
             createdAt:Date.now(),
             status:'pendiente'
             Ahora esto le corresponde al backend
       } */
       /**Ahora digo que se dispare este type, y le mando el payload la
        * nueva entrada. Y esto se encarga de agregarla al array de tareas
        * Voy a tomar esa entrada desde nuestro endPoint de POST, que se encarga de insertar 
        * la tarea en la base de datos
        */
       /**Voy a hacer la peticion Post a la url de /api/entradas que se encargara de 
        * hacer lo que le diga en el metodo POST(en el switch), aqui hacemos la 
        * peticion http en caso de que se quiera agregar una entrada
        */
       /*
        *CUANDO SE HACE UN POST, EL SEGUNDO PARAMETRO ES LA DATA QUE YO QUIERO MANDARLE A ESA PETICION
        * EN ESTE CASO, NOSOTROS DEFINIMOS EN EL API/ENTRADAS QUE NOS DEBE LLEGAR LA DESCRIPTION SI O SI
        * ENTONCES DESDE EL FRONTEND ES OBLIGATORIO MANDAR LA DESCRIPTION
        * Mando la descripcion que me llega por parametro
        */
       const respuesta = await entradasApi.post<Entrada>('/entradas', { description:description });
        
       dispatch( { type:'[Entrada] Agregar-entrada', payload:respuesta.data }); //Mando la data como payload, que es la entrada que quiero crear
    }

    const actualizarStatusEntrada = async (entrada:Entrada) => {
        /**Espero toda la tarea de tipo Entrada(tiene id description y eso)
         * Como quiero actualizar la entrada, el metodo para mi endpoint va a ser PUT y 
         * en la URL le mando el id de la entrada y recordemos que recibe la description y el status, asi
         * que se la puedo mandar. El put recibe esto como segundo parametro
         */
        try {
            /**Aca hago la peticion http por ID a /api/entradas/idTarea */
            const { data } = await entradasApi.put<Entrada>(`/entradas/${ entrada._id }`, { description:entrada.description, status:entrada.status });
            dispatch( { type:'[Entrada] ActualizarStatus - entrada',payload:data });
            //TODO: Mostrar snackbar cuando se le da al boton de guardar tarea
            enqueueSnackbar('Entrada actualizada',{
               variant:'success',
               autoHideDuration:1000,
               anchorOrigin: {
                /**Lo quiero arriba a la derecha */
                vertical: 'top',
                horizontal:'right'
               }
            })

        } catch (error) {
            console.log({error})
        }
      
    }
    const refrescarEntradas = async() => {
        /**Este get ejecutara lo que defini en pages/api/entradas cuando me hagan un get hacia esa direccion */
      const respuesta = await entradasApi.get<Entrada[]>('/entradas'); //Hago un get hacia /api/entradas, pero como mi baseUrl es /api, solo pongo lo que sigue 
      /**Le digo que va a ser un array de tipo Entrada */
    //   console.log(respuesta.data); //Aca estan las entradas
    //Hago el dispatch de refrescar data y le mando como payload el respuesta.data, que es el array de tareas que obtengo desde la base de datos
    dispatch( { type:'[Entrada] Refrescar - data',payload:respuesta.data })
    }
    useEffect(() => {
    /**Invocamos la funcion que se encarga de hacer la peticion HTTP para traer esas
     * entradas y no pongo dependencia porque lo quiero ejecutar una vez solamente cuando 
     * se carga el componente
     */
    refrescarEntradas();
    
    }, []);

    const borrarTarea = async( id:string ) => {
       await entradasApi.delete(`/entradas/${ id }`);
       dispatch({ type:'[Entrada] Borrar - tarea',payload:id })
       enqueueSnackbar('Entrada eliminada',{
        variant:'warning',
        autoHideDuration:1000,
        anchorOrigin: {
         /**Lo quiero arriba a la derecha */
         vertical: 'top',
         horizontal:'right'
        }
     });
     router.push('/');
    }
    return (
        <EntradasContext.Provider value={{
            ...state,
            addEntry,
            actualizarStatusEntrada,
            borrarTarea,
        }}>
            {children}
        </EntradasContext.Provider>
    )
}