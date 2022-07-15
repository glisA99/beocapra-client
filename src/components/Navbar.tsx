import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ViewListIcon from '@mui/icons-material/ViewList';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { AppContext } from './withAppContext';

export const Navbar = () => {

    const [anchorElProduct, setAnchorElProduct] = React.useState<null | HTMLElement>(null);
    const [acnhorElReceipt, setAnchorElReceipt] = React.useState<null | HTMLElement>(null);

    const appContext = React.useContext(AppContext);

    const handleOpenProductMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElProduct(event.currentTarget);
    };

    const handleOpenReceiptMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElReceipt(event.currentTarget);
    };

    const handleCloseReceiptMenu = () => {
        setAnchorElReceipt(null);
    };

    const handleCloseProductMenu = () => {
        setAnchorElProduct(null);
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
                            onClick={handleOpenProductMenu} 
                        >
                            Products
                        </Button>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElProduct}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElProduct)}
                            onClose={handleCloseProductMenu}
                            >
                                <MenuItem key={"View all products"} onClick={() => {
                                    handleCloseProductMenu();
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
                                <MenuItem key={"Search products"} onClick={() => {
                                    handleCloseProductMenu();
                                    navigate("/products/search");
                                }}>
                                    <ManageSearchIcon />
                                    <Typography 
                                        textAlign="center"
                                        sx={{marginLeft: "5px"}}
                                    >
                                        Search products
                                    </Typography>
                                </MenuItem>
                                <MenuItem key={"Add new product"} onClick={handleCloseProductMenu}>
                                    <AddBoxIcon />
                                    <Typography 
                                        textAlign="center"
                                        sx={{marginLeft: "5px"}}
                                    >
                                        Add new product
                                    </Typography>
                                </MenuItem>
                        </Menu>

                        <Button
                            key={"receipt"}
                            // onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            onClick={handleOpenReceiptMenu} 
                        >
                            Receipt
                        </Button>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={acnhorElReceipt}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(acnhorElReceipt)}
                            onClose={handleCloseReceiptMenu}
                            >
                                <MenuItem key={"View all receipts"} onClick={() => {
                                    handleCloseReceiptMenu();
                                }}>
                                    <ViewListIcon/>
                                    <Typography 
                                        textAlign="center"
                                        sx={{marginLeft: "5px"}}
                                    >
                                        View all receipts
                                    </Typography>
                                </MenuItem>
                                <MenuItem key={"Search receipts"} onClick={() => {
                                    handleCloseReceiptMenu();
                                }}>
                                    <ManageSearchIcon />
                                    <Typography 
                                        textAlign="center"
                                        sx={{marginLeft: "5px"}}
                                    >
                                        Search receipts
                                    </Typography>
                                </MenuItem>
                                <MenuItem key={"Create new receipt"} onClick={() => {
                                    handleCloseReceiptMenu();
                                    navigate("/receipt/create");
                                }}>
                                    <AddBoxIcon />
                                    <Typography 
                                        textAlign="center"
                                        sx={{marginLeft: "5px"}}
                                    >
                                        Create new receipt
                                    </Typography>
                                </MenuItem>
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton sx={{ p: 0 }}>
                            <AccountCircleIcon htmlColor='white'/>
                        </IconButton>
                        <span style={{marginLeft: "5px"}}>{appContext.user?.username}</span>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )

}