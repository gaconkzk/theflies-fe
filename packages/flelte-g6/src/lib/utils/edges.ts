import type { ICircle, IGroup, ModelConfig, ShapeStyle } from '@antv/g6'

export const processParallelEdgesOnAnchorPoint = (
  edges,
  offsetDiff = 15,
  multiEdgeType = 'quadratic',
  singleEdgeType = undefined,
  loopEdgeType = undefined,
) => {
  const len = edges.length
  const cod = offsetDiff * 2
  const loopPosition = ['top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left']
  const edgeMap = {}
  const tags = []
  const reverses = {}
  for (let i = 0; i < len; i++) {
    const edge = edges[i]
    const { source, target, sourceAnchor, targetAnchor } = edge
    const sourceTarget = `${source}|${sourceAnchor}-${target}|${targetAnchor}`

    if (tags[i]) continue
    if (!edgeMap[sourceTarget]) {
      edgeMap[sourceTarget] = []
    }
    tags[i] = true
    edgeMap[sourceTarget].push(edge)
    for (let j = 0; j < len; j++) {
      if (i === j) continue
      const sedge = edges[j]
      const { source: src, target: dst, sourceAnchor: srcAnchor, targetAnchor: dstAnchor } = sedge

      if (!tags[j]) {
        if (source === dst && sourceAnchor === dstAnchor && target === src && targetAnchor === srcAnchor) {
          edgeMap[sourceTarget].push(sedge)
          tags[j] = true
          reverses[`${src}|${srcAnchor}|${dst}|${dstAnchor}|${edgeMap[sourceTarget].length - 1}`] = true
        } else if (source === src && sourceAnchor === srcAnchor && target === dst && targetAnchor === dstAnchor) {
          edgeMap[sourceTarget].push(sedge)
          tags[j] = true
        }
      }
    }
  }

  for (const key in edgeMap) {
    const arcEdges = edgeMap[key]
    const { length } = arcEdges
    for (let k = 0; k < length; k++) {
      const current = arcEdges[k]
      if (current.source === current.target) {
        if (loopEdgeType) current.type = loopEdgeType
        current.loopCfg = {
          position: loopPosition[k % 8],
          dist: Math.floor(k / 8) * 20 + 50,
        }
        continue
      }
      if (length === 1 && singleEdgeType && (current.source !== current.target || current.sourceAnchor !== current.targetAnchor)) {
        current.type = singleEdgeType
        continue
      }
      current.type = multiEdgeType
      const sign =
        (k % 2 === 0 ? 1 : -1) *
        (reverses[`${current.source}|${current.sourceAnchor}|${current.target}|${current.targetAnchor}|${k}`] ? -1 : 1)
      if (length % 2 === 1) {
        current.curveOffset = sign * Math.ceil(k / 2) * cod
      } else {
        current.curveOffset = sign * (Math.floor(k / 2) * cod + offsetDiff)
      }
    }
  }
  return edges
}

export const draggableControlNodeEdge = (prefix: string, attrs?: ShapeStyle & Partial<ICircle>) => ({
  afterDraw(cfg: ModelConfig, group: IGroup) {
    if (!cfg || !group) {
      return
    }

    const cp = cfg.controlPoints as { x: number; y: number }[]
    cp.forEach((p, i) => {
      const circle = group.addShape('circle', {
        attrs: {
          ...attrs,
          x: p.x,
          y: p.y,
        },
        name: prefix + i,
        draggable: true,
        capture: true,
      })
      circle.on('dragstart', (e) => {
        return false
      })
      circle.on('drag', (e) => {
        const it = e.currentTarget
        const mx = it.cfg?.totalMatrix
        if (mx) {
          const offsetX = mx[mx.length - 3]
          const offsetY = mx[mx.length - 2]
          circle.attr('x', e.x - offsetX)
          circle.attr('y', e.y - offsetY)
        } else {
          circle.attr('x', e.x)
          circle.attr('y', e.y)
        }
      })
      circle.on('dragend', (e) => {
        const it = e.currentTarget
        const mx = it.cfg?.totalMatrix
        if (mx) {
          const offsetX = mx[mx.length - 3]
          const offsetY = mx[mx.length - 2]
          circle.attr('x', e.x - offsetX)
          circle.attr('y', e.y - offsetY)
          cfg.controlPoints[i] = {
            x: e.x - offsetX,
            y: e.y - offsetY,
          }
        } else {
          circle.attr('x', e.x)
          circle.attr('y', e.y)
          cfg.controlPoints[i] = {
            x: e.x,
            y: e.y,
          }
        }
        group.cfg.item.refresh()
      })
    })

    const shape = group.get('children')[0]
    const length = shape.getTotalLength()
    let circleCount = Math.ceil(length / 20)
    circleCount = circleCount === 0 ? 1 : circleCount

    const _loop = function _loop(i: number) {
      const delay = Math.random() * 1000
      const start = shape.getPoint(i / circleCount)
      const circle = group.addShape('circle', {
        attrs: {
          x: start.x,
          y: start.y,
          r: 0.8,
          fill: '#A0F3AF',
          shadowColor: '#fff',
          shadowBlur: 30,
        },
        name: 'circle-shape',
      })
      circle.animate(
        (ratio: number) => {
          ratio += i / circleCount
          if (ratio > 1) {
            ratio %= 1
          }
          const tmpPoint = shape.getPoint(ratio)
          return {
            x: tmpPoint.x,
            y: tmpPoint.y,
          }
        },
        {
          repeat: true,
          duration: 10 * length,
          easing: 'easeCubic',
          delay,
        },
      )
    }

    for (let i = 0; i < circleCount; i++) {
      _loop(i)
    }
  },
})
