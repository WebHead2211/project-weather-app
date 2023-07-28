import { dataInfo } from ".";
import { dataFill, errorFill } from "./datafill";


export {
    forecast
}


async function forecast(query) {
    try{
        const data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ee972bd4adba466aa63145904232207&q=${query}&days=3`, {
            mode: 'cors'
        });
        const info = await data.json();
        dataFill(info, true);
        dataInfo = info;      
    } catch(error) {
        console.log(error);
        errorFill(true);
    }
}