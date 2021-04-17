import React, { useState } from 'react';
import './style.css';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import orderBy from "lodash/orderBy";
import TablePagination from "@material-ui/core/TablePagination";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import SearchBar from "material-ui-search-bar";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
const useStyles = makeStyles((theme)=>({
  table: {
    minWidth: 650,
  },selectDropdown: { color: "#fff", backgroundColor: "#1b1f38" },
  menuItem: {
    "&:hover": {
      backgroundColor: "#3b3f58"
    },formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
  }
  
}));


function createData(ID, name,title,date,status,Depart) {
  return { ID, name,title,date,status,Depart};
}

const data = [
  createData(1,'Prathamesh','Repair','2021/02/03','Pending...','CSE'),
  createData(2,'Rahul','Repair', '2021/05/06','Pending...','CSE'),
  createData(3,'Prathamesh','Repair','2021/01/01', 'Pending...','CSE'),
  createData(4,'Rahul','Repair','2021/02/03', 'Pending...','CSE'),
  createData(5,'Prathamesh','Repair','2021/05/01', 'Pending...','CSE'),
  createData(6,'Rahul','Repair','2021/02/03', 'Pending...','CSE'),
  createData(7,'Prathamesh','Repair','2021/02/03', 'Pending...','CSE'),
  createData(8,'Rahul','Repair','2021/02/03', 'Pending...','CSE'),
  createData(9,'Prathamesh','Repair','2021/05/12', 'Pending...','CSE'),
  createData(10,'Rahul','Repair','2021/05/13', 'Pending...','CSE'),
  createData(11,'Narahari','Pipe','2021/02/03','Pending','TYCSE'),
  createData(12,'Ashok','Light','2021/02/03','Pending','IT'),
  createData(13,'Narahari','Pipe','2021/02/03','Pending','TYCSE'),
  createData(14,'Narahari','Electrical','2021/02/03','Approved(HoD)','TYECE'),
 
];

