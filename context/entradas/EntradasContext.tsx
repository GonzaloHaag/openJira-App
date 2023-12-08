import { Entrada } from '@/interfaces';
import { createContext } from 'react';

interface ContextProps {
    //Como va a lucir este context
    /**Voy a tener un arreglo de entradas de tipo Entrada, ya que cada una de las 
     * tareas tendra un id description y todo lo que esta en la interface de Entrada
     * Aca debo poner todo lo que mando en el value del provider
     */
    entradas : Entrada[]; 
    addEntry: (description: string) => void;
    actualizarStatusEntrada: (entrada: Entrada) => void;
    // borrarTarea: (id: string) => Promise<void>
}
export const EntradasContext = createContext({} as ContextProps); //Debo decirle que va a proveer el provider, como luce ese contexto