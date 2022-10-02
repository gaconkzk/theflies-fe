import type { EdgeConfig, NodeConfig } from '@antv/g6'

export const removeUndefined = <T extends { [key: string]: unknown }>(obj: T): T => {
  return Object.keys(obj).reduce((newObject, key) => {
    if (typeof obj[key] !== 'undefined') {
      return {
        ...newObject,
        [key]: obj[key],
      }
    }
    return newObject
  }, {} as T)
}

export const generatePolyPath = (source: NodeConfig, target: NodeConfig, maxControlPoints = 1): EdgeConfig => {
  const maxCP = Math.min()
  return {}
}
