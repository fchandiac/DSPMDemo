"use client";

import React from "react";
import {
  Drawer,
  Box,
  Typography,
  MenuItem,
  List,
  Divider
} from "@mui/material";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";

interface PanicSideBarProps {
  open: boolean;
  toggleDrawer: (open: boolean) => void;
}


const PanicSideBar: React.FC<PanicSideBarProps> = ({ open, toggleDrawer }) => {
  const router = useRouter();

  const handleLogout = async () => {
    toggleDrawer(false);
    await signOut({ callbackUrl: "/" });
  };

  return (
    <Drawer anchor="left" open={open} onClose={() => toggleDrawer(false)}>
      <Box sx={{ width: 250, padding: 2, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            <Image 
              src="/logo.svg" 
              alt="Logo DSPM" 
              width={80} 
              height={80} 
              priority 
            />
            <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: 700 }}>
              Botón de Pánico
            </Typography>
          </Box>
          <List>
            <MenuItem
              onClick={() => {
                router.push("/panicButton/alerta");
                toggleDrawer(false);
              }}
            >
              Alerta
            </MenuItem>
            <MenuItem
              onClick={() => {
                router.push("/panicButton/reports");
                toggleDrawer(false);
              }}
            >
              Report
            </MenuItem>
            <MenuItem
              onClick={() => {
                router.push("/panicButton/cuenta");
                toggleDrawer(false);
              }}
            >
              Mi cuenta
            </MenuItem>
          </List>
        </div>
        <div>
          <Divider sx={{ my: 1 }} />
          <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
        </div>
      </Box>
    </Drawer>
  );
};

export default PanicSideBar;
