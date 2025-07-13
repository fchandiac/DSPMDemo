'use client';

import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Box, 
  Menu, 
  MenuItem, 
  Button,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  AccountCircle, 
  Dashboard, 
  Settings, 
  People,
  Receipt,
  ExitToApp
} from '@mui/icons-material';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };
  
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  // Enlaces del menú según el rol
  const getMenuItems = () => {
    const role = session?.user?.role || 'guest';
    
    const commonItems = [
      { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    ];
    
    const adminItems = [
      { text: 'Administración', icon: <Settings />, path: '/admin' },
      { text: 'Usuarios', icon: <People />, path: '/admin/users' },
    ];
    
    const operatorItems = [
      { text: 'Operaciones', icon: <Receipt />, path: '/operator' },
    ];
    
    const userItems = [
      { text: 'Mi Cuenta', icon: <AccountCircle />, path: '/user' },
    ];
    
    let items = [...commonItems];
    
    if (role === 'admin') items = [...items, ...adminItems, ...operatorItems];
    if (role === 'operator') items = [...items, ...operatorItems];
    if (role === 'user') items = [...items, ...userItems];
    
    return items;
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            NextJS MUI Auth Starter
          </Typography>
          
          {session?.user ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ mr: 2 }}>
                {session.user.email}
              </Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                  {session.user.email?.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Perfil</MenuItem>
                <MenuItem onClick={handleSignOut}>Cerrar Sesión</MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button color="inherit" onClick={() => router.push('/')}>
              Iniciar Sesión
            </Button>
          )}
        </Toolbar>
      </AppBar>
      
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="h6">
              Menú
            </Typography>
            {session?.user && (
              <Typography variant="body2">
                Rol: {session.user.role}
              </Typography>
            )}
          </Box>
          <Divider />
          <List>
            {getMenuItems().map((item) => (
              <ListItem 
                key={item.text} 
                component={Link} 
                href={item.path}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
            <Divider />
            {session?.user && (
              <ListItem onClick={handleSignOut} sx={{ cursor: 'pointer' }}>
                <ListItemIcon><ExitToApp /></ListItemIcon>
                <ListItemText primary="Cerrar Sesión" />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
