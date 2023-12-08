import { List, Paper } from "@mui/material"
import { EntradaCard } from "."
import { EntradaStatus } from "@/interfaces";
import { FC, useContext, useMemo,DragEvent } from "react";
import { EntradasContext } from "@/context/entradas";
import { UiContext } from "@/context/Ui";
import styles from './EntradaList.module.css';

/**Este componente es una lista de cada EntradaCard */

/**Yo quiero mandarle una propiedad al componente EntradaList para 
 * que muestre las entradas segun en el status(pendiente, completada o
 * en progreso) que corresponda
 */
interface Props {
  status: EntradaStatus; //El status sera de este tipo (pendiente, en progreso o completada)
}
export const EntradasList:FC<Props> = ({ status }) => {
  /**Recibo el status correspondiente que me mandan desde 
   * el page/index.tsx y ahora puedo realizar el filtrado con 
   * el array de tareas del contexto
   */
  console.log({status});
  const { entradas,actualizarStatusEntrada } = useContext(EntradasContext);
  const { isDragging,endDragging } = useContext(UiContext); //El isDragging es true si una tarea se esta arrastrando, con esto modifico el estilo de la lista poniendole menos opacidad o lo que quiera
   /**Creo un nuevo array en las cuales la entrada.status coincida 
    * con el status que me mandan por props
    *const filtradoEntradasPorStatus = entradas.filter((entrada) => entrada.status === status);
    Pero yo necesito hacer este filter cada vez que el array de 
    entradas cambie, por lo que podemos utilizar un useMemo
    */
   /**El useMemoa recibe la funcion que quiero realizar y el arreglo de dependencia, en 
    * este caso colocamos entradas porque quiero realizar ese filter cada vez que 
    * el array de entradas cambie
    */
   const filtradoEntradasPorStatus = useMemo(() => entradas.filter((entrada) => entrada.status === status) , [ entradas ]);


   const allowDrop = (event:DragEvent<HTMLDivElement>) => {
    /**Clave esto para dejar caer la tarea en el div */
      event.preventDefault();
   }
   const onDropEntry = (event:DragEvent<HTMLDivElement>) => {
      /**En el onDragStart de la card seteamos la data 'text' a la 
       * cual le asignamos el id de la entrada
       * Por lo tanto debemos capturarlo haciendole un 
       * getData a esa clave 'text', asi accedemos al id de la tarea
       * CLAVE
       */
      const id = event.dataTransfer.getData('text');
      // console.log({id}) aqui ya tengo el id de la tarea que se arrastra
      /**Voy a buscar en mi arreglo de entradas una entrada que coincida con este id
       * Con el find voy a encontrar todas las entradas que coincidan
       * 
       */
      const entry = entradas.find((entrada) => entrada._id === id)!;
      //El status que recibe este componente es el que debo cambiarle a esta entrada, para que cuando caiga en esa lista se actualize el estado de la tarea
      entry.status = status;
      /**Ahora ya puedo mandarle esta entrada a la funcion del context que la recibe
       */
      actualizarStatusEntrada(entry);
      endDragging(); //Para decirle que ya terminamos el drop
      
   }
  return (
    //Todo:Aqui haremos drop
    /**Yo cada tarea la dejare caer en este EntryList cuando se hace drag and drop, drop es cuando cae aqui */
      <div
      onDrop={ onDropEntry }
      //Para que permitamos dejar caer algo en este div debemos indicar lo siguiente
      onDragOver={ allowDrop }
      className= { isDragging ? styles.dragging : ''} //Si estoy haciendo drag le agrego una clase
      >
       <Paper sx={{
        height:'calc( 100vh - 250px )',
        overflow:'scroll',
        backgroundColor:'transparent',
        padding: '1px 5px'
        }}>
            {/**Cambiara dependiendo si estoy haciendo drag o no */}
            <List sx={{
              opacity: isDragging ? 0.2 : 1,
              transition: 'all .3s' //Para no hacer tan bruto el cambio de opacidad
              }}>
              {
                  filtradoEntradasPorStatus.map((entrada) => (
                    <EntradaCard key={entrada._id} entrada = { entrada } />
                  ))
              }
                
            </List>
        
       </Paper>
      </div>    
  )
}
