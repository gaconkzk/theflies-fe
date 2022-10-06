<svelte:options tag="flies-g6graph" />

<script lang="ts">
  import { onDestroy, onMount, createEventDispatcher } from 'svelte'
  import { Graph, TreeGraph, type GraphData, type GraphOptions, type TreeGraphData } from '@antv/g6'
  import { removeUndefined } from '$lib/utils/objects'
  import { GraphEdgeEvent, GraphEvent, GraphNodeEvent, GraphTimingEvent } from '$lib/utils/events'

  export let options: Omit<GraphOptions, 'container'> = {}
  export let data: GraphData | TreeGraphData | undefined = undefined

  let dispatch = createEventDispatcher()

  let className = ''
  export { className as class }
  export let style = ''

  export let containerClass = ''

  export let type: 'normal' | 'tree' = 'normal'

  let wrapper: HTMLDivElement
  let container: HTMLDivElement
  export let graph: Graph | TreeGraph = undefined

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
      if (type === 'normal') {
        graph = new Graph(
          removeUndefined({
            ...options,
            container,
          }),
        )
      } else if (type === 'tree' && ['dendrogram', 'compactBox', 'mindmap', 'indeted'].includes(options.layout?.type)) {
        graph = new TreeGraph(
          removeUndefined({
            ...options,
            container,
          }),
        )
      } else {
        throw new Error('Can`t initialized the Graph. If type is `tree` then layout is required')
      }
      if (graph) {
        // Graph Event
        Object.keys(GraphEvent).forEach((evtName) => {
          graph.on(GraphEvent[evtName], (e) => dispatch(evtName, e))
        })
        // Graph Time Event
        Object.keys(GraphTimingEvent).forEach((evtName) => {
          graph.on(GraphTimingEvent[evtName], (e) => dispatch(evtName, e))
        })

        // Graph Node Event
        Object.keys(GraphNodeEvent).forEach((evtName) => {
          graph.on(GraphNodeEvent[evtName], (e) => dispatch(evtName, e))
        })

        // Graph Edge Event
        Object.keys(GraphEdgeEvent).forEach((evtName) => {
          graph.on(GraphEdgeEvent[evtName], (e) => dispatch(evtName, e))
        })
      }
    }
  })

  onDestroy(() => {
    if (graph) {
      graph.destroy()
    }
  })

  $: if (graph && data) {
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
