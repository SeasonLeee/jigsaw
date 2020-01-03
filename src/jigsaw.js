import  './jigsaw.css'

let w = 310 // canvas宽度
let h = 155 // canvas高度
const l = 42 // 滑块边长
const r = 9 // 滑块半径
const PI = Math.PI
const L = l + r * 2 + 3 // 滑块实际边长

function getRandomNumberByRange (start, end) {
  return Math.round(Math.random() * (end - start) + start)
}

function createCanvas (width, height) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  return canvas
}

function createImg (onload) {
  const img = new Image()
  img.crossOrigin = "Anonymous"
  img.onload = onload
  img.onerror = () => {
   img.setSrc(getRandomImgSrc())
  }

  img.setSrc = function (src) {
    const isIE = window.navigator.userAgent.indexOf('Trident') > -1
    if (isIE) { // IE浏览器无法通过img.crossOrigin跨域，使用ajax获取图片blob然后转为dataURL显示
      const xhr = new XMLHttpRequest()
      xhr.onloadend = function (e) {
        const file = new FileReader() // FileReader仅支持IE10+
        file.readAsDataURL(e.target.response)
        file.onloadend = function (e) {
          img.src = e.target.result
        }
      }
      xhr.open('GET', src)
      xhr.responseType = 'blob'
      xhr.send()
    }
    else img.src = src
  }

  img.setSrc(getRandomImgSrc())
  return img
}

function createElement (tagName, className) {
  const elment = document.createElement(tagName)
  elment.className = className
  return elment
}

function addClass (tag, className) {
  tag.classList.add(className)
}

function removeClass (tag, className) {
  tag.classList.remove(className)
}

function getRandomImgSrc () {
  // return `https://picsum.photos/${w}/${h}/?image=${getRandomNumberByRange(0, 1084)}`
  return `data:image/jpeg;base64,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`
}

function draw (ctx, x, y, operation) {
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI)
  ctx.lineTo(x + l, y)
  ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI)
  ctx.lineTo(x + l, y + l)
  ctx.lineTo(x, y + l)
  ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true)
  ctx.lineTo(x, y)
  ctx.lineWidth = 2
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)'
  ctx.stroke()
  ctx[operation]()
  ctx.globalCompositeOperation = 'destination-over'
}

function sum (x, y) {
  return x + y
}

function square (x) {
  return x * x
}

class jigsaw {
  constructor ({ el, width = 310, height = 155, onSuccess, onFail, onRefresh }) {
    w = width
    h = height
    el.style.position = 'relative'
    el.style.width = w + 'px'
    Object.assign(el.style, {
      position: 'relative',
      width: w + 'px',
      margin: '0 auto'
    })
    this.el = el
    this.onSuccess = onSuccess
    this.onFail = onFail
    this.onRefresh = onRefresh
  }

  init () {
    this.initDOM()
    this.initImg()
    this.bindEvents()
  }

  initDOM () {
    const canvas = createCanvas(w, h) // 画布
    const block = canvas.cloneNode(true) // 滑块
    const sliderContainer = createElement('div', 'sliderContainer')
    sliderContainer.style.width = w + 'px'
    const refreshIcon = createElement('div', 'refreshIcon')
    const sliderMask = createElement('div', 'sliderMask')
    const slider = createElement('div', 'slider')
    const sliderIcon = createElement('span', 'sliderIcon')
    const text = createElement('span', 'sliderText')

    block.className = 'block'
    text.innerHTML = '向右滑动填充拼图'

    const el = this.el
    el.appendChild(canvas)
    el.appendChild(refreshIcon)
    el.appendChild(block)
    slider.appendChild(sliderIcon)
    sliderMask.appendChild(slider)
    sliderContainer.appendChild(sliderMask)
    sliderContainer.appendChild(text)
    el.appendChild(sliderContainer)

    Object.assign(this, {
      canvas,
      block,
      sliderContainer,
      refreshIcon,
      slider,
      sliderMask,
      sliderIcon,
      text,
      canvasCtx: canvas.getContext('2d'),
      blockCtx: block.getContext('2d')
    })
  }

