import React, {useState} from 'react';
import {
    Alert,
    Button,
    FormControl,
    InputLabel,
    Modal,
    Select,
    TextareaAutosize,
    TextField,
    Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import styles from './CreateOrderModal.css'
import Grid from "@mui/material/Grid";
import {useDispatch, useSelector} from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import {createOrderThunk} from "../../redux/App/appSlice";

const CreateOrderModal = (props) => {

    const dispatch = useDispatch()
    const [orderTitle, setOrderTitle] = useState('')
    const [orderDescription, setOrderDescription] = useState('')
    const [orderPrice, setOrderPrice] = useState('')
    const [orderFiles, setOrderFiles] = useState([])
    const [orderType, setOrderType] = useState('')
    const types = useSelector(state => state?.app?.orderTypes?.types)
    const [error, setError] = useState(null)

    const formSubmit = () => {
        if (orderTitle && orderDescription && orderPrice){
            const order = {
                title: orderTitle,
                description: orderDescription,
                type: orderType,
                price: orderPrice,
                files: urlCode(orderFiles[0]),
            }
            dispatch(createOrderThunk(order))
        } else {
            setError('Что-то пошло не так! Убедитесь, что все поля заполнены.')
        }
    }

    const urlCode = (url) => {
        if (url) {
            const coder = /:/gi;
            return String(url.split('blob:')[1].replace(coder, '%'))
        }
    }

    const uploadFile = (e) => {
        const files = URL.createObjectURL(e.target.files[0])
        setOrderFiles([...orderFiles, files])
    }

    console.log(urlCode(orderFiles[0]))


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
            {error && <Alert onClose={() => {setError(null)}} className={styles.alert} severity={'error'}>{error}</Alert>}
            <Modal
                open={props.open}
                onClose={props.onClose}
            >
                <Box sx={style}>
                    <Grid sx={itemStyle}>
                        <Typography >
                            Меню создания заказ
                        </Typography>
                    </Grid>
                    <Grid sx={itemStyle}>
                        <TextField placeholder={'Название заказа'} type={"text"} color={'success'} onChange={(e) => setOrderTitle(e.target.value)}/>
                    </Grid>
                    <Grid sx={itemStyle}>
                        <TextareaAutosize style={{width: '210px', height: '56px', maxWidth: '210px', minWidth: '210px', minHeight: '30px'}} placeholder={'Описание заказа'} type={"text"} color={'success'} onChange={(e) => setOrderDescription(e.target.value)}/>
                    </Grid>
                    <Grid sx={itemStyle}>
                        <FormControl style={{width: '210px'}} >
                            <InputLabel color={'success'}>Тип</InputLabel>
                            <Select
                                value={orderType}
                                label="Тип"
                                onChange={(e) => setOrderType(e.target.value)}
                                color={'success'}
                            >
                                {types && types.map((type, index) => {
                                    return <MenuItem key={index} value={type}>{type}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid sx={itemStyle}>
                        <TextField placeholder={'Ориентировочная цена заказа'} type={"number"} color={'success'} onChange={(e) => setOrderPrice(e.target.value)}/>
                    </Grid>
                    <Grid sx={itemStyle}>
                        <Button className={styles.uploadButton} variant="outlined" color={'success'} component="label">
                            Загрузить файлы
                            <input onChange={uploadFile} hidden multiple accept="image/*" type="file" />
                        </Button>
                    </Grid>
                    <Grid sx={itemStyle}>
                        <Button
                            onClick={formSubmit}
                            style={{marginTop: '20px'}}
                            variant={'outlined'}
                            color={'success'}
                        >
                            Создать заказ
                        </Button>
                    </Grid>

                </Box>
            </Modal>
        </Grid>
    );
};

export default CreateOrderModal;