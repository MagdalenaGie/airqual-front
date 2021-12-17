import DateAdapter from '@mui/lab/AdapterDayjs';
// import { CSVLink } from "react-csv";
import { DesktopDatePicker, LocalizationProvider, TimePicker } from '@mui/lab';
import { Button, Divider, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { getFormattedDate } from '..';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/rootReducer';
import { getData } from '../../store/actions';

interface Props {
}

export const PlotsForm : React.FC<Props> = () => {

    useEffect(()=> {
        var now = new Date().getTime();
        var minutes = now % 3600000;
        var hour = 60 * 60 * 1000;
        var week = 7 * 24 * 60 * 60 * 1000;
        setStartDate(new Date(now - week - minutes - hour));
        setEndDate(new Date(now - minutes - hour));
    }, [])

    var isLoading = useSelector((state: StoreState) => state.state.isLoadingStatusArray);

    const [startDate, setStartDate] = useState<Date | null>(
        new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000 - 60 * 60 * 1000)
    );

    const handleSetStartDate = (newValue: any) => {
        setStartDate(dayjs(newValue).toDate());
    };

    const [endDate, setEndDate] = useState<Date | null>(
        new Date()
    );

    const handleEndDateChange = (newValue: Date | null) => {
        setEndDate(dayjs(newValue).toDate());
    };

    const authToken = useSelector((state: StoreState) => state.state.userData?.token)!;

    const dispatch = useDispatch(); 

    const handleLoadData = () => {
        if(startDate!.getTime() > endDate!.getTime()){
            console.log("zły przedział - alert")
        }
        console.log("in post ", startDate, endDate)
        dispatch(getData(getFormattedDate(startDate!), getFormattedDate(endDate!), authToken));
    }

    const handleExportToCSV = () => {
        console.log("export data to csv")
    }

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={3}
            margin="30px"
            alignItems='center'
            justifyContent='space-evenly'
            >
                <Typography 
                variant="h6" 
                align="center" 
                component="div"
                justifyContent='center'
                >
                    Wybierz przedział czasowy:
                </Typography>
                
                <Stack spacing={3}>
                    <DesktopDatePicker
                    label="Data"
                    value={startDate}
                    onChange={handleSetStartDate}
                    renderInput={(params) => <TextField {...params} />}
                    />
                    <TimePicker
                    openTo="hours"
                    views={['hours']}
                    inputFormat="HH:mm"
                    mask="__:__"
                    ampm={false}
                    label="Godzina"
                    value={startDate}
                    onChange={handleSetStartDate}
                    renderInput={(params) => <TextField {...params} />}
                    />
                </Stack>

                <Stack spacing={3}>
                    <DesktopDatePicker
                    label="Data"
                    value={endDate}
                    onChange={handleEndDateChange}
                    renderInput={(params) => <TextField {...params} />}
                    />
                    <TimePicker
                    openTo="hours"
                    views={['hours']}
                    inputFormat="HH:mm"
                    mask="__:__"
                    ampm={false}
                    label="Godzina"
                    value={endDate}
                    onChange={handleEndDateChange}
                    renderInput={(params) => <TextField {...params} />}
                    />
                </Stack>

                <Stack spacing={5} alignItems='stretch' justifyContent='center'>
                    <Button onClick={handleLoadData} variant="outlined" disabled={isLoading}>Przedstaw dane</Button>
                    <Button onClick={handleExportToCSV} variant="outlined" disabled={isLoading}>Eksportuj jako CSV</Button>
                </Stack>

            </Stack>
        </LocalizationProvider>
    );
}