const input = document.querySelector('#nomePkm')
const button = document.querySelector('#search')
const buttonRandom = document.querySelector('#random')

const pokedex = document.querySelector('#pokedex')
const errorMessage = document.querySelector('#mensagemErro')


const pkmTypes = [
    {
        type: 'steel',
        bg: 'linear-gradient(84.81deg, #F4F4F4 20.57%, #EDF7FC 106.4%)',
    },
    {
        type: 'dark',
        bg: 'linear-gradient(84.81deg, rgba(209, 203, 216, 0.8) 20.57%, rgba(222, 222, 222, 0.8) 106.4%)',
    },
    {
        type: 'fire',
        bg: 'linear-gradient(84.81deg, #FDDFDF 20.57%, #FFF3E6 106.4%)',
    },
    {
        type: 'grass',
        bg: 'linear-gradient(84.81deg, #EFFCF0 20.57%, #EDF7FC 106.4%)',
    },
    {
        type: 'electric',
        bg: 'linear-gradient(84.81deg, #FFFAE2 20.57%, #E9F4D9 106.4%)',
    },
    {
        type: 'water',
        bg: 'linear-gradient(84.81deg, #DEF3FD 20.57%, #E1FFF2 106.4%)',
    },
    {
        type: 'ice',
        bg: 'linear-gradient(84.81deg, #DEF3FD 20.57%, #E1FFF2 106.4%)',
    },
    {
        type: 'ground',
        bg: 'linear-gradient(84.81deg, #FFE2C6 20.57%, #FFF5EC 106.4%)',
    },
    {
        type: 'rock',
        bg: 'linear-gradient(84.81deg, #D5D5D4 20.57%, #F3F3F3 106.4%)',
    },
    {
        type: 'fairy',
        bg: 'linear-gradient(84.81deg, #FFF1FF 20.57%, #FEF6ED 106.4%)',
    },
    {
        type: 'poison',
        bg: 'linear-gradient(84.81deg, #FAEFFF 20.57%, #EFFCF7 106.4%)',
    },
    {
        type: 'bug',
        bg: 'linear-gradient(84.81deg, #FCF7ED 20.57%, #EFFCF0 106.4%)',
    },
    {
        type: 'dragon',
        bg: 'linear-gradient(84.81deg, #F0F5FF 20.57%, #F6EFFC 106.4%)',
    },
    {
        type: 'psychic',
        bg: 'linear-gradient(84.81deg, #FEFFE1 20.57%, #EAFFF0 106.4%)',
    },
    {
        type: 'flying',
        bg: 'linear-gradient(84.81deg, #EDF7FC 20.57%, #F5F5F5 106.4%)',
    },
    {
        type: 'fighting',
        bg: 'linear-gradient(84.81deg, #FFF9EC 20.57%, #F8F8F8 106.4%)',
    },
    {
        type: 'normal',
        bg: 'linear-gradient(84.81deg, #F5F5F5 20.57%, #FCF4F4 106.4%)',
    },
    {
        type: 'ghost',
        bg: 'linear-gradient(84.81deg, #F4E8FE 20.57%, #FCF4F4 106.4%)',
    }
]


const getPokemons = () => {

    const randomNumber = Math.floor(Math.random() * (898 - 1 + 1)) + 1;

    const baseUrl = 'https://pokeapi.co/api/v2/pokemon/'

    fetch(`${baseUrl}${randomNumber}`)
        .then(response => response.json())
        .then(response => {
            createCard(response)
            response ? errorMessage.innerHTML = '' : pokedex.style.visibility = 'hidden' 
        })

}

const getPokemon = (value) => {

    const baseUrl = 'https://pokeapi.co/api/v2/pokemon/'

    fetch(`${baseUrl}${value}`)
        .then(response => response.json())
        .then(response => { 
            createCard(response)
            response ? errorMessage.innerHTML = '' : pokedex.style.visibility = 'hidden'
        })
        .catch(function (err) {
            console.log(err)
            errorMessage.innerHTML = 'Pokemon not found :('
            input.value = ''
        });
}

const createCard = (pokemon) => {

    const { id, weight, height, name } = pokemon

    const types = pokemon.types.map(type => `<span class="type">${type.type.name}</span>`)
    const typesRemoveComma = types.join(``)

    const pokemonName = name.charAt(0).toUpperCase() + name.slice(1);
    const abilities = pokemon.abilities.map(({ ability }) => ability.name)

    const abilitiesAddSpace = abilities.join(', ')

    const pokemonUrl = `https://www.pokemon.com/us/pokedex/${name}`;
    const pkmImgUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`

    const pkmResults = document.createElement('div')
    pkmResults.classList.add('results')

    pkmResults.innerHTML = `
        <a href="${pokemonUrl}" target="_blank" class="pkmUrl">
            <div class="pkmnCaixa" >
                <img src="${pkmImgUrl}" alt="" class="pkmn-image">
                <p class="pkmId">#${id}</p>
                <div class="pkmnInfo">
                    <h2 class="pkmn-name">${pokemonName}</h2>
                    <p class="pkmn-type">${typesRemoveComma}</p>
                    <p class="pkmn-height"><strong>Height:</strong> ${height / 0.1} cm</p>
                    <p class="pkmn-weight"><strong>Weight:</strong> ${weight / 10} kg</p>
                    <p class="pkmn-ability"><strong>Abilities:</strong> ${abilitiesAddSpace}</p>
                </div>
            </div>
        </a>
        `

    cardBackground(pokemon, pkmResults)
    pokedex.appendChild(pkmResults)
}

const cardBackground = (pokemon, div) => {
    const type = pokemon.types[0].type.name;
    pkmTypes.map((pokemon) => {
        if (pokemon.type === type) {
            div.style.background = `url('./img/mdi_pokeball.png') no-repeat center, ${pokemon.bg}`
            div.style.backgroundSize = 'contain'
            div.style.boxShadow = `0px 1.8852px 15.0816px rgba(10, 11, 11, 0.1)`
        }
    })
}

buttonRandom.addEventListener('click', () => { 

    for (let i = 0; i < 6; i++) {
        getPokemons()
    }

    pokedex.innerHTML = '';

})

button.addEventListener('click', () => {
    const value = input.value
    getPokemon(value)

    input.value = '';
    pokedex.innerHTML = '';
})

