import { UiContext } from "@/context/Ui";
import { Entrada } from "@/interfaces";
import { getFormatDistanceToNow } from "@/utils/dateFunctions";
import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { FC,DragEvent, useContext } from "react";

/**Yo aqui necesito recibir la entrada desde el EntryList, por lo 
 * que debo crearme una interface para saber como va a lucir
 */

interface Props {
    entrada:Entrada; //Va a tener un id,description y lo que esta en esa interface, la entrada sera de ese tipo
}

export const EntradaCard:FC<Props> = ( { entrada }) => {
    const router  = useRouter();
    /**Luego de crear funciones y tipos en mi context puedo hacer uso de lo que quiera */
    const { startDragging,endDragging } = useContext(UiContext);
    /**Debo saber a que tarea le estoy haciendo drag(arrastrando) */
    const onDragStart = ( event:DragEvent<HTMLDivElement>) => {
       //Cuando comienzao a arrastrar la tarea
       event.dataTransfer.setData('text',entrada._id); //Esto nos permite darle al valor de text el id de la entrada que se arrastra
       /**Modificar el estado para indicar que 
        * estoy haciendo drag
        */
       startDragging();
    }
    const onDragEnd = () => {
        /**Cancelar el onDrag */
        endDragging();
    }
    //Funcion para que me lleve al detalle de la tarea
    const onClickedTarea = () => {
     router.push(`entradas/${ entrada._id }`); //Lo pusheo a la routa con el ID de la tarea que se clickea, y al ser un ID valido de mongo, podre ver el detalle(porque ya esta en base de datos)
    }
    return (
    <Card
     onClick= { onClickedTarea }
     sx={{marginBottom: 1}}
     draggable //Para poder arrastrar la tarea
     onDragStart = { onDragStart }
     onDragEnd = { onDragEnd }
     >
        <CardActionArea>
            <CardContent>
                 <Typography sx={{whiteSpace:'pre-line'}}>{ entrada.description }</Typography>
            </CardContent>
            <CardActions sx={{display:'flex',justifyContent:'flex-end',paddingRight:2}}>
                <Typography variant="body2">Creada hace {getFormatDistanceToNow( entrada.createdAt )}</Typography>
            </CardActions>
        </CardActionArea>

    </Card>
 )
}
