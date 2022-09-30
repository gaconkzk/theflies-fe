<script lang="ts">
  import { G6Graph } from '@flies-ui/flelte-g6'
</script>

<main>
  <G6Graph
    class="w-600px h-400px"
    options={{
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'edge-tooltip',
            formatText: (model) => {
              const text = `${model.class}`
              return text
            },
          },
          'drag-canvas',
          'zoom-canvas',
        ],
      },
      defaultNode: {
        type: 'breath-node',
        size: 3,
        style: {
          lineWidth: 0,
          fill: 'rgb(240, 223, 83)',
        },
      },
      defaultEdge: {
        type: 'running-polyline',
        size: 1,
        color: 'rgb(14,142,63)',
        style: {
          opacity: 0.4,
          lineAppendWidth: 3,
        },
      },
    }}
    containerClass="bg-black bg-[url(https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*G23iRqkiibIAAAAAAAAAAABkARQnAQ)] w-500px h-500px bg-no-repeat bg-contain"
    data={graphData}
  />
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
