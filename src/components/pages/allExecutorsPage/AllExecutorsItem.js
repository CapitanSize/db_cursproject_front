import React, {useState} from 'react';
import {Item} from "../../Item/Item";
import Grid from "@mui/material/Grid";
import styles from "../../order/OrderItem.module.css";
import {Button, Divider} from "@mui/material";
import ChooseModal from "../../modals/ChooseModal";
import {useNavigate} from "react-router-dom";

const AllExecutorsItem = ({executor}) => {

    const [open, setOpen] = useState(false)
    const chooseHandler = (e) => {
        e.stopPropagation()

    }
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/executor/${executor.id}`)
    }


    return (
        <Grid item >
            <Item>
                <Grid className={styles.orderName}>Исполнитель</Grid>
                <Divider/>
                <Grid>
                    {executor.name} {executor.second_name}
                </Grid>
                <Divider/>
            <Grid className={styles.orderDescription}>Рейтинг - {executor.rate ? executor.rate : 'Слишком мало оценок для выставления рейтинга'}</Grid>
                    <>
                        <Divider/>
                        <Grid className={styles.bottomWrapper} style={{justifyContent: 'center', margin: '10px'}}>
                            <Grid className={styles.button}>
                                    <Button
                                        style={{maxHeight: '50px'}}
                                        variant={'outlined'}
                                        color={'success'}
                                        onClick={handleClick}
                                    >
                                        Открыть профиль исполнителя
                                    </Button>
                            </Grid>
                        </Grid>
                    </>
            </Item>
        </Grid>
    );
};

export default AllExecutorsItem;