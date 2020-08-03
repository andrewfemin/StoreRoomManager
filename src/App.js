import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Fab from '@material-ui/core/Fab';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import FormatListBulletedRoundedIcon from '@material-ui/icons/FormatListBulletedRounded';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import LocalMallRoundedIcon from '@material-ui/icons/LocalMallRounded';
import StoreRoundedIcon from '@material-ui/icons/StoreRounded';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import { Store, set, get } from 'idb-keyval';

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: pink,
  },
  props: {
    MuiButtonBase: {
      disableRipple: false,
    }
  }
});

const drawerWidth = 240;

const useStyles = makeStyles({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    elevation: 3,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  BodyContent: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  BodyContentShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  addItemIcon: {
    paddingTop: '5px',
  },
  addItemButton: {
    fontSize: '13px',
    verticalAlign: 'center',
    textTransform: 'capitalize',
    borderRadius: '0px',
  },
  itemAddRemoveIcon: {
    height: '30px',
    width: '30px',
  },
  fab: {
    margin: 0,
    top: 'auto',
    left: 'auto',
    bottom: 20,
    right: 20,
    position: 'fixed',
  }
});

function createItem(item_name, unit, quantity_remaining, low_quantity_threshold, store) {
  return { item_name, unit, quantity_remaining, low_quantity_threshold, store };
}

export default function AppShell() {
  return (<HomePage />);
}

function HomePage() {
  const [isMenuBarShown, setIsMenuBarShown] = useState(false);
  const classes = useStyles();
  const [pageContent, setPageContent] = useState("Stock");
  const [items, setItems] = useState([]);
  const [isAddItemDialogOpen, setAddItemDialogStatus] = useState(false);
  const handleDialogClose = () => {
    setAddItemDialogStatus(false);
  };
  get("items").then((val) =>
    setItems(val == undefined ? [] : val)
  );

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" className={clsx(classes.appBar, {
        [classes.appBarShift]: isMenuBarShown,
      })}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => { setIsMenuBarShown(isMenuBarShown ? false : true) }} style={isMenuBarShown ? { display: 'none' } : {}}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">Store Room Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="persistent" anchor="left" open={isMenuBarShown} className={classes.drawer} classes={{ paper: classes.drawerPaper }}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={() => { setIsMenuBarShown(isMenuBarShown ? false : true) }}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key="Stock" onClick={() => { setPageContent("Stock") }}>
            <ListItemIcon>
              <LocalMallRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Stock" />
          </ListItem>
          <ListItem button key="Items" onClick={() => { setPageContent("Items") }}>
            <ListItemIcon>
              <FormatListBulletedRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Items" />
          </ListItem>
          <ListItem button key="Stores" onClick={() => { setPageContent("Stores") }}>
            <ListItemIcon>
              <StoreRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Stores" />
          </ListItem>
          <ListItem button key="Shopping Cart" onClick={() => { setPageContent("ShoppingCart") }}>
            <ListItemIcon>
              <ShoppingCartRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Shopping Cart" />
          </ListItem>
        </List>
      </Drawer>
      <div className={clsx(classes.BodyContent, { [classes.BodyContentShift]: isMenuBarShown, })}>
        <PageContent page={pageContent} isMenuBarShown={isMenuBarShown} items={items} />
      </div>
      <Fab color="secondary" className={classes.fab} variant="extended" onClick={() => { setAddItemDialogStatus(true) }}>
        <AddIcon />&nbsp;Add Item
      </Fab>
      <AddItemDialog open={isAddItemDialogOpen} onClose={handleDialogClose} />
    </ThemeProvider>
  );
}

function PageContent(props) {
  if (props.page == "Stock") {
    return <StockPage isMenuBarShown={props.isMenuBarShown} items={props.items} />;
  } else if (props.page == "Items") {
    return <ItemsPage isMenuBarShown={props.isMenuBarShown} />
  } else if (props.page == "Stores") {
    return <StoresPage isMenuBarShown={props.isMenuBarShown} />
  } else if (props.page == "ShoppingCart") {
    return <ShoppingCartPage isMenuBarShown={props.isMenuBarShown} />
  }
}

function StockPage(props) {
  document.title = 'Store Room Manager';
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        In Stock
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align="right">Quantity Remaining</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.items.map((item) => (
            <TableRow key={item.item_name}>
              <TableCell>{item.item_name}</TableCell>
              <TableCell align="right">
                <IconButton size="small" className={classes.itemAddRemoveIcon}>+</IconButton>
                {item.quantity_remaining}&nbsp;{item.unit}
                <IconButton size="small" className={classes.itemAddRemoveIcon}>-</IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

function AddItemDialog(props) {
  const [itemName, setItemName] = useState('');
  const [unit, setUnit] = useState('');
  const [quantityInHand, setQuantityInHand] = useState(0);
  const [quantityLowThreshold, setQuantityLowThreshold] = useState(1);
  const [store, setStore] = useState('');
  const [isItemNameEmpty, setIsItemNameEmpty] = useState(false);
  const handleItemNameChange = (event) => {
    setItemName(event.target.value);
  };
  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };
  const handleQuantityInHand = (event) => {
    setQuantityInHand(event.target.value);
  };
  const handleQuantityLowThreshold = (event) => {
    setQuantityLowThreshold(event.target.value);
  };
  const handleStoreChange = (event) => {
    setStore(event.target.value);
  };
  const handleDialogClose = () => {
    props.onClose();
    setItemName('');
    setUnit('');
    setQuantityInHand(0);
    setQuantityLowThreshold(1);
    setStore('');
    setIsItemNameEmpty(false);
  };
  const createItemSubmit = () => {
    if (itemName.trim() === "") {
      setIsItemNameEmpty(true);
    } else {
      props.onClose()
      get("items").then((val) => {
        if ((val == undefined) || (val.length == 0)) {
          set("items", [
            createItem(itemName, unit, quantityInHand, quantityLowThreshold, store),
          ]);
        } else {
          const itemsArray = val.slice();
          itemsArray.push(createItem(itemName, unit, quantityInHand, quantityLowThreshold, store));
          set("items",itemsArray);
        }
      });
      setItemName('');
      setUnit('');
      setQuantityInHand(0);
      setQuantityLowThreshold(1);
      setStore('');
      setIsItemNameEmpty(false);
    }
  };
  return (
    <Dialog open={props.open} onClose={handleDialogClose}>
      <DialogTitle>Add Item</DialogTitle>
      <DialogContent>
        <TextField label="Item Name" required onChange={handleItemNameChange} variant="filled" name="item_name" error={isItemNameEmpty} />
        <TextField label="Quantity In Hand" type="number" onChange={handleQuantityInHand} variant="filled" />
        <TextField label="Unit" onChange={handleUnitChange} variant="filled" />
        <TextField label="Low Quantity Threshold" type="number" onChange={handleQuantityLowThreshold} variant="filled" />
        <TextField label="Store" onChange={handleStoreChange} variant="filled" />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={createItemSubmit}>Submit</Button>
        <Button color="primary" onClick={handleDialogClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

function ItemsPage() {
  document.title = 'Items';
  return (
    <Card>
      <CardContent>ItemsPage under construction</CardContent>
    </Card>
  );
}

function StoresPage() {
  return (
    <Card>
      <CardContent>StoresPage under construction</CardContent>
    </Card>
  );
}

function ShoppingCartPage() {
  return (
    <Card>
      <CardContent>ShoppingCartPage under construction</CardContent>
    </Card>
  );
}