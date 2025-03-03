import '../index.css';
import {useState} from "react";

export default function InputPanel({investmentData, onInvestmentUpdate}){

   //lifting state to app
   function handleInvestmentUpdate(event){
       const{name,value}=event.target;
       onInvestmentUpdate({
         ...investmentData,
         [name]:Number(value)
       });
     };

     //Alternative object update 
     //Define initial state
     const [userInput,setUserInput]=useState({
        initialInvestment:1000,
        annualInvestment:1200,
        expectedReturn:6,
        duration:10,
     });

    function handleChange(inputIdentifier,newValue){
        setUserInput(prevUserInput=>{
            return{
                ...prevUserInput,
                [inputIdentifier]:newValue
            };
        });
    }

    return(
    <div className="user-input">
            <div className='input-group'>
                <div className='input-row'>
                    <div>
                        <label htmlFor='initialInvestementInput'>INITIAL INVESTMENT</label>
                        <input  id='initialInvestmentInput' 
                                type="number" 
                                min="0" 
                                max="10000000000" 
                                step="1000" 
                                name="initialInvestment"
                                value={investmentData.initialInvestment}
                                onChange={handleInvestmentUpdate}></input>
                    </div>
                    <div>
                        <label htmlFor='annualInvestmentInput'>ANNUAL INVESTMENT</label>
                        <input  id='annualInvestmentInput'
                                type="number" 
                                min="0" 
                                max="10000000000" 
                                step="1000" 
                                name="annualInvestment" 
                                value={investmentData.annualInvestment}
                                onChange={handleInvestmentUpdate}  ></input>
                    </div>
            </div>
            <div className='input-row'>
                <div>
                    <label htmlFor='expectedReturnInput'>EXPECTED RETURN</label>
                    <input  id='expectedReturnInput' 
                            type="number" 
                            min="0" 
                            max="10000000000" 
                            step="1"
                            name="expectedReturn" 
                            value={investmentData.expectedReturn}
                            onChange={handleInvestmentUpdate}></input>
                </div>
                <div>
                    <label htmlFor='durationInput'>DURATION</label>
                    <input id='durationInput' 
                           type="number" 
                           min="0" 
                           max="10000000000" 
                           step="1"
                           name="duration" 
                           value={investmentData.duration}
                           onChange={handleInvestmentUpdate}></input>
                </div>
            </div>
        </div>          
    </div>
    );
}