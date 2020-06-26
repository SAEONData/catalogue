export default (x, y, containerWidth, containerHeight, VERTICAL_OFFSET_TOP) => {
  const snapZoneX = 75
  const snapZoneY = 25 + VERTICAL_OFFSET_TOP
  const snapTop = y <= snapZoneY ? true : false
  const snapBottom = y >= containerHeight - snapZoneY ? true : false
  const snapLeft = x <= snapZoneX ? true : false
  const snapRight = x >= containerWidth - snapZoneX ? true : false

  let snapZone = null
  if (snapLeft && snapTop) {
    snapZone = 'TopLeft'
  } else if (snapRight && snapTop) {
    snapZone = 'TopRight'
  } else if (snapLeft && snapBottom) {
    snapZone = 'BottomLeft'
  } else if (snapRight && snapBottom) {
    snapZone = 'BottomRight'
  } else if (snapTop) {
    snapZone = 'Top'
  } else if (snapLeft) {
    snapZone = 'Left'
  } else if (snapRight) {
    snapZone = 'Right'
  } else if (snapBottom) {
    snapZone = 'Bottom'
  }

  return snapZone
}