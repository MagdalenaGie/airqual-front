//import styled from 'styled-components';
import Plot from 'react-plotly.js';

interface Props {
    plotData: {
      x: string[],
      y: number[],
      plotColor: string,
      plotTitle: string
    }
}

export const PlotModel : React.FC<Props> = ({plotData}) => {
  var scrWid = window.screen.availWidth - 250;
    return (
        <Plot data={[{
          x: plotData.x,
          y: plotData.y,
          type: 'scatter',
          mode: 'lines+markers',
          marker: {color: plotData.plotColor},
          connectgaps: false
        }]}
        layout={ { title: plotData.plotTitle, width: scrWid} }
      />
    );
}