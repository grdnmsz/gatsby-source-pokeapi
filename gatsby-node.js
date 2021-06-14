const axios = require(`axios`)

const fetch = async (limit = 151) => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
  const response = await axios.get(url)
  let pokemons = []

  for (const pokemon of response.data.results) {
    const url = pokemon.url
    const resp = await axios.get(url)
    pokemons.push({
      name: pokemon.name,
      image: resp.data.sprites.front_default,
    })
  }
  return pokemons
}

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}, pluginOptions) => {
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
