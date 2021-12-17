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

const prepareDataRowForPlot = (responseArray: DataResponseModel[], mesType: keyof DataResponseModel, timerow: number[]) => {
    var measurements = responseArray.map((el: DataResponseModel) => {
        console.log(new Date(el.datetime).getTime())
        if(timerow.includes(new Date(el.datetime).getTime())){
            return el[mesType] as number
        }else{
            return 0
        }      
    });
    return measurements;
}

const prepareDateTimeRowForPlot = (responseArray: DataResponseModel[]) => {
    var begin = new Date(responseArray[0]['datetime'])
    var end = new Date(responseArray[responseArray.length - 1]['datetime'])
    var timerow = [];
    var tempDate = begin;
    while(tempDate <= end){
        timerow.push(tempDate.getTime());
        tempDate = new Date(tempDate.getTime() + 60*60*1000)
    }
    // var timerow = responseArray.map((el: DataResponseModel) => {
    //     return el['datetime']
    // });
    console.log(timerow)
    return timerow;
}

export const Plots : React.FC = () => {

    const defaultData = useSelector((state: StoreState) => state.state.dataArray)!;
    const isLoading = useSelector((state: StoreState) => state.state.isLoadingDataArray);

    var plots;

    if(!isLoading || defaultData.length>1){
        plots = names.map((el, index) => {
            var timerow = prepareDateTimeRowForPlot(defaultData)
            var stringTimeRow = timerow.map( el => new Date(el).toString())
            var dataProp = {
                x: stringTimeRow,
                y: prepareDataRowForPlot(defaultData, el as keyof DataResponseModel, timerow),
                plotColor: colors[index],
                plotTitle: names[index]
            }
            return <PlotModel key={el} plotData={dataProp}/>
        })
    }

    // const getLabels = () => { 
    //     const names = ['datetime', 'CO_m', 'CO_sd', 'NO2_m', 'NO2_sd', 'NO_m', 'NO_sd', 'NOx_m', 'NOx_sd', 'O3_m', 'O3_sd', 'SO2_m', 'SO2_sd', 'PM10'];
    //     return names.reduce((obj, item) => {
    //       obj[item] = {title: item};
    //       return obj
    //     }, {});
    // }
      
    //   console.log(getLabels())
    
    return (
        <PlotGrid>
            <PlotsForm/>
            { (isLoading) ? <Spinner/> : plots}
        </PlotGrid>
    );
}