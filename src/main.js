
const $getButton = document.querySelector('#get-btn')


$getButton.onclick = function (){


   getPokemons();
    let $pokemonContainer = document.querySelector('#pokemon-container')


}

function createCard(pokemon){


    //console.log("esta info llega a la funcion create card", pokemon)
    let $pokemonContainer = document.querySelector('#pokemon-container')

    let newCard = document.createElement('div')
    newCard.setAttribute('class',"card mx-2 mb-3 mt-3")
    newCard.style.width = "12rem"

    newCard.innerHTML = `
    <img src="${pokemon.sprites["front_default"]}" class="card-img-top" alt="${pokemon.name}">
    <div class="card-body">
      <h5 class="card-title">${pokemon.name}</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="btn btn-primary">Ver detalle</a>
    `

    $pokemonContainer.appendChild(newCard)
}


 

function getPokemons(url,offset){

   //offset 0 by default


   //Quizás cambiar nombre de la función
   //utilizar la propiedad Next que realiza la cuenta del offset 
   //Armar cards
   //Agregar boton siguiente y anterior

    fetch(' https://pokeapi.co/api/v2/pokemon?limit=10') 

    .then(resp => resp.json())
    .then(resp =>{
        
        console.log(resp.results)
        console.log(resp.next)
        
       
        let newPokemons = resp.results
        let pokemonsUrls = [];
       
         newPokemons.forEach((pokemon) => {

            fetch(`${pokemon.url}`)
            .then(resp => resp.json())
            .then (resp =>{

                createCard(resp)
                
                /* 
                console.log("esta es la info de cada pokemón",resp)
                console.log("este es el nombre del pokemon",resp.name)
                console.log("esta es una imagen del pokemón",resp.sprites['front_default']) */


            })
            
        });
 

        


    })

   

     
}