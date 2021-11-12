import { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const BASEURL = 'http://localhost:3001/stocks'

  const [stockList, setStockList] = useState([])
  const [myPortfolio, setMyPortfolio] = useState([])

  const [filter,setFilter] = useState("All")
  const [sortBy,setSortBy] = useState("Alphabetically")

  useEffect(() => {
    fetch(BASEURL)
      .then(resp => resp.json())
      .then(stocks => setStockList(stocks))
  }, [])

  const addToPortfolio = (stock) => {
    const doIOwn = myPortfolio.some(element => element.id === stock.id)
    if (doIOwn === false){
      setMyPortfolio([...myPortfolio,stock])
    }
  }
  const delFromPortfolio = (stock) => {
    const newPortfolio = myPortfolio.filter(element => element.id !== stock.id)
    setMyPortfolio(newPortfolio)
  }

  const handleFilter = (e) => {
    const filterValue = e.target.value
    setFilter(filterValue)
  }

  const handleSort = (e) =>{
    const sortValue = e.target.value
    setSortBy(sortValue)
  }

  const filteredStocks = [...stockList].filter(stock => {
    if (filter !== "All"){
      return stock.type === filter
    } else {
      return true
    }
  })

  const sortedStocks = [...filteredStocks].sort((aStock,bStock) => {
    if (sortBy === "Alphabetically"){
      return aStock.name.localeCompare(bStock.name)
    } else {
      return aStock.price-bStock.price
    }
  })

  return (
    <div>
      <SearchBar handleFilter={handleFilter} handleSort={handleSort}/>
      <div className="row">
        <div className="col-8">
          <StockContainer stockList={sortedStocks} addToPortfolio={addToPortfolio}/>
        </div>
        <div className="col-4">
          <PortfolioContainer  myPortfolio={myPortfolio}  delFromPortfolio={delFromPortfolio}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
