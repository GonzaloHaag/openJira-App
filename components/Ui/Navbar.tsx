import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useContext } from "react";
import { UiContext } from "@/context/Ui";
import Link from "next/link";

export const Navbar = () => {
  /**Voy a llamar a la funcion de abrir el sideBar del context para 
   * que al tocar el boton se abra el sideBar
   */
  const { openSideMenu } = useContext( UiContext )
  return (
    <AppBar position="sticky"> 
      <Toolbar>
        <IconButton size='large' edge='start' onClick={ openSideMenu }>
            <MenuOutlinedIcon />
        </IconButton>
        <Link href='/' style={{textDecoration:'none',color:'white'}}>
        <Typography variant="h6">OpenJira</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  )
}
