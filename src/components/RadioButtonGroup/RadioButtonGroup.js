import React, {useState} from 'react';
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";

const RadioButtonGroup = (props) => {



    return (
        <FormControl>
            <FormLabel color={'success'} id="demo-radio-buttons-group-label">Типы заказов</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
            >
                {props?.types && props?.types.map((item, index) =>
                    <FormControlLabel  value={item} key={index} control={<Radio onChange={e => props.setType(e.target.value)} value={item}  color={'success'} />} label={item} />
                )}
                {/*<FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />*/}
            </RadioGroup>
        </FormControl>
    );
};

export default RadioButtonGroup;