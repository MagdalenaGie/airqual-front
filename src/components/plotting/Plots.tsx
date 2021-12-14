import { Fragment } from 'react';
import { PlotModel } from './PlotModel';
import { PlotsForm } from './PlotsForm';
import styled from 'styled-components';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from '../../store/rootReducer';
import { DataResponseModel } from '../../store/types';
import { Spinner } from '../ui/Spinner/Spinner';

const PlotGrid = styled.div`
  display: grid;
  grid-template-rows: 1fr 4fr;
  height: 100vh;
`;

const names = ['CO_m', 'NO2_m', 'NO_m', 'NOx_m', 'O3_m', 'SO2_m', 'PM10'];
const colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];

const prepareDataRowForPlot = (responseArray: DataResponseModel[], mesType: keyof DataResponseModel) => {
    var measurements = responseArray.map((el: DataResponseModel) => parseFloat(el[mesType].toString()));
    return measurements;
}

const prepareDateTimeRowForPlot = (responseArray: DataResponseModel[]) => {
    var timerow = responseArray.map((el: DataResponseModel) => {
        return el['datetime']
    });
    return timerow;
}

export const Plots : React.FC = () => {

    const defaultData = useSelector((state: StoreState) => state.state.dataArray)!;

    var plots;

    // var plots: ReactElement | JSX.Element[]
    // plots = <Spinner/>

    // if(dataToProcess.length > 0){
    //     plots = names.map((el, index) => {
    //         var dataProp = {
    //             x: prepareDateTimeRowForPlot(dataToProcess),
    //             y: prepareDataRowForPlot(dataToProcess, el as keyof DataResponseModel),
    //             plotColor: colors[index],
    //             plotTitle: names[index]
    //         }
    //         return <PlotModel key={el} plotData={dataProp}/>
    //     })
    // }

    plots = names.map((el, index) => {
        var dataProp = {
            x: prepareDateTimeRowForPlot(defaultData),
            y: prepareDataRowForPlot(defaultData, el as keyof DataResponseModel),
            plotColor: colors[index],
            plotTitle: names[index]
        }
        return <PlotModel key={el} plotData={dataProp}/>
    })
    
    return (
        <PlotGrid>
            <PlotsForm/>
            { (defaultData.length < 1) ? <Spinner/> : null}
            { (defaultData.length > 1) ? plots : null }
        </PlotGrid>
    );
}