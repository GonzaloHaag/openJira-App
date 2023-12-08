/**Archivo que se mostrara cuando se dirigan a /entradas/idTarea, aca lo que quiero es 
 * poder modificar la descripcion de la tarea
 * La idea tambien es que desde el inicio, al clickear una tarea se lleve a 
 * esta pagina con la informacion ya cargada, la descripcion y el status que tiene
 */
import { GetServerSideProps } from 'next'
import { ChangeEvent, FC, useContext, useState } from "react";
import { Layout } from "@/components/layouts"
import { Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField,capitalize } from "@mui/material";
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Entrada, EntradaStatus } from "@/interfaces";
import { getEntradaPorId } from '@/database/dbEntradas';
import { EntradasContext } from '@/context/entradas';
import { getFormatDistanceToNow } from '@/utils/dateFunctions';


const statusValidos:EntradaStatus[] = ['pendiente','en-progreso','completada'];

interface Props {
 entrada:Entrada;
}

const EntradaPage:FC<Props> = ( { entrada } ) => {
    /**Recibo la entrada que me manda  el getServerSideProps por props */
    console.log( { entrada }) //Me arroja la entrada, el id, description todo
    /**Yo ya tengo la entrada, y siempre va a venir porque estoy validando el ID, entonces
     * en el useState para mostrar la informacion ya cargada, debo cambiar los valores iniciales por 
     * los correspondientes de la entrada, que ya los tiene
     */
    const [inputValue,setInputValue] = useState( entrada.description );
    const [status,setStatus] = useState<EntradaStatus>( entrada.status ); //Le digo que va a ser de tipo EntradaStatus, inicialmente es el entrada.status que viene
    const [touched,setTouched] = useState(false);

    const { actualizarStatusEntrada,borrarTarea } = useContext( EntradasContext ); //Funcion para actualizar una entrada, que recibe la entrada 
    const cambiandoInputTextField = (event:ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }
    const capturandoStatus = (event:ChangeEvent<HTMLInputElement>) => {
    //   console.log(event.target.value) aca me arroja el status que se esta clickeando, lo seteo al status y listo
    setStatus( event.target.value as EntradaStatus ); //Para tratar el value de ese tipo, sino dara error

    }

    const guardarTarea = () => {
       /**Para guardar la tarea yo ya tengo el input value que es lo escrito en el input y el status, ya que 
        * en se clickea en el radioGroup
        */
    //    console.log({ inputValue, status })
      if ( inputValue.trim().length === 0) return; //Si es 0 hago el return, termino ahi no quiero entradas sin texto
      const actualizarEntry:Entrada = {
        /**Voy a crear una nueva entrada con los campos que modiifique, le hago un spread porque
         * no quiero cambiar el Id ni el createdAt, solo descripcion y status
         * Pongo que la description es lo que se escribe en el input y el status lo que se pone en el radio
         */
         ...entrada,
         description: inputValue,
         status : status
      }
      actualizarStatusEntrada( actualizarEntry ); //Mando esta entrada al backend
    }

  return (
     <Layout title={ inputValue.substring(0,20) + '...'}>
      <Grid
      container
      justifyContent='center'
      sx={{
        marginTop:2
      }}
      >
        <Grid item xs={ 12 } sm={ 8 } md={ 6 }> {/*Pantallas pequeñas 12 columnas(todo el ancho, se divide en 4) no tan pequeñas 8(2 columnas) y luego 6 (3 columnas)*/}
         <Card>
            <CardHeader
            title='Desde aquí podrás eliminar o editar tu entrada'
            subheader={`Creada hace ${getFormatDistanceToNow( entrada.createdAt )}`}
            />
            <CardContent>
                <TextField sx={{marginTop:2,marginBottom:1}} 
                fullWidth
                placeholder="Nueva entrada"
                autoFocus
                multiline
                label="Nueva entrada"
                onChange={ cambiandoInputTextField }
                value={ inputValue }
                onBlur={() => setTouched(true)}
                helperText ={inputValue.length <=0 && touched && 'Ingrese un valor'} //Solo aparecera si no hay nada escrito en el input y estan tocando el formulario
                error={ inputValue.length <=0 && touched }
                />
                {/**Radio */}
                <FormControl>
                    <FormLabel>Estado:</FormLabel>
                    <RadioGroup
                     row //Para ponerlos uno al lado del otro
                     value = { status } //El status que esta dentro de mi useState
                     onChange={ capturandoStatus } //Para saber que status se esta clickeando
                    >
                        {
                            statusValidos.map((status) => (
                                <FormControlLabel
                                 key={status}
                                 value={status}
                                 control={<Radio />}
                                 label={capitalize(status)}
                                  />
                            ))
                        }
                    </RadioGroup>
                </FormControl>
            </CardContent>
            <CardActions>
                <Button
                 startIcon={ <SaveAsOutlinedIcon />} 
                 variant="contained" 
                 fullWidth
                 onClick={ guardarTarea }
                 //Yo no quiero que aparezca si no hay nada escrito en el input, entonces si el lenght es menor 0 igual a 0 lo pongo en true
                 disabled={ inputValue.length <= 0 && true}
                 >
                   Guardar
                </Button>
            </CardActions>
         </Card>
        </Grid>
        
      </Grid>
      {/**El boton para borrar la tarea lo voy a ubicar abajo a la derecha de mi pantalla */}
      <IconButton sx={{
        position:'fixed',
        bottom:30,
        right:30,
        backgroundColor:'error.dark'
      }}>
        <DeleteOutlineOutlinedIcon 
         onClick = {() => borrarTarea( entrada._id )}
        />
      </IconButton>
     </Layout>
  )
};

/**Vamos a usar getServerSideProps, para que cuando alguien solicite esta pagina, va a venir 
 * precargada del lado del servidor --> Clave
 */
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    /**Aca estamos del lado del servidor, vamos a tratar de obtener el id que 
     * viene en la URL (esta en el context.params)
     */
    console.log(ctx.params)
    const { id } = ctx.params as { id:string }; //Desestructuro el id del ctx.params y le digo que va a ser string
    /**Ahora puedo preguntar si ese ID es un id valido de mongo, porque si no es valido, directamente 
     * no renderizo el componente y me ahorro mucho trabajo esto es muy UTIL
     */
    /**Yo en mi dbEntradas tengo la funcion getEntradaPorId que recibe el ID y con eso se encarga de conectarse a la base de datos 
     * y buscar una entrada con ese id que le mando
     * Y ESA FUNCION SE ENCARGA DE VERIFICAR QUE SEA UN ID VALIDO DE MONGO
    */
    const entrada = await getEntradaPorId(id);
    
    if ( !entrada ) {
        /**Si esto no es valido, directamente redirigo al usuario al inicio, y no cargara nada de mi componente
         * Solo lo cargara si el ID que me mandan por URL es un ID valido de mongo
         */
        return {
            redirect:{
                destination:'/',
                permanent:false
            }
        }
    }
    return {
        props: {
            entrada : entrada //Le mando la entrada al componente EntradaPage
        }
    }
}

export default EntradaPage
