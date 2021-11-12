import React from "react";
import Stock from "./Stock";

function StockContainer({stockList,addToPortfolio}) {
  const stockDisplay = stockList.map((stock)=>{
    return (<Stock 
      key={stock.id}
      stock={stock}
      onStockClick={addToPortfolio}
    />)
  })
  return (
    <div>
      <h2>Stocks</h2>
      {stockDisplay}
    </div>
  );
}

export default StockContainer;
