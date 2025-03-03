import "../index.css";
import {formatter} from '../util/investment';

export default function Table({tableData}){
    const array=tableData;
    let initialInvestment =0;
    if(array.length!==0)
    {
         initialInvestment = array[0].valueEndOfYear-array[0].interest-array[0].annualInvestment;
    }
    
    return(
        <table className='result'>
            <thead className='result thead'>
                <tr>
                    <th>Year</th>
                    <th>Investment Value</th>
                    <th>Interest(Year)</th>
                    <th>Total Interest</th>
                    <th>Invested Capital</th>
                </tr>
            </thead>
            <tbody className='result tbody'>
                {tableData.map(tableItem=>(<tr key={tableData.year}>
                    <td>{tableItem.year}</td>
                    <td>{formatter.format(tableItem.valueEndOfYear)}</td>
                    <td>{formatter.format(tableItem.interest)}</td>
                    <td>{formatter.format(tableItem.valueEndOfYear-tableItem.annualInvestment*tableItem.year-initialInvestment)}</td>
                    <td>{formatter.format(tableItem.valueEndOfYear-(tableItem.valueEndOfYear-tableItem.annualInvestment*tableItem.year-initialInvestment))}</td>
                </tr>))}
            </tbody>
        </table>
    );
}