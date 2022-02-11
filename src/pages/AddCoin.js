import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { addCoin } from '../redux/actions';

const useStyles = makeStyles((theme) => ({
  root: {
      marginTop: 100,
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const AddCoin = () => {
    const classes = useStyles();
    const [state,setState] = useState({
      icon: "https://static.thenounproject.com/png/3262833-200.png",
      name: "",
      ticker: "",
      price: "",
      priceChange: "",
      mentions: "",
      mentionsChange: "",
      positiveSentimentPrec: ""

    });

    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");

    let navigate = useNavigate(); 
    let dispatch = useDispatch();

    const routeChange = () =>{ 
    let path = `/`; 
    navigate(path);
    };

const { icon, name, ticker, price, priceChange, mentions, mentionsChange, positiveSentimentPrec} = state;

const handleInputChange = (e) => {
    let {name, value} = e.target;
    setState({ ...state, [name]: value});
};

const handleSubmit = (e) => {
   e.preventDefault();
   if( !name || !ticker || !price || !priceChange || !mentions || !mentionsChange || !positiveSentimentPrec )
   {
       setError("Please fill all the informations")
   }else{
        dispatch(addCoin(state));
     
      setMsg("Added succesfully")
        setError("");
   }
};

  return (
    <div>
           <Button 
            style={{width:"50px", marginTop:"20px"}}
            variant="contained" 
            color="secondary" 
            type="submit"
            onClick={routeChange}
            >
               Back
            </Button>
        <h2 style={{marginTop:"20px"}}>Add coin</h2>
        {error && <h3 style={{color:"red"}}>{error}</h3>}
        {msg && <h3 style={{color:"green"}}>{msg}</h3>}
        <form style={{marginTop:"-20px"}} className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField id="standard-basic"  value="https://static.thenounproject.com/png/3262833-200.png" type="hidden" name="icon"  />
            <br/>
            <TextField id="standard-basic" label="Name" value={name} type="text" name="name" onChange= {handleInputChange} />
            <br/>
            <TextField id="standard-basic" label="Ticker" value={ticker} type="text" name="ticker" onChange= {handleInputChange} />
            <br/>
            <TextField id="standard-basic" label="Price" value={price} type="number" step="any" name="price" onChange= {handleInputChange} />
            <br/>
            <TextField id="standard-basic" label="Price Change" value={priceChange} type="number" step="any" name="priceChange" onChange= {handleInputChange} />
            <br/>
            <TextField id="standard-basic" label="Mentions" value={mentions} type="number" step="any" name="" name="mentions" onChange= {handleInputChange} />
            <br/>
            <TextField id="standard-basic" label="Mentions Change" value={mentionsChange} type="number" step="any" name="mentionsChange" onChange= {handleInputChange} />
            <br/>
            <TextField id="standard-basic" label="Positive Sentiment Prec" value={positiveSentimentPrec} type="number" step="any" name="positiveSentimentPrec" onChange= {handleInputChange} />
            <br />
            <Button 
            style={{width:"100px"}}
            variant="contained" 
            color="primary" 
            type="submit"
            >
                Submit
            </Button>
        </form>
    </div>
  )
}

export default AddCoin