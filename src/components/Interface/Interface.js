import React from 'react';
import { FaBars } from 'react-icons/fa'
import Algorithms from './interfaceComponenets/Algorithms';
import ArrayLength from './interfaceComponenets/ArrayLength';
import Speed from './interfaceComponenets/Speed';

// Navbar Component
class Interface extends React.Component {
    state = {
        algorithms: [
			{ value: 1, type: 'Bubble Sort' },
			{ value: 2, type: 'Selection Sort' },
			{ value: 3, type: 'Insertion Sort' },
			{ value: 4, type: 'Merge Sort' },
			{ value: 5, type: 'Quick Sort' },
            { value: 6, type: 'Heap Sort' },
		],
		lengths: [10, 20, 30, 40, 50],
		speeds: [1.00, 2.00, 4.00]
    };

    // prevent the default link behaviour for navbar
    // hide/display button
    handleClick = (e) => {
        e.preventDefault();
        this.props.responsive();
    }

    render() {
        return (
            <div className="interface" id="interface">
                <button id="random" onClick = {() => this.props.newArray(1)}>Random</button>
                <Algorithms 
                    onChange = {this.props.onChange}
                    algorithms = {this.state.algorithms}
                />
                <ArrayLength 
                    onChange = {this.props.onChange}
                    lengths = {this.state.lengths}
                />
                <Speed 
                    onChange = {this.props.onChange}
                    speeds = {this.state.speeds}
                />
                <button id="start" onClick = {() => this.props.start()}>Start</button>
                <a 
                    className="icon" 
                    onClick = {(e) => this.handleClick(e)}
                    href = "/">
                    <FaBars/>
                </a>
            </div>
        );
    }
}
 
export default Interface;