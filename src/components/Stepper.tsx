import {useEffect, useState} from "react";

export default function Stepper({ min = 0, max = 10, step = 1, id = 0, setValue, value, disabled}) {
    useEffect(() => {
        localStorage.setItem("stepperValue" + id, String(value));
    }, [value, id]);

    const increment = () => {
        if (value < max) {
            setValue(value + step);
        }
    };

    const decrement = () => {
        if (value > min) {
            setValue(value - step);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <span className="w-8 text-center cursor-default select-none">{value}/{max}</span>

            <div className="flex flex-col">
                <button
                    onClick={increment}
                    disabled={value >= max || disabled}
                    className="flex text-black items-center justify-center h-5 w-5 mb-1 active:scale-95 bg-primary rounded disabled:cursor-not-allowed disabled:bg-muted-foreground"
                >
                    +
                </button>

                <button
                    onClick={decrement}
                    disabled={value <= min || disabled}
                    className="flex text-black items-center justify-center h-5 w-5 active:scale-95 bg-primary rounded disabled:cursor-not-allowed disabled:bg-muted-foreground"
                >
                    -
                </button>
            </div>
        </div>
    );
}