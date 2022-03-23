import React from 'react'

const Sorts = ({props}) => {
  return (
    <div className='sorts'>
      <div className='array'>
        {props.list.map((elem, index) => (
          <div className={forClassChange(element.whichClass)} key={index} value={element.key}/>
        ))}
      </div>

    </div>
  )
}

export default Sorts