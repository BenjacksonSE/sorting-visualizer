import React from 'react';
import { Bubblesort } from '../assets/algorithms/Bubblesort.js';
import { Insertionsort } from '../assets/algorithms/Insertionsort.js';
import { Selectionsort } from '../assets/algorithms/Selectionsort.js';
import { Mergesort } from '../assets/algorithms/Mergesort.js';
import { Quicksort } from '../assets/algorithms/Quicksort.js';
import { Heapsort } from '../assets/algorithms/Heapsort.js';
import Interface from '../components/Interface/Interface';
import Sorts from '../components/Sorts';
import { newRandomArr, arrOfKeys, speedControl } from '../assets/helpers.js';

class Main extends React.Component {
    state = {
        array: [],
        arrayLength: 10,
        speed: 1,
        algorithm: 1,
        working: false,
    };

    //INTERFACE CONTROLS ----------------------------------------------------
    //Handle change of Interface controls
    onChange = (value, option) => {
        if(option === 'algo' && !this.state.working) {
            this.setState({ algorithm: Number(value) });
        }
        else if(option === 'speed') {
            this.setState({ speed: Number(value) });
        }
        else if(option === 'arrayLength' && !this.state.working) {
            this.setState({ arrayLength: Number(value) });
            this.newArray();
        }
    };

    //Handle start
    start = async() => {
        this.lock(true);
        let steps = await this.getSteps(this.state.algorithm);
        await this.showSteps(steps);
        await this.finished();
        this.lock(false);
    };

    //Locks certain interface commands to prevent catostrophic failure
    lock = (status) => {
        this.setState({ working: Boolean(status) });
    };

    //Interface breaks during shrinkage
    responsive = () => {
        let Interface = document.querySelector(".interface");
        if(Interface.className === "interface") Interface.className += " responsive";
        else Interface.className = "interface";
    };

    //SORTS HELPERS AND ANIMATIONS ------------------------------------------
    //Generate new Arr on page load
    componentDidMount() {
        this.newArray();
    }
    //Handle in working updates
    componentDidUpdate() {
        this.onChange();
        this.newArray();
    }

    //Generate new arr based on arr length
    newArray = (value = 0) => {
        if((this.state.array.length !== this.state.arrayLength && !this.state.working) || Number(value) === 1) {
            let array = newRandomArr(this.state.arrayLength);
            this.setState({ array: array });
        }

	};

    //Access algorithm for next step **
    getSteps = async(Name) => {
        let steps = [];
        let array = await arrOfKeys(this.state.array, this.state.arrayLength);
        if(Name === 1) {
            steps = await Bubblesort(array, array.length);
        }
        if(Name === 2) {
            steps = await Selectionsort(array, array.length);
        }
        if(Name === 3) {
            steps = await Insertionsort(array, array.length);
        }
        if(Name === 4) {
            steps = await Mergesort(array, array.length);
        }
        if(Name === 5) {
            steps = await Quicksort(array, array.length);
        }
        if(Name === 6) {
            steps = await Heapsort(array, array.length);
        }
        return steps;
    };

     //Shows current step
    showSteps = async(steps) => {
        if(steps.length === 0) {
            return;
        }
        if(steps[0].length === 4) {
            await this.rangeStep(steps);
        }
        else {
            await this.swapStep(steps);
        }
    };

    //Swaping Elements
    swapStep = async(steps) => {
        while(steps.length > 0) {
            let currentStep = steps[0];
            if(currentStep.length !== 3) {
                await this.showSteps(steps);
                return;
            }
            else {
                let subArray = [currentStep[0], currentStep[1]];
                await this.classLogic(subArray, 1);
                if(currentStep[2] === 1) {
                    await this.updateArray(subArray);
                }
                await this.classLogic(subArray, 0);
            }
            steps.shift();
        }
    };

    //Range - dont remove this if you have epilepsy
    rangeStep = async(steps) => {
        let prevRange = [];
        while (steps.length > 0 && steps[0].length === 4) {
            if(prevRange !== steps[0][3]) {
                await this.classLogic(prevRange, 0);
                prevRange = steps[0][3];
                await this.classLogic(steps[0][3], 1);
            }
            await this.valueChange([steps[0][0], steps[0][1]]);
            steps.shift();
        }
        await this.showSteps(steps);
    };

    //Changes value in the array
    valueChange = async(subArray) => {
        let array = [...this.state.array];
        array[subArray[0]].key = subArray[1];
        await this.updateArrayState(array);
    };


    //Update the main Array
    updateArray = async(subArray) => {
        let array = [...this.state.array];
        let temp = array[subArray[0]].key;
        array[subArray[0]].key = array[subArray[1]].key;
        array[subArray[1]].key = temp;
        await this.updateArrayState(array);
    };

    //Update the arr state and timeout based on chosen speed
    updateArrayState = async(newArray) => {
        this.setState({array: newArray});
        await speedControl(this.state.speed);
    };

    
    //Update className logic of element to show pretty colors
    classLogic = async(subArray, classType) => {
        let array = [...this.state.array];
        for(let i = 0 ; i < subArray.length ; ++i) {
            array[subArray[i]].classType = classType;
        }
        await this.updateArrayState(array);
    };

    // All done :)
    finished = async() => {
        let subArray = [];
        for(let i = 0 ; i < this.state.arrayLength ; ++i) {
            subArray.push(i);
        }
        await this.classLogic(subArray, 2);
    };
    
    //All that work to return this little thing
    render() { 
        return (
            <>
                <Sorts 
                    array = {this.state.array}
                />
                <Interface
                    start = {this.start}
                    responsive = {this.responsive}
                    newArray = {this.newArray}
                    onChange = {this.onChange}
                />
                
            </>
        );
    }
}
 
export default Main;