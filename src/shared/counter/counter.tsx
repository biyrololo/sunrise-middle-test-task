import { Button, ButtonGroup } from "@mui/material";

export interface CounterProps {
    value: number;
    onIncrement: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onDecrement: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Counter(props: CounterProps) {
    return (
        <ButtonGroup>
            <Button onClick={props.onDecrement}>-</Button>
            <Button disableTouchRipple onClick={e => {e.stopPropagation(); e.preventDefault()}}>{props.value}</Button>
            <Button onClick={props.onIncrement}>+</Button>
        </ButtonGroup>
    )
}