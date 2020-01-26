import React from 'react';

const RowTable = (props) => {
  const getValue = (e) => {
    props.getValue(e.target.value, e.target.getAttribute('id_row'), e.target.getAttribute('key_name_col'))
  }
  const getColom = () => {
    let arr = [];
    for (let i = 0; i < props.countColomsInTable.length; i++) {
      arr[i] = <td key={i}>
        <input className='inputColom' value={props.array[props.idRow][props.countColomsInTable[i]]}
          onChange={getValue} type="text" id_row={props.idRow} key_name_col={props.countColomsInTable[i]} />
      </td>
    }
    return arr;
  }

  return (
    <>
      {getColom()}
    </>
  )
}
export default RowTable;
