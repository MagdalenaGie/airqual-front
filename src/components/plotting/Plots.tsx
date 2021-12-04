import { Fragment } from 'react';
import mockData from './mockResponse.json';
import { PlotModel } from './PlotModel';
import { PlotsForm } from './PlotsForm';
import styled from 'styled-components';

const PlotGrid = styled(Fragment)`
  display: grid;
  grid-template-rows: 1fr 4fr;
  height: 100vh;
`;

const names = ['CO_m', 'NO2_m', 'NO_m', 'NOx_m', 'O3_m', 'SO2_m', 'PM10'];
const colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];

interface Props {
    mesName: string
}

export interface DataModel {
    id: number,
    dev_id: number,
    datetime: string,
    NO_m: string,
    NO_sd: string,
    NO2_m: string,
    NO2_sd: string,
    NOx_m: string,
    NOx_sd: string,
    SO2_m: string,
    SO2_sd: string,
    O3_m: string,
    O3_sd: string,
    CO_m: string,
    CO_sd: string,
    PM10: string
}

const prepareDataRowForPlot = (responseArray: DataModel[], mesType: keyof DataModel) => {
    //kinda stupid approach, but not sure if this can be done better for now
    var measurements = responseArray.map((el: DataModel) => parseFloat(el[mesType].toString()));
    return measurements;
}

const prepareDateTimeRowForPlot = (responseArray: DataModel[]) => {
    var timerow = responseArray.map((el: DataModel) => el['datetime']);
    return timerow;
}

export const Plots : React.FC<Props> = (mesName) => {
    var plots = names.map((el, index) => {
        var dataProp = {
            x: prepareDateTimeRowForPlot(mockData),
            y: prepareDataRowForPlot(mockData, el as keyof DataModel),
            plotColor: colors[index],
            plotTitle: names[index]
        }
        return <PlotModel key={el} plotData={dataProp}/>
    })
    
    return (
        <PlotGrid>
            <PlotsForm/>
            {plots}
        </PlotGrid>
    );
}