export default function TableD() {
  const classes = useStyles();

  const [page,setPage]=useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [columnTosort,setColumn]=useState('ID');
  const [direction,setDirection]=useState('asc');
  const [rows,setRow]=useState(data);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
const handleSort = columnName => {
        console.log(columnName);
         if(columnTosort===columnName){
              if(direction==='asc'){
                   setDirection('desc');
                   setRow(orderBy(rows,columnTosort,direction));
                   console.log(rows);
              }else{
                  setDirection('asc');
                  setColumn(columnName);
                  setRow(orderBy(rows,columnTosort,direction));
                  console.log(rows);
              }
         }else{
            setColumn(columnName);
            setDirection('asc');
            setRow(orderBy(rows,columnTosort,direction));
            console.log(rows);
        }
 };
 const [dropID,setDropID]=useState('')
 const handleSortDrop = (event) => {
    setDropID(event.target.value);
    console.log(event.target.value);
    const columnName=event.target.value;
    if(columnTosort===columnName){
        if(direction==='asc'){
             setDirection('desc');
             setRow(orderBy(rows,columnTosort,direction));
             console.log(rows);
        }else{
            setDirection('asc');
            setColumn(columnName);
            setRow(orderBy(rows,columnTosort,direction));
            console.log(rows);
        }
   }else{
      setColumn(columnName);
      setDirection('asc');
      setRow(orderBy(rows,columnTosort,direction));
      console.log(rows);
    }
    setDropID('')
  };
 //Search
const [query,setQuery]=useState('');
const [columnToQuery,setQueryColumn]=useState('');

const handleQuery=(event)=>{
    setQuery(event.target.value);
}
const handlecolumnToQuery=(event)=>{
    setQueryColumn(event.target.value);
    const lowerCaseQuery = query.toLowerCase();
    const tmp=query? rows.filter(x =>x.columnToQuery.toLowerCase().includes(lowerCaseQuery)):data;
    setRow(orderBy(tmp,columnTosort,direction))
    console.log(rows);
}
const [searched, setSearched] = useState('');
const requestSearch = (searchedVal) => {
  if(searchedVal===''){
    setRow(data);
  }else{
  if(columnToQuery==='name'){
    const filteredRows = rows.filter((row) => {return row.name.toLowerCase().includes(searchedVal.toLowerCase());});
    setRow(filteredRows);
  }else if(columnToQuery==='title'){
    const filteredRows = rows.filter((row) => {return row.title.toLowerCase().includes(searchedVal.toLowerCase());});
    setRow(filteredRows);
  }else if(columnToQuery==='status'){
    const filteredRows = rows.filter((row) => {return row.status.toLowerCase().includes(searchedVal.toLowerCase());});
    setRow(filteredRows);
  }else if(columnToQuery==='date'){
    const filteredRows = rows.filter((row) => {return row.date.toLowerCase().includes(searchedVal.toLowerCase());});
    setRow(filteredRows);
  }else if(columnToQuery==='Depart'){
    const filteredRows = rows.filter((row) => {return row.Depart.toLowerCase().includes(searchedVal.toLowerCase());});
    setRow(filteredRows);
  }else if(columnToQuery===''){
    const filteredRows = rows.filter((row) => {return row.title.toLowerCase().includes(searchedVal.toLowerCase());});
    setRow(filteredRows);
  }else{
    setRow(data);
  }

  }
};
const cancelSearch = () => {
  setSearched("");
  
  requestSearch(searched);
};
 //Search
//Dialog
const [open, setOpen] = React.useState(false);
const [age, setAge] = React.useState('');

const handleChange = (event) => {
  setAge(Number(event.target.value) || '');
};

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};
//Dialog
//card

  return (
     <> 
     <div className='Title'>
              <ReceiptIcon></ReceiptIcon>
            <h1>Complaints Dashboard</h1>
    </div>
     <div style={{ width: '150%' }}>
      <Box display="flex" flexDirection="row" p={1} m={1} bgcolor="background.paper">
        <Box p={1} bgcolor="grey.300">
        <SearchBar
            value={searched}
            style={{width:'100%'}}
            onChange={(searchVal) => requestSearch(searchVal)}
              onCancelSearch={() => cancelSearch()}
        />
        </Box>
        <Box p={1} bgcolor="grey.300">
        <div>
          <FormControl style={{minWidth: 120}} variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Sort By</InputLabel>
          <Select
              labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={dropID}
              onChange={handleSortDrop}
              label="Sort By"
          >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'ID'}>ID</MenuItem>
          <MenuItem value={'name'}>Name</MenuItem>
          <MenuItem value={'title'}>Title</MenuItem>
          <MenuItem value={'date'}>Date</MenuItem>
          <MenuItem value={'status'}>Status</MenuItem>
          <MenuItem value={'Depart'}>Departement</MenuItem>
        </Select>
       </FormControl>
    
        </div>
        </Box>
        <Box p={1} bgcolor="grey.300">
        <div style={{display:'flex' ,flexWrap: 'wrap'}}>
      <Button size="large" variant="contained" color="secondary" onClick={handleClickOpen}>Filter</Button>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Set the Filter</DialogTitle>
        <DialogContent>
          <form  className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-native">Filter By</InputLabel>
              <Select
                native
                value={columnToQuery}
                onChange={handlecolumnToQuery}
                input={<Input id="demo-dialog-native" />}
              >
                <option aria-label="None" value="" />
                <option value={'name'}>Name</option>
                <option value={'title'}>Title</option>
                <option value={'date'}>Date</option>
                <option value={'Depart'}>Depart</option>
                <option value={'status'}>Status</option>
              </Select>
            </FormControl>
            
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
        </Box>
        
      </Box>
      
    </div>
     <br></br>
    <br></br>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead style={{backgroundColor:'orange',}}>
          <TableRow>
          <StyledTableCell><div onClick={()=>handleSort('ID')} >ID</div></StyledTableCell>
            <StyledTableCell align="right"><div onClick={()=>handleSort('name')} >Name</div></StyledTableCell>
            <StyledTableCell align="right"><div onClick={()=>handleSort('title')}>Complaint Title</div></StyledTableCell>
            <StyledTableCell align="right"><div onClick={()=>handleSort('date')}>Date</div></StyledTableCell>
            <StyledTableCell align="right"><div onClick={()=>handleSort('status')} >Status</div></StyledTableCell>
            <StyledTableCell align="right"><div onClick={()=>handleSort('Depart')} >Departement</div></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
             .map((row) => (
            <StyledTableRow  key={row.ID}>
              <TableCell component="th" scope="row">
               <Typography style={{fontWeight:600 ,fontFamily: `Verdana, Arial, Helvetica, sans-serif`}}> {row.ID}</Typography>
              </TableCell>
              <StyledTableCell align="right">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{row.title}</StyledTableCell>
              <StyledTableCell align="right">{row.date}</StyledTableCell>
              <StyledTableCell align="right">{row.status}</StyledTableCell>
              <StyledTableCell align="right">{row.Depart}</StyledTableCell>
            </StyledTableRow>
          ))}
          {emptyRows > 0 && (
            <StyledTableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
        colSpan={3}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        SelectProps={{
            inputProps: { "aria-label": "rows per page" },
            MenuProps: { classes: { paper: classes.selectDropdown } }
        }}
        backIconButtonProps={{
            "aria-label": "Previous Page",
            style: {color: page===0?"#b5b8c4":"#7cb5ec" },
            autoid: "pagination-button-next-collector",
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page",
            style: {color: "#7cb5ec"},
            autoid: "pagination-button-previous-collector",
          }}
        classes={{ menuItem: classes.menuItem }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        
      />
    </TableContainer>
    </>
  );
}