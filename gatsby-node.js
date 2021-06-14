const axios = require(`axios`)
const { getTypes, getBaseStats } = require('./src/pokemonInfo')

const fetch = async (limit = 151) => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
  const response = await axios.get(url)
  let pokemons = []

  for (const pokemon of response.data.results) {
    const resp = await axios.get(pokemon.url)

    pokemons.push({
      name: pokemon.name,
      image: resp.data.sprites.front_default,
      stats: getBaseStats(resp.data.stats),
      types: getTypes(resp.data.types),
    })
  }
  return pokemons
}

exports.sourceNodes = async (
  { actions, createContentDigest, createNodeId },
  pluginOptions
) => {
  const { createNode } = actions

  const pokemons = await fetch(pluginOptions.nbOfPokemons)
  pokemons.forEach(pokemon => {
    createNode({
      ...pokemon,
      id: createNodeId(`${pokemon.name}`),
      internal: {
        type: 'POKEMON',
        content: JSON.stringify(pokemon),
        contentDigest: createContentDigest(pokemon),
      },
    })
  })

  return
}
