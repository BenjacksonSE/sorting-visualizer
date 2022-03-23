import React from 'react';

import Algorithms from './InterfaceSelections/Algorithms';
import Size from './InterfaceSelections/Size';
import Speed from './InterfaceSelections/Speed';

// Interface Component
class Interface extends React.Component {
    state = {
        Algorithms: [
        { value: 1, type: 'Bubble Sort' },
        { value: 2, type: 'Selection Sort' },
        { value: 3, type: 'Insertion Sort' },
        { value: 4, type: 'Merge Sort' },
        { value: 5, type: 'Quick Sort' },
        { value: 6, type: 'Heap Sort' },
		    ],
        lengths: [10, 20, 50, 100],
        speeds: [1.00, 2.00, 4.00]
    };

    // prevent the default link behaviour for interface
    // hide/display button
    handleClick = (e) => {
        e.preventDefault();
        this.props.response();
    }

    render() {
        return (
            <div className="interface" id="interface">
                <button id="random" onClick = {() => this.props.newList(1)}>Random</button>
                <Algorithms 
                    onChange = {this.props.onChange}
                    algorithms = {this.state.Algorithms}
                />
                <Size 
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
                    <i className="fa fa-bars"></i>
                </a>
            </div>
        );
    }
}
 
export default Interface;