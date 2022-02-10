
const $getButton = document.querySelector('#get-btn')
 const $nextButton = document.querySelector('#next-btn')
 const $previousButton = document.querySelector('#previous-btn')

 
 let firstUrl = "https://pokeapi.co/api/v2/pokemon?limit=10"
 let nextUrl = []
 let previousUrl=[]

 //Crear vista de detalle con un modal usar id para obtener detallles

$previousButton.onclick = function () {

    if(previousUrl.length !== 0 && previousUrl[0] !== null){

        //detelePreviousCards
        deleteCards()
        getPokemons(previousUrl[0],nextUrl,previousUrl)

    }
   
    else {console.error("no se puede realizar la petición ERROR")}


}

$nextButton.onclick = function (){

    if(nextUrl.length !== 0 ){
        //deletePreviousCards
        deleteCards()
        getPokemons(nextUrl[0],nextUrl,previousUrl)
    }
  
    else {console.error("no se puede realizar la petición ERROR")}

}

$getButton.onclick = function (){

    $getButton.classList.add('disabled')

   getPokemons(firstUrl,nextUrl,previousUrl);
   


}


    function deleteCards(){

        let cards= document.querySelectorAll('.card')

        cards.forEach(card => {

            card.remove()
            
        });



    }


function createCard(pokemon){


    //console.log("esta info llega a la funcion create card", pokemon)
    let $pokemonContainer = document.querySelector('#pokemon-container')

    let newCard = document.createElement('div')
    newCard.setAttribute('class',"card mx-2 mb-3 mt-3")
    newCard.setAttribute('id',`${pokemon.id}`)
    newCard.style.width = "12rem"

    newCard.innerHTML = `
    <img src="${pokemon.sprites["front_default"]}" class="card-img-top" alt="${pokemon.name}">
    <div class="card-body">
      <h5 class="card-title">${pokemon.name}</h5>
      <p class="card-text"> </p>
      <a href="#" class="btn btn-primary detail">Ver detalle</a>
    `

    $pokemonContainer.appendChild(newCard)
}

function getPokemonById(id){

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(resp => resp.json())
    .then(resp => {

        console.log(resp)



    })

}

//vervideo memotest para mejorar esto no usar for each para cada boton
function handleDetails(){

    let detailButtons = document.querySelectorAll('.detail')
    console.log(detailButtons)


    detailButtons.forEach(button => {

        button.onclick = ()=>{

            console.log(button.parentElement.parentElement.id)

         let pokemonId = button.parentElement.parentElement.id

         getPokemonById(pokemonId)

        }
         
        
    });




}
 

function getPokemons(url,nextUrl,previousUrl){

   //offset 0 by default


   //Quizás cambiar nombre de la función
   //utilizar la propiedad Next que realiza la cuenta del offset 
   //Armar cards
   //Agregar boton siguiente y anterior

    fetch(`${url}`) 

    .then(resp => resp.json())
    .then(resp =>{
        
        console.log(resp.results)
        console.log(resp.next)
        console.log(resp.previous)
        
        nextUrl[0]= resp.next
        previousUrl[0]= resp.previous
       
        let newPokemons = resp.results
       // let pokemonsUrls = [];
       
         newPokemons.forEach((pokemon) => {

            fetch(`${pokemon.url}`)
            .then(resp => resp.json())
            .then (resp =>{

                console.log(resp)
                createCard(resp)
                
                /* 
                console.log("esta es la info de cada pokemón",resp)
                console.log("este es el nombre del pokemon",resp.name)
                console.log("esta es una imagen del pokemón",resp.sprites['front_default']) */


            })
            
        });
 

        


    })

   

     
}