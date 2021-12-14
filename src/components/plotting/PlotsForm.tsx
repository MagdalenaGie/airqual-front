import DateAdapter from '@mui/lab/AdapterDayjs';
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
        var hours = now % (3600000 * 24);
        setStartDate(new Date(now - hours - 3600000));
        setEndDate(new Date(now - minutes));
    }, [])

    const [startDate, setStartDate] = useState<Date | null>(
        new Date()
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
        // const body = {
		// 	start: getFormattedDate(startDate!),
		// 	stop: getFormattedDate(endDate!),
		//   };
		// const res = await axios.post("/history", body, {headers: { Authorization: `Bearer ${token}` }});

        console.log("in handle load");
        dispatch(getData(getFormattedDate(startDate!), getFormattedDate(endDate!), "haslomaslo"));
        
        //dispatch(getData(getFormattedDate(startDate!), getFormattedDate(endDate!), authToken));
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
                    <Button onClick={handleLoadData} variant="outlined">Przedstaw dane</Button>
                    <Button onClick={handleExportToCSV} variant="outlined">Eksportuj jako CSV</Button>
                </Stack>

            </Stack>
        </LocalizationProvider>
    );
}