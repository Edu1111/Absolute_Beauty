const form = document.querySelector("#form_crypto_search");
const moneda = document.querySelector("#moneda");
const criptomoneda = document.querySelector("#criptomonedas");
const formContainer=document.querySelector(".form_crypto");
const containerShow=document.querySelector(".container_crypto_answer");
const c =console.log;
const objBusqueda ={
    moneda:'',
    criptomoneda:''
}

document.addEventListener('DOMContentLoaded',()=>{
    consultarCrypto();
    form.addEventListener('submit',submitForm);
    moneda.addEventListener('change', getValue);
    criptomoneda.addEventListener('change', getValue);
})


function submitForm(e){
    e.preventDefault();
    const{moneda,criptomoneda}= objBusqueda; 
    if(moneda == '' || criptomoneda == ''){
        showError('Por favor seleciona los dos campos');
        return
    }
    consultarAPI(moneda,criptomoneda);

}

function consultarAPI(moneda,criptomoneda){
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
    fetch(url)
        .then(resultado => resultado.json())
        .then(resultadoJson =>{
            mostrarValor(resultadoJson.DISPLAY[criptomoneda][moneda]);
        })
        .catch(error => c(error));   
}

function mostrarValor (d){
    clear();
    const {PRICE,HIGHDAY,LOWDAY,LASTUPDATE}= d;
    const mostrar = document.createElement('div');
    mostrar.classList.add('crypto_info');
    mostrar.innerHTML=`
    <p class="main_price">Su valor actual es de: <span>${PRICE}</span></p>
        <p>Hoy ha llegado hasta:: <span>${HIGHDAY}</span></p>
        <p>Hoy ha bajado hasta: <span>${LOWDAY}</span></p>
        <p> Su última Actualización fue : <span>${LASTUPDATE}</span></p>
    
    `;
    containerShow.appendChild(mostrar);
}



function showError(men){
    const error = document.createElement('p');
    error.classList.add("error");
    error.textContent=men;
    formContainer.appendChild(error);
    setTimeout(()=>{
        error.remove();
    },2000);
}


function getValue(e){
    objBusqueda[e.target.name]=e.target.value;
}


function consultarCrypto (){
    const url ='https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'


    fetch(url)
    .then(respuesta => respuesta.json())
    .then(respuestaJson => {
        selectCrypto(respuestaJson.Data);
        /*c(respuestaJson.Data);*/
    })
    .catch(error=>console.error(error));
}

function selectCrypto(cryptos){
    cryptos.forEach(crypto => {
        const {FullName,Name} =crypto.CoinInfo;
        const option = document.createElement("option");
        option.value=Name;
        option.textContent=FullName;
        criptomoneda.appendChild(option);
        
    });
}

 function clear(){
    containerShow.innerHTML = '';
}