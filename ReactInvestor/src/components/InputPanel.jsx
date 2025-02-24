import '../index.css';

export default function InputPanel(){
    return(
    <div className='user-input'>
            <div className='input-group'>
                <div className='input-row'>
                    <div>
                        <label htmlFor='initialInvestementInput'>INITIAL INVESTMENT</label>
                        <input  id='initialInvestmentInput'></input>
                    </div>
                    <div>
                        <label htmlFor='annualInvestmentInput'>ANNUAL INVESTMENT</label>
                        <input  id='annualInvestmentInput'></input>
                    </div>
            </div>
            <div className='input-row'>
                <div>
                    <label htmlFor='expectedReturnInput'>EXPECTED RETURN</label>
                    <input  id='expectedReturnInput'></input>
                </div>
                <div>
                    <label htmlFor='durationInput'>DURATION</label>
                    <input id='durationInput'></input>
                </div>
            </div>
        </div>          
    </div>
    );
}