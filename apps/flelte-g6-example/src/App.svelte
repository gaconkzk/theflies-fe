<script lang="ts">
  import { onMount } from 'svelte'
  import { G6Graph } from '@flies-ui/flelte-g6'

  /**
   * 该示例演示自定义节点和边实现动态地铁图效果
   * by 十吾
   */
  const colors = [
    'rgb(64, 174, 247)',
    'rgb(108, 207, 169)',
    'rgb(157, 223, 125)',
    'rgb(240, 198, 74)',
    'rgb(221, 158, 97)',
    'rgb(141, 163, 112)',
    'rgb(115, 136, 220)',
    'rgb(133, 88, 219)',
    'rgb(203, 135, 226)',
    'rgb(227, 137, 163)',
  ]

  function scaleNodesPoints(nodes: any[], edges: any[], graphSize: number[]) {
    const size = graphSize[0] < graphSize[1] ? graphSize[0] : graphSize[1]
    let minX = 99999999999999999
    let maxX = -99999999999999999
    let minY = 99999999999999999
    let maxY = -99999999999999999
    // re-calculate maxX, maxY
    nodes.forEach(function (node: any) {
      if (node.x > maxX) maxX = node.x
      if (node.x < minX) minX = node.x
      if (node.y > maxY) maxY = node.y
      if (node.y < minY) minY = node.y
    })

    edges.forEach(function (edge) {
      const controlPoints = edge.controlPoints as any[]
      controlPoints.forEach(function (cp) {
        if (cp.x > maxX) maxX = cp.x
        if (cp.x < minX) minX = cp.x
        if (cp.y > maxY) maxY = cp.y
        if (cp.y < minY) minY = cp.y
      })
    })

    const xScale = maxX - minX
    const yScale = maxY - minY
    nodes.forEach(function (node) {
      node.orix = node.x
      node.oriy = node.y
      if (node.x !== undefined && node.y !== undefined) {
        node.x = ((node.x - minX) / xScale) * size
        node.y = ((node.y - minY) / yScale) * size
      }
    })
    edges.forEach(function (edge) {
      const controlPoints = edge.controlPoints as any[]
      controlPoints?.forEach(function (cp) {
        cp.x = ((cp.x - minX) / xScale) * size
        cp.y = ((cp.y - minY) / yScale) * size
      })
    })
  }

  let graphData: any = []

  onMount(() => {
    fetch(
      'https://gw.alipayobjects.com/os/basement_prod/8c2353b0-99a9-4a93-a5e1-3e7df1eac64f.json',
    )
      .then((res) => res.json())
      .then((data: any) => {
        const nodes = data.nodes as any[]
        const edges = data.edges as any[]
        const classMap = new Map()
        let classId = 0
        nodes.forEach(function (node) {
          node.y = -(node.y ?? 0)
        })
        edges.forEach(function (edge) {
          edge.id = `edge-${edge.id}`
          // edge cluster
          if (edge.class && classMap.get(edge.class) === undefined) {
            classMap.set(edge.class, classId)
            classId++
          }
          const cid = classMap.get(edge.class)
          edge.color = colors[cid % colors.length]
          const controlPoints = edge.controlPoints as any[]

          controlPoints.forEach(function (cp) {
            cp.y = -cp.y
          })
        })
        scaleNodesPoints(nodes, edges, [500, 500])
        graphData = data
      })
  })
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
  @unocss-placeholder;
</style>
