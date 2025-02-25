import {useState} from 'react';
import Header from './components/Header.jsx';
import InputPanel from './components/InputPanel.jsx';
import Table from './components/Table.jsx';
import {calculateInvestmentResults} from './util/investment.js';



function updateInvestmentCalculation(investmentData){

    let annualData=calculateInvestmentResults(investmentData.initialInvestment,
                                          investmentData.annualInvestment, 
                                          investmentData.expectedReturn,
                                          investmentData.duration); 
    return annualData; 

}

function App() {

  //Input object state
  const [investmentData, onInvestmentUpdate] = useState({
    initialInvestment:0,
    annualInvestment:0,
    expectedReturn:0,
    duration:0
  }) ;

  

  const tableData=updateInvestmentCalculation(investmentData);
  console.log(investmentData);
  console.log(tableData);
  return (
    <main>
      <Header/>
      <InputPanel investmentData={investmentData} onInvestmentUpdate={onInvestmentUpdate}/>
      <Table tableData={tableData}/>
    </main>
    
  );
}

export default App
