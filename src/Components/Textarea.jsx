import React from 'react';

const Textarea = (props) => {
  const changed = (e) => {
    props.changeInputData(e.target.value)
  }

  return (
    <div >
      <textarea className='textarea' onChange={changed} value={props.value}></textarea>
    </div>
  )
}
export default Textarea;
