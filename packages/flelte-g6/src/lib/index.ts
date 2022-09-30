// import 'uno.css'

// Reexport your entry components here
export * from '$lib/components/G6Graph.svelte'
export { registerNode, registerEdge } from '@antv/g6'
export { default as G6Graph } from '$lib/components/G6Graph.svelte'
export type { GraphData, NodeConfig, EdgeConfig, IPoint } from '@antv/g6'
