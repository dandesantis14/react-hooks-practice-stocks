import React from "react";
import Stock from "./Stock";

function PortfolioContainer({myPortfolio,delFromPortfolio}) {
  const portfolioList = myPortfolio.map((stock)=>{
    return (<Stock 
      key={stock.id}
      stock={stock}
      onStockClick={delFromPortfolio}
    />)})

  return (
    <div>
      <h2>My Portfolio</h2>
      {portfolioList}
    </div>
  );
}

export default PortfolioContainer;
