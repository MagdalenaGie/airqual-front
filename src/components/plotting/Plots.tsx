import { PlotModel } from './PlotModel';
import { PlotsForm } from './PlotsForm';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { StoreState } from '../../store/rootReducer';
import { DataResponseModel } from '../../store/types';
import { Spinner } from '../ui/Spinner/Spinner';
import { useState } from 'react';

const PlotGrid = styled.div`
  display: grid;
  grid-template-rows: 1fr 4fr;
  height: 100vh;
`;

const names = ['CO_m', 'NO2_m', 'NO_m', 'NOx_m', 'O3_m', 'SO2_m', 'PM10'];
const colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];

const prepareDataRowForPlot = (responseArray: DataResponseModel[], mesType: keyof DataResponseModel, timerow: number[]) => {
    var measurements:number[] = [];
    var iter = 0;
    timerow.forEach(el => {
        var rawTime = new Date(responseArray[iter].datetime).getTime();
        var mesTime = rawTime - rawTime % 3600000 
        if(el === mesTime){
            measurements.push(responseArray[iter][mesType] as number)
            iter += 1
        }else{
            measurements.push(NaN)
        }   
    })
    return measurements;
}

const prepareDateTimeRowForPlot = (responseArray: DataResponseModel[]) => {
    var begin = new Date(responseArray[0]['datetime'])
    var beginms = begin.getTime() - begin.getTime() % 3600000;
    var end = new Date(responseArray[responseArray.length - 1]['datetime'])
    var endms = end.getTime() - end.getTime() % 3600000;
    var timerow = [];
    var tempDate = beginms;
    while(tempDate <= endms){
        timerow.push(tempDate);
        tempDate = tempDate + 3600000;
    }
    return timerow;
}

export const prepareDatesForPlot = (date: Date) => {
    return `${date.toISOString().slice(0, 10)} ${date.toISOString().slice(11, 16)}`;
  }

export const Plots : React.FC = () => {

    const defaultData = useSelector((state: StoreState) => state.state.dataArray)!;
    const isLoading = useSelector((state: StoreState) => state.state.isLoadingDataArray);

    var plots;

    if(!isLoading && defaultData.length>1){
        plots = names.map((el, index) => {
            var timerow = prepareDateTimeRowForPlot(defaultData)
            var stringTimeRow = timerow.map( el => prepareDatesForPlot(new Date(el)))
            var dataProp = {
                x: stringTimeRow,
                y: prepareDataRowForPlot(defaultData, el as keyof DataResponseModel, timerow),
                plotColor: colors[index],
                plotTitle: names[index]
            }
            return <PlotModel key={el} plotData={dataProp}/>
        })
    }
    
    return (
        <PlotGrid>
            <PlotsForm/>
            { (isLoading) ? <Spinner/> : plots}
        </PlotGrid>
    );
}