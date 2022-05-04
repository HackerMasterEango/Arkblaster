const trainData = (context, tag, data, children, normalizationType) => {
  if (isDef(data) && isDef(data.__ob__)) {
    process.env.NODE_ENV !== 'production' &&
      warn(
        `Avoid using observed data object as vnode data: ${JSON.stringify(data)}\n` +
          'Always create fresh vnode data objects in each render!',
        context
      )
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (process.env.NODE_ENV !== 'production' && isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
    if (!__WEEX__ || !('@binding' in data.key)) {
      warn('Avoid using non-primitive value as key, ' + 'use string/number value instead.', context)
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) && typeof children[0] === 'function') {
    data = data || {}
    data.scopedSlots = { default: children[0] }
    children.length = 0
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children)
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children)
  }
  let vnode, ns
  if (typeof tag === 'string') {
    let Ctor
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag)
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if (process.env.NODE_ENV !== 'production' && isDef(data) && isDef(data.nativeOn) && data.tag !== 'component') {
        warn(`The .native modifier for v-on is only valid on components but it was used on <${tag}>.`, context)
      }
      vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context)
    } else if ((!data || !data.pre) && isDef((Ctor = resolveAsset(context.$options, 'components', tag)))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag)
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(tag, data, children, undefined, undefined, context)
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children)
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) applyNS(vnode, ns)
    if (isDef(data)) registerDeepBindings(data)
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS(vnode, ns, force) {
  vnode.ns = ns
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined
    force = true
  }
  if (isDef(vnode.children)) {
    for (let i = 0, l = vnode.children.length; i < l; i++) {
      const child = vnode.children[i]
      if (isDef(child.tag) && (isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force)
      }
    }
  }
}

// above code was just randomly copy/pasted from vueJS open source code: https://github.com/vuejs/vue/blob/dev/src/core/vdom/create-element.js
// now the actual program code...

// pretty pring
const matprint = mat => {
  let shape = [mat.length, mat[0].length]
  function col(mat, i) {
    return mat.map(row => row[i])
  }
  let colMaxes = []
  for (let i = 0; i < shape[1]; i++) {
    colMaxes.push(
      Math.max.apply(
        null,
        col(mat, i).map(n => n.toString().length)
      )
    )
  }

  mat.forEach(row => {
    console.log.apply(
      null,
      row.map((val, j) => {
        return new Array(colMaxes[j] - val.toString().length + 1).join(' ') + val.toString() + '  '
      })
    )
  })
}

// nerd shit
const makeRandomBitArray = () => {
  return [
    Math.round(Math.random()),
    Math.round(Math.random()),
    Math.round(Math.random()),
    Math.round(Math.random()),
    Math.round(Math.random()),
    Math.round(Math.random()),
    Math.round(Math.random()),
    Math.round(Math.random()),
    Math.round(Math.random()),
    Math.round(Math.random()),
    Math.round(Math.random()),
    Math.round(Math.random()),
    Math.round(Math.random()),
    Math.round(Math.random()),
    Math.round(Math.random()),
    Math.round(Math.random()),
    Math.round(Math.random()),
    Math.round(Math.random()),
    Math.round(Math.random()),
    Math.round(Math.random()),
    Math.round(Math.random())
  ]
}

let bitMatrice = [
  makeRandomBitArray(),
  makeRandomBitArray(),
  makeRandomBitArray(),
  makeRandomBitArray(),
  makeRandomBitArray(),
  makeRandomBitArray(),
  makeRandomBitArray(),
  makeRandomBitArray(),
  makeRandomBitArray(),
  makeRandomBitArray(),
  makeRandomBitArray(),
  makeRandomBitArray(),
  makeRandomBitArray(),
  makeRandomBitArray(),
  makeRandomBitArray()
]

const calculate = async () => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 30; j++) {
      await new Promise(resolve => setTimeout(resolve, 100))
      matprint(bitMatrice)
      console.log('\n')
    }
    console.log('\n')

    // random gibberish
    console.log('........querying map.....')
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('........finding optimal plan.....')
    await new Promise(resolve => setTimeout(resolve, 3000))
    console.log('........applying quantum transformation.....')
    await new Promise(resolve => setTimeout(resolve, 3000))
    console.log('.......verifying.....')
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('\n')
  }
}

const results = async () => {
  await calculate()

console.log('.........................')
// oh wow success amazin!
console.log('map plan successfully generated!')
}

results();
