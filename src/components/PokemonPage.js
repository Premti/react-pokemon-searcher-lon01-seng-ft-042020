import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import Search from './Search'
import { Container } from 'semantic-ui-react'

class PokemonPage extends React.Component {
  

  state = {
    allPokemon : [],
    searchTerm : "",
  }

  componentDidMount(){
    const API = "http://localhost:3000/pokemon"
    fetch(API)
    .then(res => res.json())
    .then(pokemon => this.setState({allPokemon : pokemon}))
  }

  changeSearchTerm = (term) => {
    this.setState({searchTerm : term})
  }

  

  filterSearchedPokemon = () => {
    if (this.state.searchTerm !== "")
    {
    return this.state.allPokemon.filter(pokemon => 
      pokemon.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
      )}
      else {return this.state.allPokemon}
    }

    addPokemon = (pokemonData) => {
      const newPokemon = {
        name: pokemonData.name,
        hp: pokemonData.hp,
        sprites: {
          front: pokemonData.frontUrl,
          back: pokemonData.backUrl,
        }
      }
      
      const API = "http://localhost:3000/pokemon"
      
      fetch(API, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPokemon)
      })
      .then(res => res.json())
      .then(pokemon => 
        this.setState({allPokemon : [...this.state.allPokemon, pokemon]}
      ))
    }
  

  render() {
    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm addPokemon={this.addPokemon}/>
        <br />
        <Search changeSearchTerm={this.changeSearchTerm}/>
        <br />
        <PokemonCollection 
        allPokemon={this.filterSearchedPokemon()}
        />
      </Container>
    )
  }
}

export default PokemonPage
