import { registerEdge, registerNode } from '$lib/index'

registerEdge(
  'running-polyline',
  {
    afterDraw(cfg, group) {
      if (!cfg || !group) {
        return
      }

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
      group.sort() // ???????????????zIndex ??????
      const delayBase = Math.random() * 2000
      back1.animate(
        {
          // ????????????????????????
          r: r + 10,
          opacity: 0.0,
        },
        {
          repeat: true, // ??????
          duration: 3000,
          easing: 'easeCubic',
          delay: delayBase, // ?????????
        },
      )
      back2.animate(
        {
          // ????????????????????????
          r: r + 10,
          opacity: 0.0,
        },
        {
          repeat: true, // ??????
          duration: 3000,
          easing: 'easeCubic',
          delay: delayBase + 1000, // 1 ?????????
        },
      )
      back3.animate(
        {
          // ????????????????????????
          r: r + 10,
          opacity: 0.0,
        },
        {
          repeat: true, // ??????
          duration: 3000,
          easing: 'easeCubic',
          delay: delayBase + 2000, // 2 ?????????
        },
      )
    },
  },
  'circle',
)

export * from './App.svelte'
export * from '$lib/index'
