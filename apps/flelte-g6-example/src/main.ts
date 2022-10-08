import 'uno.css'
import App from './App.svelte'

import {
  registerEdge,
  registerNode,
  draggableControlNodeEdge,
} from '@flies-ui/flelte-g6'

registerEdge(
  'running-polyline',
  draggableControlNodeEdge('circle-ip-', {
    r: 3,
    fill: '#F40000',
    shadowColor: '#fff',
    shadowBlur: 25,
  }),
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
