<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { Graph, type GraphOptions } from '@antv/g6'
  import { removeUndefined } from '$lib/utils/objects'

  export let options: Omit<GraphOptions, 'container'> = {}

  let className = ''
  export { className as class }
  export let style = ''

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
</script>

<div bind:this={wrapper} class={className} on:resize={resizeGraph} {style}>
  <div class="g6-container" bind:this={container} />
</div>

<style>
  .g6-container {
    @apply bg-green-200 min-h-400px;
  }
</style>
