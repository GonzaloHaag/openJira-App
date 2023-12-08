import { Box, Button, TextField } from "@mui/material"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { ChangeEvent, useContext, useState } from "react";
import { EntradasContext } from "@/context/entradas";
import { UiContext } from "@/context/Ui";

/**Formulario para agregar una nueva entrada a la lista */
export const NuevaEntrada = () => {
  //Una vez que ya tengo mi contexto y toda la funcion para agregar una entrada, llamo esa funcion
  const { addEntry } = useContext(EntradasContext);
  const {isAddingEntry,setIsAddingEntry} = useContext(UiContext);//Para mostrar el formulario cuando se le haga click al boton de agregarTarea
  const [inputValue,setInputValue] = useState(''); //value del input, lo que se escribe alli para capturarlo
  const [touched,setTouched] = useState(false); //Para saber cuando se toca el formulario

  const capturarTareaEscrita = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue( event.target.value ); //Seteo lo escrito a mi variable
  }
  const guardarTarea = () => {
    if(inputValue.length === 0) return; //Si es 0 no hago nada, retorno ahi 
    // console.log({ inputValue })
    addEntry(inputValue); //Recordar que esta funcion recibe la descripcion de la tarea, por lo tanto le mando lo escrito en el input
    /**En este punto ya grabamos la entrada */
    setIsAddingEntry(false);
    setTouched(false);
    setInputValue(''); //Reseteo input

  }
  return (
    <Box sx={{marginBottom:2,paddingX:2}}>

      {
        isAddingEntry ? (
          <>
          <TextField fullWidth
      sx={{marginTop:2,marginBottom:1}} 
      placeholder="Nueva entrada"
      autoFocus
      multiline
      label='Nueva entrada'
      helperText= { inputValue.length <= 0 && touched && 'Ingrese un valor' }  //Texto de ayuda abajo del input
      error={ inputValue.length <= 0 && touched }  //si es true la caja se pone roja, pero no quiero que cuando recargo este roja, por lo tanto podemos usar el touched para saber si estan tocando el input
      value={ inputValue } //Esto siempre
      onChange={ capturarTareaEscrita }
      onBlur={() => setTouched(true)} //onBlur es cuando pierde el foco, cuando se deja de tocar
      />
     
    <Box display='flex' justifyContent='space-between'>
    <Button
     variant="text"
     onClick={() => setIsAddingEntry(false)} //False para cuando le den se muestre nuevamente el boton de agregar tarea
     >
      Cancelar
      </Button>
    <Button
     variant="outlined"
     color="secondary"
     endIcon={ <SaveOutlinedIcon />}
     onClick={ guardarTarea }
     >
      Guardar
      </Button>
      </Box>
      </>
        )
        :
        (
          <Button
     /**Boton para que cuando 
     * se le haga click aparezca el formulario para 
     * agregar una nueva entrada
     */
    startIcon = {<AddCircleOutlinedIcon/>}
    fullWidth
    variant="outlined"
    onClick={() => setIsAddingEntry(true)}
    >
     Agregar tarea
    </Button>
        )
      }
  
    </Box>
  )
}
