			/**Es la creacion del context, lo vamos a usar para poder 
 * abrir el sideBar desde el navbar, ya que son hermanos
 */
import { createContext } from 'react';
/**En typeScript, hay que indicar como va a lucir este contexto */
      export interface ContextProps {
            sideMenuOpen: boolean;
            openSideMenu: () => void; //Porque en el value del Provider estoy mandando esta funcion
            closeSideMenu: () => void; //Lo mismo aca
            isAddingEntry: boolean; //Estado para usar en el componente NuevaEntrada.tsx
            setIsAddingEntry: (isAddingEntry: boolean) => void;
            isDragging : boolean,
            startDragging: () => void; 
            endDragging: () => void; 
     }
export const UiContext = createContext({} as ContextProps);