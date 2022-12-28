import React, {useEffect} from 'react';
import Grid from "@mui/material/Grid";
import AllExecutorsList from "./AllExecutorsList";
import {fetchAllExecutors} from "../../../redux/App/appSlice";
import {useDispatch, useSelector} from "react-redux";
import Typography from "@mui/material/Typography";

const AllExecutorsPage = () => {

    const dispatch = useDispatch()
    const executors = useSelector(state => state?.app?.executorsList)

    useEffect(() => {
        dispatch(fetchAllExecutors())
    }, [])


    return (
        <Grid>
            {executors ?
                <Grid>
                    <AllExecutorsList executors={executors}/>
                </Grid>
            :
                <Grid>
                    <Typography>
                        К сожалению, список исполнителей пуст(
                    </Typography>
                </Grid>
            }

        </Grid>
    );
};

export default AllExecutorsPage;