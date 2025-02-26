import "../index.css";
import {formatter} from '../util/investment';


export default function Table({tableData}){
    console.log(tableData);
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
                    <td>{tableItem.interest}</td>
                    <td>{tableItem.valueEndOfYear}</td>
                    <td>{tableItem.annualInvestment}</td>
                </tr>))}
            </tbody>
        </table>
    );
}