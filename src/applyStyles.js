function isObject (o) {
  return !!o && o.constructor === Object
}

function setStyle (node, prop, value) {
  if (node.style[prop] !== value) {
    node.style[prop] = value
  }
}

export default function applyStyles (node, styles, breakpoint) {
  if (isObject(styles)) {
    Object.entries(styles).forEach(([prop, value]) => {
      if (isObject(value)) {
        if (value.hasOwnProperty(breakpoint)) {
          setStyle(node, prop, value[breakpoint])
        }
      } else {
        setStyle(node, prop, value)
      }
    })
  }
}
