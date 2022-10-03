<svelte:options tag="flies-g6graph" />

<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { Graph, type GraphData, type GraphOptions, type TreeGraphData } from '@antv/g6'
  import { removeUndefined } from '$lib/utils/objects'
  import type { G6GraphOptions } from '../index.d'

  export let options: G6GraphOptions = {}
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
    }
  })

  onDestroy(() => {
    if (graph) {
      graph.destroy()
    }
  })

  $: if (graph && data && data.nodes) {
    graph.data(data)
    graph.render()
  }
</script>

<div bind:this={wrapper} class={className} on:resize={resizeGraph} {style}>
  <div class="g6-container {containerClass}" bind:this={container} />
</div>

<style>
  @unocss-placeholder;
  .g6-container {
    @apply min-h-400px;
  }
</style>
