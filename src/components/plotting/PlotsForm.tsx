import DateAdapter from '@mui/lab/AdapterDayjs';
import {CSVLink} from 'react-csv';
import { DesktopDatePicker, LocalizationProvider, TimePicker } from '@mui/lab';
import { Alert, Button, Divider, Stack, TextField, Typography } from '@mui/material';
import { Fragment, useState } from 'react';
import { useEffect } from 'react';
import { getFormattedDate } from '..';
import dayjs from 'dayjs';
import locale from 'dayjs/locale/pl';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/rootReducer';
import { getData } from '../../store/actions';

const labelsForCSV = [
    { label: "datetime", key: "datetime" },
    { label: "CO_m", key: "CO_m" },
    { label: "CO_sd", key: "CO_sd" },
    { label: "NO2_m", key: "NO2_m" },
    { label: "NO2_sd", key: "NO2_sd" },
    { label: "NO_m", key: "NO_m" },
    { label: "NO_sd", key: "NO_sd" },
    { label: "NOx_m", key: "NOx_m" },
    { label: "NOx_sd", key: "NOx_sd" },
    { label: "O3_m", key: "O3_m" },
    { label: "O3_sd", key: "O3_sd" },
    { label: "SO2_m", key: "SO2_m" },
    { label: "SO2_sd", key: "SO2_sd" },
    { label: "PM10", key: "PM10" }
]

interface Props {
}

export const PlotsForm : React.FC<Props> = () => {

    useEffect(()=> {
        var currDate = new Date(); 
        var now = currDate.getTime();
        var minutes = now % 3600000;
        var hour = 60 * 60 * 1000;
        var week = 7 * 24 * 60 * 60 * 1000;
        var timezone = currDate.getTimezoneOffset() * 60000;
        console.log(timezone)
        setStartDate(new Date(now - week - minutes - hour + timezone));
        setEndDate(new Date(now - minutes - hour + timezone));
    }, [])

    var isLoading = useSelector((state: StoreState) => state.state.isLoadingDataArray);
    var defaultData = useSelector((state: StoreState) => state.state.dataArray)!;

    const [showError, setShowError] = useState(
        {
            shouldRender: false,
            message: ""
        });

    const [startDate, setStartDate] = useState<Date | null>(new Date());

    const handleSetStartDate = (newValue: any) => {
        setStartDate(dayjs(newValue).toDate());
    };

    const [endDate, setEndDate] = useState<Date | null>(new Date());

    const handleEndDateChange = (newValue: Date | null) => {
        setEndDate(dayjs(newValue).toDate());
    };

    const authToken = useSelector((state: StoreState) => state.state.userData?.token)!;

    const dispatch = useDispatch(); 

    const handleLoadData = () => {
        var timezone = new Date().getTimezoneOffset() * 60000;
        if(startDate!.getTime() >= endDate!.getTime()){
            setShowError({
                shouldRender: true,
                message: "Nieprawidłowy przedział dat! Data początkowa jest większa lub równa względem daty końcowej"
            })
        }else if((endDate!.getTime() + 3600000 * 1 - timezone) >= new Date().getTime()){
            console.log(new Date(endDate!.getTime() + 3600000 * 2 + timezone), new Date())
            setShowError({
                shouldRender: true,
                message: "Nieprawidłowy przedział dat! Data końcowa jest późniejsza niż ostatni dostępny w bazie zapis pomiarów"
            })
        }else{
            var newStart = new Date(startDate!.getTime() - timezone);
            var newEnd = new Date(endDate!.getTime() - timezone);
            console.log(newStart, newEnd);
            console.log(getFormattedDate(newStart!), getFormattedDate(newEnd!));
            dispatch(getData(getFormattedDate(newStart!), getFormattedDate(newEnd!), authToken));
        }
    }

    return (
        <Fragment>
            {showError.shouldRender ? <Alert variant="outlined" severity="error" style={{margin: "20px"}} onClose={() => {setShowError({shouldRender: false, message:""})} }>{showError.message}</Alert> : null}
            <LocalizationProvider dateAdapter={DateAdapter} locale={locale}>
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
                        Wybierz przedział czasowy:<br/>
                        (w formacie GMT)
                    </Typography>
                    
                    <Stack spacing={3}>
                        <DesktopDatePicker
                        label="Data"
                        value={startDate}
                        mask="__.__.____"
                        maxDate={dayjs()}
                        onChange={handleSetStartDate}
                        renderInput={(params) =><TextField {...params} />}
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
                        mask="__.__.____"
                        // @ts-ignore
                        maxDate={dayjs()}
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
                        <Button variant="outlined" disabled={isLoading}>
                            {isLoading 
                            ? "Export to CSV"
                            : <CSVLink className="btn btn-primary" style={{textDecoration: 'none'}} data={defaultData} headers={labelsForCSV} filename="testCSV.csv">Export to CSV</CSVLink>}
                        </Button>
                    </Stack>

                </Stack>
            </LocalizationProvider>
        </Fragment>
        
    );
}