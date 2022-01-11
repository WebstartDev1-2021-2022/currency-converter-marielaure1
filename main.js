const inputFrom = document.querySelector("#from");
const inputTo = document.querySelector("#to");
const switchButton = document.querySelector(".switch");
const selectFromCurrencies = document.querySelector("#from-currencies");
const selectToCurrencies = document.querySelector("#to-currencies");
const submitInput = document.querySelector("[type='submit']");
const form = document.querySelector("form");


const switchCurrencies = (event) => {
    event.preventDefault();
    console.log('le bouton switch a été cliqué');
}

const submitForm = async (event) => {
    event.preventDefault();
    const fromValue = inputFrom.value;
    const currencyFrom = selectFromCurrencies.value;
    const currencyTo = selectToCurrencies.value;
    const optionAUDFrom = document.querySelector('.from-currencies');
    const toValue = inputTo.value;

    // if (currencyFrom === currencyTo){
    // }

    if(!fromValue){
        alert("Vous n'avez pas entré de valeur");
        return;
    }
    // console.log('fromValue:', fromValue);
    try{
        const response = await fetch(`https://api.frankfurter.app/latest?amount=${fromValue}&from=${currencyFrom}&to=${currencyTo}`);
        const json = await response.json();
        console.log(json.rates[currencyTo]);
        
        inputTo.innerText = `${json.rates[currencyTo]}`;
        
    } catch (error){
        console.error('Erreur dans la requête:', error);
        alert("Oups ! Une erreur est arrivée, veuillez ré-essayer ultérieurement.");
    }
}

switchButton.addEventListener("click", switchCurrencies);
form.addEventListener("submit", submitForm);