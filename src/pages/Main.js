import React from 'react'
import Interface from '../components/Interface/Interface';
import Sorts from '../components/Sorts';
import { newRandomArr, arrOfKeys, speedControl } from '../assets/helpers';
import { BubbleSort } from '../assets/algorithms/Bubblesort';

export default class Main extends React.Component {
  //Setting default state for each new main instance
  state = {
    arrLeng: 20,
    speed: 1,
    algo: 1,
    working: false,
    arr: [],
  }
  //INTERFACE CONTROLS ----------------------------------------------------
  //Handle change of Interface controls
  onChange = (value, selection) => {
    if(selection === "algo" && !this.state.working) {
        this.setState({ algorithm: Number(value) });
    }
    else if(selection === "speed") {
        this.setState({ speed: Number(value) });
    }
    else if(selection === "size" && !this.state.working) {
        this.setState({ size: Number(value) });
        this.generateArr();
    }
  };

  //Handle start
  start = async() => {
    
  }

  //SORTS HELPERS AND ANIMATIONS ------------------------------------------
  //Generate new Arr on page load
  componentDidMount(){
    this.generateArr();
  }

  //Generate new list based on arr length
  generateArr = (value=0) => {
    if((this.state.arr.length !== this.state.arrLeng && !this.state.working) || Number(value)===1){
      let newArr = newRandomArr(this.state.arrLeng);
      this.setState({ arr: newArr });
    }
  }

  //Access algorithm for next step **
  getSteps = async(AlgoName) => {
    let steps = [];
    let newArr = await arrOfKeys(this.state.arr, this.state.arrLeng);
    steps = await BubbleSort(newArr, newArr.length);
    return steps
  }

  //Shows current step
  showSteps = async(steps) => {
    if(steps.legth===0){
      return;
    }
    if(steps[0].length===4){
      return;
    }
    else{
      await this.swappingStep(steps);
    }
  }

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
  }

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

  render() { 
    return (
        <>
          Main Loaded
        </>
    );
  }
}
