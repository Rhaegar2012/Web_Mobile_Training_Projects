import headerImg from '../assets/investment-calculator-logo.png';
import "../index.css";


export default function Header(){
    return(
        <div className="header">
            <img src={headerImg} className="header img"/>
            <h1 className="header h1">Investement Calculator</h1>
        </div>
    );
}