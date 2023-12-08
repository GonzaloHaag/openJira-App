import { NextPage } from 'next'
import { Card, CardHeader, Grid } from '@mui/material';
import { Layout } from '@/components/layouts';
import { EntradasList, NuevaEntrada } from '@/components/Ui';

const HomePage:NextPage = () => {

  console.log(process.env.NEXT_PUBLIC_CLIENT_KEY); //Tiene el next public porque la necesito desde el front
  return (
    <Layout title='Home-OpenJira'>
      {/*Aqui lo que quiero que cambie de cada pagina, lo del layout 
      queda fijo*/}
       <Grid container spacing={ 2 }>
           <Grid item xs={ 12 } sm={ 4 }> {/*Que en pantallas muy pequeñas utilice 12 columnas(todo el ancho) es como en tailwind, medianas de 4 espacios*/}
              <Card sx={{
                /**Estilos para los componentes de materialUi */
                height:'calc(100vh - 180px)'
              }}>
                <CardHeader title='Pendientes' />
                  {/*AGREGAR UNA NUEVA ENTRADA*/}
                  <NuevaEntrada />
                  {/*Listado de las entradas*/}
                  <EntradasList status='pendiente' /> {/**Envio el status a EntradasList que solo puede recibir pendiente, progreso o completada */}
             
              </Card>
           </Grid>
           <Grid item xs={ 12 } sm={ 4 }> {/*Que en pantallas muy pequeñas utilice 12 columnas(todo el ancho) es como en tailwind, medianas de 4 espacios*/}
              <Card sx={{
                height:'calc(100vh - 180px)'
              }}>
                <CardHeader title='En progreso' />
                <EntradasList status='en-progreso' />
              </Card>
           </Grid>
           <Grid item xs={ 12 } sm={ 4 }> {/*Que en pantallas muy pequeñas utilice 12 columnas(todo el ancho) es como en tailwind, medianas de 4 espacios*/}
              <Card sx={{
                height:'calc(100vh - 180px)'
              }}>
                <CardHeader title='Completadas' />
                <EntradasList status='completada' />
              </Card>
           </Grid>
       </Grid>
    </Layout>
  
  )
}
export default HomePage;
