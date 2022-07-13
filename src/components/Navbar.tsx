import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ViewListIcon from '@mui/icons-material/ViewList';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AddBoxIcon from '@mui/icons-material/AddBox';

export const Navbar = () => {

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const navigate = useNavigate();

    return (
        <AppBar className='app-bar'>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <HomeWorkIcon 
                        onClick={() => navigate('/')} 
                        className='navbar-icon' 
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            marginLeft: "10px"
                        }}
                    >
                        BEOCAPRA
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            key={"products"}
                            // onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            onClick={handleOpenUserMenu} 
                        >
                            Products
                        </Button>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            >
                                <MenuItem key={"View all products"} onClick={() => {
                                    handleCloseUserMenu();
                                    navigate('/products');
                                }}>
                                    <ViewListIcon/>
                                    <Typography 
                                        textAlign="center"
                                        sx={{marginLeft: "5px"}}
                                    >
                                        View all products
                                    </Typography>
                                </MenuItem>
                                <MenuItem key={"View all products"} onClick={handleCloseUserMenu}>
                                    <ManageSearchIcon />
                                    <Typography 
                                        textAlign="center"
                                        sx={{marginLeft: "5px"}}
                                    >
                                        Search products
                                    </Typography>
                                </MenuItem>
                                <MenuItem key={"View all products"} onClick={handleCloseUserMenu}>
                                    <AddBoxIcon />
                                    <Typography 
                                        textAlign="center"
                                        sx={{marginLeft: "5px"}}
                                    >
                                        Add new product
                                    </Typography>
                                </MenuItem>
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton sx={{ p: 0 }}>
                            <AccountCircleIcon htmlColor='white'/>
                        </IconButton>
                        <span style={{marginLeft: "5px"}}>Username</span>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )

}