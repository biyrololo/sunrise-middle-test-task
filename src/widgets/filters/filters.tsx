import { useTypedDispatch, useTypedSelector } from '@/app/store'
import classes from './filters.module.scss'
import { setIsNew, setPrice } from '@/entities/product';
import { FormControlLabel, Slider, Switch } from '@mui/material';

export function Filters(){
    const filters = useTypedSelector(state => state.filters);
    const dispatch = useTypedDispatch();

    const handleUpdatePrice = (value: [number, number]) => {
        dispatch(setPrice(value));
    }

    const handleUpdateRecent = (value: boolean) => {
        dispatch(setIsNew(value));
    }

    return (
        <section className={classes.filters}>
            <h3>Фильтры</h3>
            <Slider
                value={filters.price}
                onChange={(_, value) => handleUpdatePrice(value as [number, number])}
                min={0}
                max={300_000}
                valueLabelDisplay='auto'
                marks={[
                    {
                        value: 0,
                        label: '0 ₽'
                    },
                    {
                        value: 300_000,
                        label: '300 000 ₽'
                    }
                ]}
            />
            <FormControlLabel
            control={
            <Switch
            checked={filters.isNew}
            onChange={(_, value) => handleUpdateRecent(value)}
            />
            }
            label="Только новинки"
        />
        </section>
    )
}