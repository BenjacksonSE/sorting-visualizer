import React from 'react'
import Interface from '../components/Interface/Interface';
import Sorts from '../components/Sorts';
import { newRandomArr, arrOfKeys, speedControl } from '../assets/helpers';
import { BubbleSort } from '../assets/algorithms/Bubblesort';

class Main extends React.Component {
  //Setting default state for each new main instance
  state = {
    arrLength: 20,
    speed: 1,
    algoNum: 1,
    working: false,
    arr: [],
  }
  //INTERFACE CONTROLS ----------------------------------------------------
  //Handle change of Interface controls
  onChange = (value, option) => {
    if(option === "algo" && !this.state.working) {
        this.setState({ algoNum: Number(value) });
    }
    else if(option === "speed") {
        this.setState({ speed: Number(value) });
    }
    else if(option === "size" && !this.state.working) {
        this.setState({ arrLength: Number(value) });
        this.generateArr();
    }
  };

  //Handle start
  start = async() => {
        this.lock(true);
        let steps = await this.getSteps(this.state.algoNum);
        await this.showSteps(steps);
        await this.done();
        this.lock(false);
    };

  //SORTS HELPERS AND ANIMATIONS ------------------------------------------
  //Generate new Arr on page load
  componentDidMount() {
    this.generateArr();
  }

  /* for hooking to the time instant of any change in state/event */
  componentDidUpdate() {
    this.onChange();
    this.generateArr();
  }

  //Generate new arr based on arr length
  generateArr = (value = 0) => {
        if((this.state.arr.length !== this.state.arrLength && !this.state.working) || Number(value) === 1) {
            let arr = newRandomArr(this.state.arrLength);
            this.setState({ arr: arr });
        }
	};

  //Access algorithm for next step **
  getSteps = async(AlgoNum) => {
        let steps = [];
        let array = await arrOfKeys(this.state.arr, this.state.arrLength);
        if(AlgoNum === 1) {
            steps = await BubbleSort(array, array.length);
        }
        // if(Name === 2) {
        //     moves = await selectionSort(array, array.length);
        // }
        // if(Name === 3) {
        //     moves = await insertionSort(array, array.length);
        // }
        // if(Name === 4) {
        //     moves = await mergeSort(array, array.length);
        // }
        // if(Name === 5) {
        //     moves = await quickSort(array, array.length);
        // }
        // if(Name === 6) {
        //     moves = await heapSort(array, array.length);
        // }
        return steps;
    };

  //Shows current step
  showSteps = async(steps) => {
        if(steps.length === 0) {
            return;
        }
        // if move length if 4, then we have to handle range part
        if(steps[0].length === 4) {
            await this.rangeStep(steps);
        }
        else {
            await this.swappingStep(steps);
        }
    };

  //Swaping
  swappingStep = async(Steps) => {
    while(Steps.length>0) {
      let currStep = Steps[0];
      if(currStep.length!==3){
        await this.showSteps(Steps);
        return;
      }
      else{
        let indexArr = [currStep[0], currStep[1]];
        await this.classLogic(indexArr, 1);
        if(currStep[2]===1){
          await this.updateArr(indexArr);
        }
        await this.classLogic(indexArr, 0);
      }
      Steps.shift();
    }
  };

  //
  rangeStep = async(Steps) => {
        let prevRange = [];
        while (Steps.length > 0 && Steps[0].length === 4) {
            // change range only when required to avoid blinking
            if(prevRange !== Steps[0][3]) {
                await this.classLogic(prevRange, 0);
                prevRange = Steps[0][3];
                await this.classLogic(Steps[0][3], 1);
            }
            await this.valueChange([Steps[0][0], Steps[0][1]]);
            Steps.shift();
        }
        await this.showSteps(Steps);
  };

  // update value of arr element
  valueChange = async(indexArr) => {
        let arr = [...this.state.arr];
        arr[indexArr[0]].key = indexArr[1];
        await this.updateArrState(arr);
  };

  //Update the main Arr
  updateArr = async(indexArr) => {
    let arr = [...this.state.arr];
    let temp = arr[indexArr[0]].key;
    arr[indexArr[0]].key = arr[indexArr[1]].key;
    arr[indexArr[1]].key = temp;
    await this.updateArrState(arr);
  }

  //Update the arr state and timeout based on chosen speed
  updateArrState = async(newArr) => {
    this.setState({arr: newArr});
    await speedControl(this.state.speed);
  }

  //Update className logic of element to show change happening
  classLogic = async(indexArr, whichClass) => {
    let arr = [...this.state.arr];
    for(let i = 0; i < indexArr.length; i++){
      arr[indexArr[i]].whichClass = whichClass;
    }
    await this.updateArrState(arr);
  }

  //Finished
  finished = async() => {
    let indexArr = [];
    for(let i = 0; i < this.state.arrLeng; i++){
      indexArr.push(i);
    }
    await this.classLogic(indexArr, 2)
  }

  // For responsive navbar
    response = () => {
        let Interface = document.querySelector(".interface");
        if(Interface.className === "interface") Interface.className += " responsive";
        else Interface.className = "interface";
    };

  render() { 
        return (
            <React.Fragment>
                <Interface
                    start = {this.start}
                    response = {this.response}
                    newArr = {this.generateArr}
                    onChange = {this.onChange}
                />
                <Sorts 
                    arr = {this.state.arr}
                />
            </React.Fragment>
        );
    }
}

export default Main;
