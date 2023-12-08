import {FC} from 'react';
import Head from 'next/head';
import { Box } from '@mui/material';
import { Navbar, SideBar } from '../Ui';

interface Props {
    title?:string;
    children?: JSX.Element | JSX.Element[]
}
export const Layout:FC<Props> = ({title='OpenJira-App',children}) => { //El FC<Props> es lo mismo que ({title}:Props)
    /**El valor del titulo si no me mandan nada sera OpenJira, y si me lo mandan 
     * sera el que me manden
     */
    return (
        <Box sx={{
            /**En componentes de mui material se utiliza sx, ya que icluye los estilos del tema, text.secondary y asi */
          flexGrow:1,
        }}>
            <Head>
                <title>{title}</title>
            </Head>
            <Navbar /> {/*Para que sea fijo en todas las paginas*/}
            {/*Sidebar, lo que se abrira al tocar el boton de menu*/}
            <SideBar />
            <Box sx={{
                padding:'10px 20px'
            }}>
                {/*Lo que cambiara de cada pagina*/}
                { children }
            </Box>
    
        </Box>
      )
}
