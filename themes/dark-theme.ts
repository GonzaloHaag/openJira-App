import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const darkTheme = createTheme({
    palette:{
        mode:'dark',
          /**Ahora podemos definir los colores para usar en tipografias o 
           * lo que queramos, por ejemplo <Typography variant='h1' color='secondary'>Hola mundo</Typography> 
           * sera del color que defino en secondary
           */
          secondary:{
            main:'#19857b'
          },
          error:{
            main: red.A400
          },
          
    },
    /**Configuracion de componentes dentro de este theme
           * Si quiero modificar el componente AppBar lo debo llamar como
           * MuiAppBar --> El Mui adelante
           */
    components: {
        MuiAppBar : {
          defaultProps:{
            /*El elevation eliminar la sombra debajo, y no lo quiero en ningun componente, por lo tanto lo pongo en 0*/
             elevation:0
          },
          styleOverrides:{
            root: {
              /**Aca puedo modificar todo el css del componente, ahora tendre un background 
               * lila en el appBar
               */
              backgroundColor:'#4a148c'
            }
          }
        }
    }
})