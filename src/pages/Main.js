import React from 'react'
import Interface from '../components/Interface/Interface';
import Sorts from '../components/Sorts';
import { newRandomArr } from '../assets/helpers';

export default class Main extends React.Component {
  //Setting default state for each new main instance
  state = {
    arrLeng: 20,
    speed: 1,
    algo: 1,
    working: false,
    arr: [],
  }
  //Navbar controls
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



  render() { 
    return (
        <>
          Main Loaded
        </>
    );
  }
}
