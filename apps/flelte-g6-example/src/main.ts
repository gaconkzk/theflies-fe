import 'uno.css'
import App from './App.svelte'

import {
  registerEdge,
  registerNode,
  type ModelConfig,
} from '@flies-ui/flelte-g6'

registerEdge(
  'running-polyline',
  {
    afterDraw(cfg: ModelConfig, group, ist) {
      if (!cfg || !group) {
        return
      }

      const cp = cfg.controlPoints as { x: number; y: number }[]
      const attrs = {
        r: 3,
        fill: '#F40000',
        shadowColor: '#fff',
        shadowBlur: 25,
      }
      cp.forEach((p, i) => {
        const circle = group.addShape('circle', {
          attrs: {
            ...attrs,
            x: p.x,
            y: p.y,
          },
          name: 'cp-shape_' + i,
          draggable: true,
          capture: true,
        })
        circle.on('dragstart', (e) => {
          return false
        })
        circle.on('drag', (e) => {
          circle.attr('x', e.x)
          circle.attr('y', e.y)
          console.log('x', e.originalEvent.pageX, e.clientX, e.x)
        })
        circle.on('dragend', (e) => {
          cfg.controlPoints[i] = {
            x: e.x,
            y: e.y,
          }
          circle.attr('x', e.x)
          circle.attr('y', e.y)
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
  },
  'polyline',
)

registerNode(
  'breath-node',
  {
    afterDraw(cfg, group) {
      if (!cfg || !group) {
        return
      }

      const r = (cfg.size as number) / 2
      const back1 = group.addShape('circle', {
        zIndex: -3,
        attrs: {
          x: 0,
          y: 0,
          r,
          fill: cfg.color || (cfg.style && cfg.style.fill),
          opacity: 0.6,
        },
        name: 'back1-shape',
      })
      const back2 = group.addShape('circle', {
        zIndex: -2,
        attrs: {
          x: 0,
          y: 0,
          r,
          fill: cfg.color,
          opacity: 0.6,
        },
        name: 'back2-shape',
      })
      const back3 = group.addShape('circle', {
        zIndex: -1,
        attrs: {
          x: 0,
          y: 0,
          r,
          fill: cfg.color,
          opacity: 0.6,
        },
        name: 'back3-shape',
      })
      group.sort() // 排序，根据zIndex 排序
      const delayBase = Math.random() * 2000
      back1.animate(
        {
          // 逐渐放大，并消失
          r: r + 10,
          opacity: 0.0,
        },
        {
          repeat: true, // 循环
          duration: 3000,
          easing: 'easeCubic',
          delay: delayBase, // 无延迟
        },
      )
      back2.animate(
        {
          // 逐渐放大，并消失
          r: r + 10,
          opacity: 0.0,
        },
        {
          repeat: true, // 循环
          duration: 3000,
          easing: 'easeCubic',
          delay: delayBase + 1000, // 1 秒延迟
        },
      )
      back3.animate(
        {
          // 逐渐放大，并消失
          r: r + 10,
          opacity: 0.0,
        },
        {
          repeat: true, // 循环
          duration: 3000,
          easing: 'easeCubic',
          delay: delayBase + 2000, // 2 秒延迟
        },
      )
    },
  },
  'circle',
)

const app = new App({
  target: document.getElementById('app'),
})

export default app
