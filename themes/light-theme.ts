import { createTheme } from "@mui/material";
import { grey, red } from "@mui/material/colors";

/**Tema light */

export const lightTheme = createTheme({
    palette: {
      mode:'light',
      background:{
        /**Aca podemos elegir el background del color que queramos */
        default:grey[300]
      },
      /**Ahora podemos definir los colores para usar en tipografias o 
       * lo que queramos, por ejemplo <Typography variant='h1' color='primary'>Hola mundo</Typography> 
       * sera del color que defino en primary
       */
      primary:{
        main:'#4a148c'
      },
      secondary:{
        main:'#19857b'
      },
      error:{
        main: red.A400
      },
    },
    components:{
      MuiAppBar:{
        defaultProps:{
          /**Para modificar una propiedad que ya trae el componente es aqui, en este caso
           * la elevacion la quiero poner en 0 (sacar sombra), si quiero mi css
           * personalizado debo usar styleOverrides:{}
           */
          elevation:0
        }
      }
    }
  
  });