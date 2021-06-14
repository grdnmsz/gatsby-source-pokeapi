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
  for (const { base_stat, stat } of arrayStats) {
    stats[stat.name] = base_stat
  }
  return stats
}

module.exports = {
  getBaseStats,
  getTypes,
}
