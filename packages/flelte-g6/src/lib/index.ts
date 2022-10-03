// Reexport your entry components here
export { default as G6Graph } from '$lib/components/G6Graph.svelte'
export * from '$lib/utils/objects'

export { registerNode, registerEdge } from '@antv/g6'
export type { GraphData, NodeConfig, EdgeConfig, IPoint, ModelConfig, IGroup } from '@antv/g6'
