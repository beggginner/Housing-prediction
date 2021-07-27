import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import HouseIcon from '@material-ui/icons/House';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InfoIcon from '@material-ui/icons/Info';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, ThemeProvider, useTheme } from '@material-ui/core/styles';
import CropIcon from '@material-ui/icons/Crop';
import { useHistory } from 'react-router-dom'
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';
import fire from '../fire'

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    btn: {
        width: 100,
        position: 'absolute',
        right: 5
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    title: {
        padding: theme.spacing(2),
    },
    menuButton: {
        width:'10px',
        marginRight: theme.spacing(2),
        marginLeft:theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        marginTop: theme.spacing(8)
        // color: "#fff"
    },
    mainHeading: {
        padding: theme.spacing(2),
        flexGrow: 1
    }
}));

function ResponsiveDrawer({ children }) {
    function handleLogOut() {
        fire.auth().signOut();
    }
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const history = useHistory()
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    let theme1 = createMuiTheme();
    theme1 = responsiveFontSizes(theme1);
    const drawer = (
        <div>
            <div className={classes.toolbar}>
                <ThemeProvider theme={theme1}>
                    <Typography variant="h5" color="primary" className={classes.title}>
                        Bengaluru Properties
                </Typography>
                </ThemeProvider>
                <Divider />
            </div>
            <List>
                <ListItem button onClick={() => history.push('/HomeSweetHomeClient')}>
                    <ListItemIcon><HouseIcon color="secondary" /></ListItemIcon>
                    <ListItemText primary='For Sale' />
                </ListItem>
            </List>
            <List>
                <ListItem button onClick={() => history.push('/HomeSweetHomeClient/predict')}>
                    <ListItemIcon><CropIcon color="secondary" /></ListItemIcon>
                    <ListItemText primary='Predict Price' />
                </ListItem>
            </List>
            <List>
                <ListItem button onClick={() => history.push('/HomeSweetHomeClient/sell')}>
                    <ListItemIcon><AddCircleOutlineIcon color="secondary" /></ListItemIcon>
                    <ListItemText primary='Sell' />
                </ListItem>
            </List>
            <List>
                <ListItem button onClick={() => history.push('/HomeSweetHomeClient/about')}>
                    <ListItemIcon><InfoIcon color="secondary" /></ListItemIcon>
                    <ListItemText primary='About Us' />
                </ListItem>
            </List>
        </div>
    );

    return (
        <div className={`hero ${classes.root}`}>
            <CssBaseline />
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                {/* <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton> */}
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <ThemeProvider theme={theme1}>
                        <Typography variant="h4" noWrap   >
                            HOMEPROS
                        </Typography>
                    </ThemeProvider>
                    <Button color="inherit" onClick={handleLogOut} className={classes.btn}>Logout</Button>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}

            </main>
        </div>
    );
}


export default ResponsiveDrawer;
