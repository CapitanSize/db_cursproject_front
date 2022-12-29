import React, {useState} from 'react';
import Grid from "@mui/material/Grid";
import styles from "./CreateOrderModal.css";
import {Button, FormControl, InputLabel, Modal, Select, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useDispatch, useSelector} from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import {changeOrderStatusThunk} from "../../redux/App/appSlice";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #2e7d32',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
};

const itemStyle = {
    marginTop: '10px',
    marginBottom: '10px',
}

const ChangeStatusModal = (props) => {

    const statuses = useSelector(state => state.app.statuses)
    const [status, setStatus] = useState(null)
    const dispatch = useDispatch()


    return (
        <Grid  className={styles.wrapperModal}>
            <Modal
                open={props.open}
                onClose={props.onClose}
            >
                <Box sx={style}>
                    <Grid sx={itemStyle}>
                        <Typography >
                            Выберете новый статус заказа
                        </Typography>
                    </Grid>
                    <Grid sx={itemStyle}>
                        <FormControl style={{width: '210px'}} >
                            <InputLabel color={'success'}>Статус</InputLabel>
                            <Select
                                value={status}
                                label="Тип"
                                onChange={(e) => setStatus(e.target.value)}
                                color={'success'}
                            >
                                {statuses && statuses.map((item, index) => {
                                    return <MenuItem key={index} value={item}>{item}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid sx={itemStyle}>
                        <Button
                            onClick={(e) => {
                                e.stopPropagation()
                                props.onClose()
                                dispatch(changeOrderStatusThunk(props.id, status))
                            }}
                            style={{marginTop: '20px'}}
                            variant={'outlined'}
                            color={'success'}
                        >
                            Ок
                        </Button>
                    </Grid>

                </Box>
            </Modal>
        </Grid>
    );
};

export default ChangeStatusModal;