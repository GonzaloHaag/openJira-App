import {
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import AllInboxOutlinedIcon from "@mui/icons-material/AllInboxOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import { useContext } from "react";
import { UiContext } from "@/context/Ui";

const menuItems: string[] = ["Inbox", "Starred", "Send Email", "Drafts"];
export const SideBar = () => {
    /**Luego de hacer el UiContext, provider y reducer, ya tengo el 
     * estado para que lo pueda usar donde quiera
     */
    const { sideMenuOpen,closeSideMenu } = useContext(UiContext); //Estado y funcion que necesito del context
    return (
        /**Esto es lo que se abrira cuando se toque el boton
         * de menu, sera de materialUI
         */
        <Drawer
            anchor="left" //Donde quiero que se abra
            open={ sideMenuOpen } //Si va a estar abierto o cerrado, false si esta cerrado true si esta abierto
            onClose={ closeSideMenu } //Funcion para cerrar el sideBar (se ejecuta al tocar cualquier otro lado q no sea el sidebar)
        >
            <Box sx={{ width: "250px" }}>
                <Box sx={{ padding: "5px 10px" }}>
                    <Typography variant="h4">Menú</Typography>
                    <List>
                        {menuItems.map((textItem, index) => (
                            <ListItem button key={textItem}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? (
                                        <AllInboxOutlinedIcon />
                                    ) : (
                                        <MailOutlineOutlinedIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={textItem} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Divider />
            </Box>
        </Drawer>
    );
};
