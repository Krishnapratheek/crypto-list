import React, {useState,useEffect} from 'react';
import '../custome.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {Routes, Route,BrowserRouter as Router, } from "react-router-dom";

import {
  MDBTable, 
  MDBTableHead, 
  MDBTableBody, 
  MDBRow, 
  MDBCol, 
  MDBContainer,
  MDBBtn,
  MDBBtnGroup,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from 'mdb-react-ui-kit';

const Home = () => {
  const [data,setData] = useState([]);
  const [value,setValue] = useState("");
  const [sortValue,setSortValue] = useState("");
  const [text,setText] = useState("");
  const [suggestions,setSuggestions] = useState([]);

  const sortOptions = ["name", "ticker", "price", "priceChange", "mentions", "mentionsChange", "positiveSentimentPrec"];

useEffect(()=>{
  loadCoinsData();
}, []);

const loadCoinsData = async () => {
return await axios.get("http://localhost:5000/coins?_sort=name&_order=asc")
.then((response) => setData(response.data))
.catch((err) => console.log(err));
};
console.log("data",data);

const handleReset = () =>{
  loadCoinsData();
};

const handleSearch = async (e) =>{
  e.preventDefault();
  return await axios
  .get(`http://localhost:5000/coins?q=${text}`)
  .then((response) => {
    setData(response.data);
    setValue("");
  })
  .catch((err) => console.log(err));
};

const onChangeHandler = (text) =>{

  let matches= [];
  if(text.length>0 ){
    matches = data.filter(coin=>{
      const regex = new RegExp(`${text}`, "gi");
      return coin.name.match(regex)
    })
  }
  console.log('matches',matches)
  setSuggestions(matches)
setText(text)
}

const onSuggestionHandler = (text)=>{
  setText(text);
  setSuggestions([]);
}

const handleSort = async (e) =>{
  let value = e.target.value;
setSortValue(value);

  return await axios
  .get(`http://localhost:5000/coins?_sort=${value}&_order=asc`)
  .then((response) => {
    setData(response.data);
    
  })
  .catch((err) => console.log(err));
};

let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = `/addCoin`; 
      navigate(path);
    };

  return (
    <MDBContainer>
        <MDBRow>
        <MDBCol style={{marginTop:"30px"}} size='2'><MDBBtn onClick={routeChange} color='dark'>Add coins</MDBBtn></MDBCol>
        <MDBCol style={{marginTop:"30px"}} size='3'>
          <label>Sort By:</label>
          <select
          style={{width:"50%", borderRadius:"2px", height:"35px"}}
          onChange={handleSort}
          value={sortValue}
          >
            
            {sortOptions.map((item, index) => (
              <option value={item} key={index}>{item}</option>
            ))}

          </select>
        </MDBCol>
    
    
     
      <MDBCol size='4'>
       <input 
          type="text"
          className="form-control"
          style={{marginTop:"30px"}}
          placeholder="Search Name"
          value={text}
          onChange={(e) => onChangeHandler(e.target.value)}
          />
          {suggestions && suggestions.map((suggestions, i) =>
          <div key={i} className="suggestion" onClick={()=>onSuggestionHandler(suggestions.name)}>{suggestions.name}</div>
          )}
          </MDBCol>
          <MDBCol style={{marginTop:"15px"}} size='3'>
      <form style={{
        margin:"auto",
        padding:"15px",
        maxWidth:"400px",
        alignContent:"center",
      }}
      className="d-flex input-group w-auto"
      onSubmit={handleSearch}
      >
       
          <input 
          type="hidden"
          className="form-control"
          placeholder="Search Name"
          value={text}
          onChange={(e) => setValue(e.target.value)}
          />
          
            <MDBBtn type='submit' color='dark'>Search</MDBBtn> 
          <MDBBtn className='mx-2' color='info' onClick={() => handleReset()}>Clear</MDBBtn>
         
      </form>
      </MDBCol>
      </MDBRow>
      <div style={{marginTop:"100px"}}>
        <h2 className='text-center'>Crypto Coins</h2>
        <MDBRow>
          <MDBCol size='12'>
            <MDBTable>
              <MDBTableHead dark>
                <tr>
                <th scope='col'>
                    No.
                  </th>
                  <th scope='col'>
                    Name
                  </th>
                  <th scope='col'>
                  Ticker
                  </th>
                  <th scope='col'>
                  Price
                  </th>
                  <th scope='col'>
                  Price Change
                  </th>
                  <th scope='col'>
                  Mentions
                  </th>
                  <th scope='col'>
                  Mentions Change
                  </th>
                  <th scope='col'>
                  Positive Sentiment Prec
                  </th>
                </tr>
              </MDBTableHead>
              {data.length === 0 ?(
                <MDBTableBody className="align-center mb-o">
                  <tr>
                    <td colSpan={8} className="text-center mb-0">No data found</td>
                  </tr>
                </MDBTableBody>
              ):(
                data.map((item, index) =>(
                  <MDBTableBody key={index}>
                    <tr>
                      <th scope='row'>{index+1}</th>
                      <td><img style={{width:"30px", height:"30px"}} src={item.icon} />{item.name}</td>
                      <td>{item.ticker}</td>
                      <td>{item.price}</td>
                      <td>{item.priceChange}</td>
                      <td>{item.mentions}</td>
                      <td>{item.mentionsChange}</td>
                      <td>{item.positiveSentimentPrec}</td>
                    </tr>
                  </MDBTableBody>
                ))
              )}
            </MDBTable>
          </MDBCol>
        </MDBRow>
      </div>
    
    </MDBContainer>
  );
}

export default Home;
