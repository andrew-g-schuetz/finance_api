import {useState} from 'react';
import './App.css';

function App() {

  console.log(process.env);
  //value used to pass into api
  const [stock, setStock] = useState();
  
  //value used to display stock symbol
  const [symbol, setSymbol] = useState();

  //Values for checking if the api was successful
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  
  //type of stock chosen
  const [type, setType] = useState();

  //Values obtained from connecting to an api
  const [high, setHigh] = useState();
  const [low, setLow] = useState();
  const [open, setOpen] = useState();
  const [close, setClose] = useState();
  const [exchange, setExchange] = useState();


  //handles the change of changing the type of stock
  const handleType = (e) =>{
    setType(e.target.value);
  }

  //handles the change of typing a symbol
  const handleChange = (e) =>{
    setStock(e.target.value);
   
  }

  //connects to twelve data api and returns json
  const handleSearchClick = async () => {
    
    try{
      
      const response = await fetch(`https://api.twelvedata.com/time_series?apikey=${process.env.REACT_APP_API_KEY}&interval=1min&dp=2&format=JSON&outputsize=1&type=${type}&symbol=${stock}`);
      const data = await response.json();
      setSuccess(true);
      setError(false);
      
      setHigh(data.values[0].high);
      setLow(data.values[0].low);
      setOpen(data.values[0].open);
      setClose(data.values[0].close);
      setExchange(data.meta.exchange);
      setSymbol(stock.toUpperCase());

    }catch(err){
      setError(true);
      
      alert("Please try typing in a new symbol or selecting a type");
    }
    

    
  };

  return (
    <div className="App">
      <h1>Stock Symbol Search</h1>
      <p>Enter stock symbol:</p>
      <div className = "searchInfo">
          <input type = "test" placeholder ="EX: AAPL" value = {stock} onChange = {handleChange}></input>
          
          
          <select className = "typeSelect" value={type} onChange={handleType}>
            
            <option  value="">Select Type</option>
            <option  value="stock">Stock</option>
            <option  value="etf">ETF</option>
            <option  value="index">Index</option>
          </select>

          

          <button onClick={handleSearchClick}>Search</button>
          

          

      </div>

        

        

        {success && !error && (
          <div className = "results">
            <p>Symbol: {symbol}</p>
            <p>High: ${high}</p>
            <p>Low: ${low}</p>
            <p>Open: ${open}</p>
            <p>Close: ${close}</p>
            <p>Exchange: {exchange}</p>
          </div>
        )}
      
    </div>
  );
}

export default App;
