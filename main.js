// Accès aux DOM
const inputFrom = document.querySelector("#from");
const inputTo = document.querySelector("#to");
const switchButton = document.querySelector(".switch");
const selectFromCurrencies = document.querySelector("#from-currencies");
const selectToCurrencies = document.querySelector("#to-currencies");
const submitInput = document.querySelector("[type='submit']");
const form = document.querySelector("form");

// Déclaration des fonctions (DEBUT)

const switchCurrencies = (event) => {
    event.preventDefault();
    // selectFromCurrencies.value = 

    console.log('le bouton switch a été cliqué');
    [inputFrom.value, inputTo.value]  = [inputTo.value, inputFrom.value]


}
/**
 * Prend l'option sélectionnée d'un menu select et la désactive dans un deuxième menu select
 * @param  {HTMLSelectElement} selectElement1 le menu select selectionné
 * @param  {HTMLSelectElement} selectElement2 le menu select à modifier
 */
const disableSelectValue = (selectElement1, selectElement2) => {
    const fromValue = selectElement1.value
    const nodes = selectElement2.querySelectorAll('option')

    for (const node of nodes){
        node.removeAttribute('disabled')

        if(node.value === fromValue){
            node.setAttribute('disabled', true)
        }else {
            node.removeAttribute('disabled')
        }
    }
}

const submitForm = async (event) => {
    event.preventDefault();
    const fromValue = inputFrom.value;
    const currencyFrom = selectFromCurrencies.value;
    const currencyTo = selectToCurrencies.value;

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
        // console.log("Reponse complète : ", json)
        // console.log("Résultat : ", json.rates[currencyTo]);
        
        inputTo.value = json.rates[currencyTo];

        
    } catch (error){
        console.error('Erreur dans la requête:', error);
        alert("Oups ! Une erreur est arrivée, veuillez ré-essayer ultérieurement.");
    }
}

// const updateSelectValue = () => {
//     // Requête Ajax (Asynchronous Javascript And Xml)
//     fetch(`https://api.frankfurter.app/currencies`)
//         .then((result) => result.json())
//         .then((data) => {
//             console.log(data)
//             // TODO: Mettre à jour le contenu HTML des deux menus select
//             let htmlContent = "";
//             for (const [key, value] of Object.entries(data)){
//                 console.log(`key: ${key},value: ${value}`)
//                 const option = `<option value="${key}">${value} (${key})</option></option>`
//                 htmlContent += option
//             }

//             console.log(htmlContent)
//             selectFromCurrencies.innerHTML = htmlContent
//             selectToCurrencies.innerHTML = htmlContent
//         })
//         .catch((error) => console.error("Erreur updateSelectValue : ", error))
// }

const updateSelectValue = async() => {
    try {
        const result = await fetch(`https://api.frankfurter.app/currencies`)
        const data = await result.json()

        let htmlContent = "";
        for (const [key, value] of Object.entries(data)){
            const option = `<option value="${key}">${value} (${key})</option></option>`
            htmlContent += option
        }

        selectFromCurrencies.innerHTML = htmlContent
        selectToCurrencies.innerHTML = htmlContent
    } catch (error) {
        console.error("Erreur updateSelectValue : ", error)
    }
}

// Event handlers
switchButton.addEventListener("click", switchCurrencies);
form.addEventListener("submit", submitForm);


// Appel ddes fonctions au chargement de la page

updateSelectValue()
disableSelectValue()