import ReactEcharts from 'echarts-for-react'
import theme from '../../../../lib/echarts-theme'
import catalogueTheme from '../../../../theme'

/*
select "NAME", ogc_fid
from "odp-925377aa-6914-41e8-8b92-f448ebe11f9c"
ORDER BY ogc_fid
limit 55
 */
export default ({ config, data, title, description }) => {
  const namesField = config['series-names']
  const valuesField = config['series-values']

  const markline1 = config['series-markline-1']
  const markline2 = config['series-markline-2']
  let targetsArr = []
  if (markline1) targetsArr.push(markline1)
  if (markline2) targetsArr.push(markline2)

  return (
    <ReactEcharts
      theme={theme}
      style={{ height: '100%', width: '100%' }}
      option={{
        // https://echarts.apache.org/en/option.html#title
        title: {
          text: title,
          subtext: description,
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c}',
        },
        // https://echarts.apache.org/en/option.html#xAxis
        xAxis: {
          show: true,
          type: 'category',

          data: data.map(entry => entry[namesField]),
          name: namesField,
          axisTick: {
            show: false,
          },
          axisLabel: { show: false },
        },
        //https://echarts.apache.org/en/option.html#yAxis
        yAxis: {
          type: 'value',
          name: valuesField,
        },
        // https://echarts.apache.org/en/option.html#dataZoom
        dataZoom: [
          {
            show: true,
            start: 0,
            end: 100,
            bottom: -3,
            height: '3%',
          },
          {
            type: 'inside',
          },
        ],
        //https://echarts.apache.org/en/option.html#series
        series: [
          // Bar data
          {
            data: data.map(entry => entry[valuesField]),
            type: 'bar',
            label: {
              show: true,
              rotate: 50,
              align: 'right',
              verticalAlign: 'top',
              position: 'insideBottom',
              distance: -10,
              formatter: '{b}',
              fontSize: 11,

              color: catalogueTheme.palette.primary.main,
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
            // https://echarts.apache.org/en/option.html#series-bar.markLine
            markLine: {
              lineStyle: {
                type: 'dotted',
                color: 'orange',
                width: 2,
              },
              symbol: 'none',
              data: targetsArr.map(target => {
                return { name: target.name, yAxis: target.value }
              }),
            },
          },
        ],
      }}
    />
  )
}
