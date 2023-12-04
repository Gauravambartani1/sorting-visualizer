import React from "react";
import './SortingVisualizer.css'
import { getMergeSortAnimations } from "../SortingAlgorithms/sortingAlgorithms";

const PRIMARY_COLOR = 'rgba(66, 134, 244, 0.8)';
const SECONDARY_COLOR = 'red';
var w = window.innerWidth * 0.4 ;

const SortingVisualizer = () => {
  const [sliderValue, setSliderValue] = React.useState(50);
  const [array, setArray] = React.useState([]);
  const [speedValue, setSpeedValue] = React.useState(3);

  React.useEffect(() => {
    resetArray();
  }, []);

  const handleSliderChange = (event) => {
    setSliderValue(parseInt(event.target.value, 10))
    resetArray();
  }

  const handleSpeedChange = (event) => {
    setSpeedValue(parseInt(event.target.value, 10))
  }

  const resetArray = () => {
    const newArray = [];
    for(let i = 0; i < sliderValue; i++){
        newArray.push(randomIntFromInterval(5,730));
    }
    setArray(newArray);
  }

  const mergeSort = () => {
    const animations = getMergeSortAnimations(array.slice()); //Pass a copy of the array to get the animations 
    animations.forEach((animation, i) => { //Animations contains list of animations representing steps of the algorithm
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2; //Every 3 steps, 2 will be color change, 1 will be swapping
      if (isColorChange) { //Change color
        const [barOneIdx, barTwoIdx] = animation; //Destructures the animation array to extract indices for the bars being compared or swapped.
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * speedValue);
      } else { //Swap
        setTimeout(() => {
          const [barOneIdx, newHeight] = animation;
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * speedValue);
      }
    });
  };

  // Define other sorting methods (quickSort, heapSort, bubbleSort) here similarly

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  return (
    <><div className="array-container">
      {array.map((value, idx) => (
        <div
          className="array-bar"
          key={idx}
          style={{
            backgroundColor: PRIMARY_COLOR,
            height: `${value}px`,
            width: `${w/sliderValue}px`
          }}
        ></div>
      ))}
      
    </div>
    <div className="footer">
    <input 
        type="range"
        min="6"
        max="310"
        className="slider"
        id="slider"
        value={sliderValue}
        onChange={handleSliderChange}/>
        <p>RANGE</p>
    <input 
        type="range"
        min="1"
        max="500"
        className="speed"
        id="speed"
        value={speedValue}
        onChange={handleSpeedChange}/>
        <p>SPEED</p>

    <button onClick={() => resetArray()}>Generate New Array</button>
    <button onClick={() => mergeSort()}>Merge Sort</button>
    </div>
    </>
  );
};

export default SortingVisualizer;
