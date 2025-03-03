import {useState} from 'react';
import Header from './components/Header.jsx';
import InputPanel from './components/InputPanel.jsx';
import Table from './components/Table.jsx';
import {calculateInvestmentResults} from './util/investment.js';




function App() {

  //Input object state
  const [investmentData, onInvestmentUpdate] = useState({
    initialInvestment:0,
    annualInvestment:0,
    expectedReturn:0,
    duration:0
  }) ;


  const inputIsValid = investmentData.duration>=1;

  const tableData=calculateInvestmentResults(investmentData);
  

  
  return (
    <main>
      <Header/>
      <InputPanel investmentData={investmentData} onInvestmentUpdate={onInvestmentUpdate}/>
      {!inputIsValid && <p className="center">Please enter a duration greater than zero</p>}
      {inputIsValid && <Table tableData={tableData}/>}
    </main>
    
  );
}

export default App
