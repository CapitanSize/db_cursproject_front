import React from 'react';
import Grid from "@mui/material/Grid";
import styles from "./CreateOrderModal.css";
import {Button, Modal, Typography} from "@mui/material";
import Box from "@mui/material/Box";

const ChooseModal = (props) => {

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


    return (
        <Grid  className={styles.wrapperModal}>
            <Modal
                open={props.open}
                onClose={props.onClose}
            >
                <Box sx={style}>
                    <Grid sx={itemStyle}>
                        <Typography >
                            Вы успешно выбрали исполнителя - {props.name} {props.secondName}
                        </Typography>
                        <br/>
                        <Typography >
                            Скоро он свяжется с вами
                        </Typography>
                    </Grid>
                    <Grid sx={itemStyle}>
                        <Button
                            onClick={(e) => {
                                e.stopPropagation()
                                props.onClose()
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

export default ChooseModal;