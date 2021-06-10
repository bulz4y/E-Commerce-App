import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, Checkbox, RadioGroup, Radio, Typography, Accordion, AccordionSummary, AccordionDetails, FormControlLabel, } from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { updatePrice, updateTypes } from '../actions/filterActions/filterActions';



const useStyles = makeStyles((theme) => {
    return {
        accordion: {
                boxShadow: 'none',
        },

        title: {
                padding: `0 0 ${theme.spacing(2)}px ${theme.spacing(2)}px`
        }
    }
})

function Filters() {
    const classes = useStyles();

    const [expanded, setExpanded] = useState(true);
    const [expanded2, setExpanded2] = useState(true);

    const filters = useSelector((state) => state.filters);

    const dispatch = useDispatch();

    const productTypes = useSelector((state) => state.products.productTypes);


    const handleCategoryChange = (e) => {
        let val = e.target.value;
        let checked = e.target.checked;

        let updatedTypes = [...filters.types];

        if(checked) {
            updatedTypes.push(val);
        } else {
            updatedTypes = updatedTypes.filter((type) => {
                return type !== val;
            });
        }
        dispatch(updateTypes(updatedTypes));
    }

    const handlePriceChange = (e) => {
      let val = e.target.value;

      let price = val.split(',');

      dispatch(updatePrice(price));


    };

    return (
        <>
            <Typography variant='h5' className={classes.title}>
                Filters:
            </Typography>
            <Accordion className={classes.accordion} expanded={expanded} onChange={() => setExpanded(!expanded)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>
                        Product Type
                    </Typography>
                </AccordionSummary>
                <AccordionDetails style={{flexDirection: 'column'}}>
                    {productTypes.map((type) => {
                        return (
                            <FormControlLabel key={type}
                                style={{paddingLeft: '1rem'}}                                                    
                                onChange={handleCategoryChange}
                                control={<Checkbox checked={filters.types.includes(type) ? true : false} />}
                                label={type}
                                value={type}
                            >
                                
                            </FormControlLabel>
                        )
                    })}
                </AccordionDetails>
            </Accordion>
            <Accordion className={classes.accordion} expanded={expanded2} onChange={() => setExpanded2(!expanded2)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>
                        Price
                    </Typography>
                </AccordionSummary>
                <AccordionDetails style={{flexDirection: 'column'}}>


                    
                    <RadioGroup name="price" value={filters.price.length > 0 ? filters.price.join(',') : '0'} onChange={handlePriceChange}>
                    <FormControlLabel
                        style={{paddingLeft: '1rem'}}                    
                            onClick={(event) => event.stopPropagation()}
                            onFocus={(event) => event.stopPropagation()}
                            control={<Radio />}
                            label="all"
                            value='0'
                        />
                    <FormControlLabel
                        style={{paddingLeft: '1rem'}}                    
                            onClick={(event) => event.stopPropagation()}
                            onFocus={(event) => event.stopPropagation()}
                            control={<Radio />}
                            label="$10-$100"
                            value='10,100'
                        />
                        <FormControlLabel
                        style={{paddingLeft: '1rem'}}                                                    
                            onClick={(event) => event.stopPropagation()}
                            onFocus={(event) => event.stopPropagation()}
                            control={<Radio />}
                            label="$100-$500"
                            value='100,500'
                        />
                        <FormControlLabel
                        style={{paddingLeft: '1rem'}}                                                    
                            onClick={(event) => event.stopPropagation()}
                            onFocus={(event) => event.stopPropagation()}
                            control={<Radio />}
                            label="$500-$1000"
                            value='500,1000'
                        />
                        <FormControlLabel
                        style={{paddingLeft: '1rem'}}                                                    
                            onClick={(event) => event.stopPropagation()}
                            onFocus={(event) => event.stopPropagation()}
                            control={<Radio />}
                            label="$1000+"
                            value='1000'
                        />
                    </RadioGroup>
                    
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default Filters;