  initImg () {
    const img = createImg(() => {
      this.draw()
      this.canvasCtx.drawImage(img, 0, 0, w, h)
      this.blockCtx.drawImage(img, 0, 0, w, h)
      const y = this.y - r * 2 - 1
      const ImageData = this.blockCtx.getImageData(this.x - 3, y, L, L)
      this.block.width = L
      this.blockCtx.putImageData(ImageData, 0, y)
    })
    this.img = img
  }

  draw () {
    // 随机创建滑块的位置
    this.x = getRandomNumberByRange(L + 10, w - (L + 10))
    this.y = getRandomNumberByRange(10 + r * 2, h - (L + 10))
    draw(this.canvasCtx, this.x, this.y, 'fill')
    draw(this.blockCtx, this.x, this.y, 'clip')
  }

  clean () {
    this.canvasCtx.clearRect(0, 0, w, h)
    this.blockCtx.clearRect(0, 0, w, h)
    this.block.width = w
  }

  bindEvents () {
    this.el.onselectstart = () => false
    this.refreshIcon.onclick = () => {
      this.reset()
      typeof this.onRefresh === 'function' && this.onRefresh()
    }

    let originX, originY, trail = [], isMouseDown = false

    const handleDragStart = function (e) {
      originX = e.clientX || e.touches[0].clientX
      originY = e.clientY || e.touches[0].clientY
      isMouseDown = true
    }

    const handleDragMove = (e) => {
      if (!isMouseDown) return false
      const eventX = e.clientX || e.touches[0].clientX
      const eventY = e.clientY || e.touches[0].clientY
      const moveX = eventX - originX
      const moveY = eventY - originY
      if (moveX < 0 || moveX + 38 >= w) return false
      this.slider.style.left = moveX + 'px'
      const blockLeft = (w - 40 - 20) / (w - 40) * moveX
      this.block.style.left = blockLeft + 'px'

      addClass(this.sliderContainer, 'sliderContainer_active')
      this.sliderMask.style.width = moveX + 'px'
      trail.push(moveY)
    }

    const handleDragEnd = (e) => {
      if (!isMouseDown) return false
      isMouseDown = false
      const eventX = e.clientX || e.changedTouches[0].clientX
      if (eventX === originX) return false
      removeClass(this.sliderContainer, 'sliderContainer_active')
      this.trail = trail
      const { spliced, verified } = this.verify()
      if (spliced) {
        if (verified) {
          addClass(this.sliderContainer, 'sliderContainer_success')
          typeof this.onSuccess === 'function' && this.onSuccess()
        } else {
          addClass(this.sliderContainer, 'sliderContainer_fail')
          this.text.innerHTML = '请再试一次'
          this.reset()
        }
      } else {
        addClass(this.sliderContainer, 'sliderContainer_fail')
        typeof this.onFail === 'function' && this.onFail()
        setTimeout(() => {
          this.reset()
        }, 1000)
      }
    }
    this.slider.addEventListener('mousedown', handleDragStart)
    this.slider.addEventListener('touchstart', handleDragStart)
    this.block.addEventListener('mousedown', handleDragStart)
    this.block.addEventListener('touchstart', handleDragStart)
    document.addEventListener('mousemove', handleDragMove)
    document.addEventListener('touchmove', handleDragMove)
    document.addEventListener('mouseup', handleDragEnd)
    document.addEventListener('touchend', handleDragEnd)
  }

  verify () {
    const arr = this.trail // 拖动时y轴的移动距离
    const average = arr.reduce(sum) / arr.length
    const deviations = arr.map(x => x - average)
    const stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length)
    const left = parseInt(this.block.style.left)
    return {
      spliced: Math.abs(left - this.x) < 10,
      verified: stddev !== 0, // 简单验证拖动轨迹，为零时表示Y轴上下没有波动，可能非人为操作
    }
  }

  reset () {
    this.sliderContainer.className = 'sliderContainer'
    this.slider.style.left = 0
    this.block.style.left = 0
    this.sliderMask.style.width = 0
    this.clean()
    this.img.setSrc(getRandomImgSrc())
  }
}

window.jigsaw = {
  init: function (opts) {
    return new jigsaw(opts).init()
  }
}
