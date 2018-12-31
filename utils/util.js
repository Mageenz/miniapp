const areaData = require('../assets/common/areaData.js')

const formatTime = time => {
  const date = new Date(time)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  // return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const translateRegionNameToCode = val => {
  let codes = []
  
  areaData.forEach(province => {
    if(province.label === val[0]) {
      codes[0] = province.value

      if(province.children) {
        province.children.forEach(city => {
          if(city.label === val[1]) {
            codes[1] = city.value

            if(city.children) {
              city.children.forEach(area => {
                if(area.label === val[2]) {
                  codes[2] = area.value
                }
              })
            }
          }
        })
      }
      return
    }
  })

  return codes
}

const translateRegionCodeToName = val => {
  let names = []

  areaData.forEach(province => {
    if (province.value === val[0]) {
      names[0] = province.label

      if (province.children) {
        province.children.forEach(city => {
          if (city.value === val[1]) {
            names[1] = city.label

            if (city.children) {
              city.children.forEach(area => {
                if (area.value === val[2]) {
                  names[2] = area.label
                }
              })
            }
          }
        })
      }
      return
    }
  })

  return names
}

module.exports = {
  formatTime,
  translateRegionNameToCode,
  translateRegionCodeToName
}
