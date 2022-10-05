import type { GraphOptions } from '@antv/g6'

// Reexport your entry components here
export { default as G6Graph } from '$lib/components/G6Graph.svelte'
export * from '$lib/utils/objects'

export { registerNode, registerEdge, Graph, TreeGraph } from '@antv/g6'

//// Type export
type G6GraphOptions = Omit<GraphOptions, 'container'>
export type { GraphData, NodeConfig, EdgeConfig, IPoint, ModelConfig, IGroup } from '@antv/g6'
export type { GraphOptions, G6GraphOptions }
