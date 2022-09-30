<script context="module" lang="ts">
  export const registerNode = G6.registerNode
  export const registerEdge = G6.registerEdge
  export const registerLayout = G6.registerLayout
  export const registerCombo = G6.registerCombo
  export const registerBehavior = G6.registerBehavior
</script>

<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import G6, { Graph, type GraphData, type GraphOptions, type TreeGraphData } from '@antv/g6'
  import { removeUndefined } from '$lib/utils/objects'

  export let options: Omit<GraphOptions, 'container'> = {}
  export let data: GraphData | TreeGraphData | undefined = undefined

  let className = ''
  export { className as class }
  export let style = ''

  export let containerClass = ''

  let wrapper: HTMLDivElement
  let container: HTMLDivElement
  let graph: Graph

  function resizeGraph() {
    if (graph && container) {
      const width = Number(window.getComputedStyle(wrapper).width.replace('px', ''))
      const height = Number(window.getComputedStyle(wrapper).height.replace('px', ''))
      graph.changeSize(width, height)
      const { fitView, fitViewPadding = [] } = options as any
      if (fitView) {
        graph.fitView(fitViewPadding)
      }
    }
  }

  onMount(() => {
    if (container) {
      graph = new Graph(
        removeUndefined({
          ...options,
          container,
        }),
      )

      if (data && data.nodes) {
        graph.data(data)
        graph.render()
      }
    }
  })

  onDestroy(() => {
    if (graph) {
      graph.destroy()
    }
  })

  $: if (data && data.nodes) {
    graph.data(data)
    graph.render()
  }
</script>

<div bind:this={wrapper} class={className} on:resize={resizeGraph} {style}>
  <div class="g6-container {containerClass}" bind:this={container} />
</div>

<style>
  .g6-container {
    @apply min-h-400px;
  }
</style>
