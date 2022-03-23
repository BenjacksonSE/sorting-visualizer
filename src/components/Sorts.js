import React from 'react'

const Sorts = ({props}) => {
  const forClassChange = (val) => {
      if(val === 0) return 'elem';
      else if(val === 1) return 'elem working';
      return 'elem sorted';
  }
  return (
    <div className='sorts'>
      <div className='array'>
        {props.arr.map((elem, index) => (
          <div className={forClassChange(elem.whichClass)} key={index} value={elem.key} style={{height:`${4*elem.key}px`}}/>
        ))}
      </div>

    </div>
  )
}

export default Sorts