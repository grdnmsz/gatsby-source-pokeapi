/**
 * Extracting Pokemon's types, base stats
 */

const getTypes = arrayTypes => {
  let types = []
  arrayTypes.forEach(({ type }) => types.push(type.name))
  return types
}

const getBaseStats = arrayStats => {
  let stats = {}
  arrayStats.forEach(({ base_stat, stat }) => (stats[stat.name] = base_stat))
  return stats
}

module.exports = {
  getBaseStats,
  getTypes,
}
