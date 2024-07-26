import React, { useEffect, useRef, useState } from 'react';

interface SliderProps {
    min: number;
    max: number;
    step?: number;
    value: number;
    onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ min, max, step = 1, value, onChange }) => {
    const [sliderValue, setSliderValue] = useState(value);
    const sliderRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (sliderRef.current) {
            const slider = sliderRef.current;
            slider.value = sliderValue.toString();
        }
    }, [sliderValue]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value);
        setSliderValue(newValue);
        onChange(newValue);
    };

    // Calculate the percentage of sliderValue relative to min and max
    const percentage = ((sliderValue - min) / (max - min)) * 100;

    return (
        <div className="">
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={sliderValue}
                ref={sliderRef}
                onChange={handleInputChange} className={`slider appearance-none w-full h-[3px] cursor-pointer ${percentage === 0 ? 'bg-[#EBF1FA]' : 'bg-[#012340]'
                    }`} />
            <p>{sliderValue} (%)</p>
        </div>
    );
};

export default Slider;
