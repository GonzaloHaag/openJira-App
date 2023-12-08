/**Es una funcion pura, y debe resolver todo lo que reciba
 * Recibe un estado y una accion y se encarga de devolver un nuevo estado
 */


type UiActionType =
/**Yo quiero que el action.type luzca de tal forma que 
 * pueda entender que una accion es para abrir el sideBar y 
 * otra es para cerrar el sideBar
 * De esta forma, en el switch con action.type yo solo podre poner los casos 
 * en donde me pasan estas dos acciones, no me aceptara otra cosa
 * Y en el reducer debo decir que la action va a tener este tipo
 */ 
| { type:'Ui - Open Side Bar' }
| { type:'Ui - Close Side Bar' }
| { type:'Ui - SetIsAddingEntry',payload:boolean}
| { type:'Ui - StartDragging'} //Cuando se comienza a hacer drag a la tarea quiero poner el estado isDragging en true
| { type:'Ui - EndDragging'} //Cuando termina el drag quiero poner el estado isDragging en false
import { UIState } from ".";
/**Vamos a recibir el estado de tipo UIState(boolean) y la accion */
export const UiReducer = ( state : UIState,action:UiActionType):UIState => {
  switch(action.type) {
     case 'Ui - Open Side Bar':
        /**En este caso yo quiero abrir el sideBar, por lo que 
         * debo establecer el sideMenuOpen en true.
         * Debo hacer un spread al estado y luego cambiarle la propiedad 
         * a true
         */
        return{
            ...state,
            sideMenuOpen:true
        }

    case 'Ui - Close Side Bar':
        /**En este caso debo cerrar el menu, por lo que cambio el 
         * sideMenuOpen a false
         */
        return{
            ...state,
            sideMenuOpen:false
        }
    case 'Ui - SetIsAddingEntry' :
        /**Recibo el valor booleano como payload */
        return {
            ...state,
            isAddingEntry : action.payload //va a tener el valor que me pasen en el payload
        } 

    case 'Ui - StartDragging':
        //Cuando se comienza a hacer drag a la tarea quiero poner el estado isDragging en true
        return {
            ...state,
            isDragging : true
        }

    case 'Ui - EndDragging' :
        return {
           ...state,
           isDragging : false
        }

  
    default: return state; /**ESTO VA SIEMPRE, NO OLVIDAR. LA FUNCION DEVUELVE UN UIState por esto */
  }
}
