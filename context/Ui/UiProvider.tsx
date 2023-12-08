/**El provider es el proveedor de la informacion del context, vamos a definir 
 * como va a lucir el estado de la App
 */
import {FC, useReducer} from 'react';
import { UiContext, UiReducer } from '.';
interface UiProviderProps {
    children?:JSX.Element | JSX.Element[]
}
export interface UIState {
    sideMenuOpen : boolean;
    isAddingEntry : boolean;
    isDragging : boolean;
}

const UI_INITIAL_STATE:UIState =  {
     /**Esto sera el estado inicial del side menu open, que va a manejar 
      * si se debe abrir el sidebar o no. True abierto, false cerrado
      * Arrancara en false para que este cerrado
      */
     sideMenuOpen:false, //va a arrancar como false
     isAddingEntry:false, //va a arrancar como false
     isDragging : false //Estado inicial en false
}

export const UiProvider:FC<UiProviderProps> = ({ children }) => {
    /**El reducer recibe 2 parametros
     * El primer parametro es el reducer que se encargara 
     * de decidir que accion realizar segun lo que corresponda.
     * Y el segundo parametro es el estado Inicial que queremos, en este caso
     * sera false
     */
    const [state, dispatch] = useReducer( UiReducer , UI_INITIAL_STATE );

    /**Ahora debo crearme una funcion que dispare la accion 
     * que defini en el reducer, y estas acciones se 
     * encargaran de hacer lo que le diga
     * Lo mismo con la funcion para cerrar el sideBar,
     * debe disparar el tipo de accion que quiero ejecutar
     */
    const openSideMenu = () => {
        dispatch({ type:'Ui - Open Side Bar' })
    }
    const closeSideMenu = () => {
        dispatch({ type:'Ui - Close Side Bar' })
    }
    /**Funcion para cambiar el valor del isAddingEntry */
    const setIsAddingEntry = ( isAddingEntry:boolean) => {
        /**Le mando como payload el valor que me mandan por 
         * parametro en mi funcion
         */
        dispatch( { type:'Ui - SetIsAddingEntry',payload:isAddingEntry })
    }
    
    const startDragging = () => {
        /**Funcion para disparar el type action cuando se comienza a hacer drag */
        dispatch( { type:'Ui - StartDragging' })
    }
    const endDragging = () => {
        /**Funcion para disparar el type action cuando finaliza el drag */
        dispatch( { type:'Ui - EndDragging' })
    }
  return (
    <UiContext.Provider value={{
        /**Lo que esta aca es lo que va a poder ser 
         * proveido a otros componentes para que lo utilicen los children
         */
        /**Yo al estado de true o false debo decirle que se esta cambiando su 
         * propiedad y que debe redibujarse
         * Por lo tanto si hago un spread del state, cuando se 
         * cambie la propiedad a true o false, este hara la accion 
         * deseada en el reducer
         */
        ...state,
        //Funciones
        openSideMenu, //Para que la pueda utilizar cualquier children
        closeSideMenu,
        setIsAddingEntry,
        startDragging,
        endDragging

    }}>
        { children }

    </UiContext.Provider>
  )
}

