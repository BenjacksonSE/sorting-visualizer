import React from 'react';

class Sorts extends React.Component {
    getClassName = (classNum) => {
        if(classNum === 0) return 'cell';
        else if(classNum === 1) return 'cell current';
        return 'cell done';
    };

    render() { 
        return (
            <div className="frame">
                <div className="array">
                    {this.props.array.map((elem, index) => (
                        <div
                            className = {this.getClassName(elem.classType)}
                            key = {index}
                            style = {{height : `${4*elem.key}px`}}
                            value = {elem.key}>
                        </div>
                    ))}
                </div>
            </div>
        );
    }  
}
 
export default Sorts;