import * as echarts from 'echarts';
import { useEffect } from 'react';

type EChartsOption = echarts.EChartsOption;

const BarChart = ({title} : {title:string}) => {
  useEffect(() => {
    const chartDom = document.getElementById('main')!;
    const myChart = echarts.init(chartDom);

    const option: EChartsOption = {
      title: {
        text: title
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    };

    option && myChart.setOption(option);
  })
  return(
    <div><div id='main' style={{width: 500, height: 300}}></div></div>
  )
}

export default BarChart