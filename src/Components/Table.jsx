import React from 'react';
import RowTable from './RowTable';

const Table = (props) => {

  const getValue = (value, idRow, KeyNameCol) => (props.editInformationInTable(value, idRow, KeyNameCol))

  const deleteRow = (e) => {
    props.deleteRow(e.target.id)
  }
  const shiftUp = (e) => {
    props.shiftUp(e.target.id)
  }
  const shiftDown = (e) => {
    props.shiftDown(e.target.id)
  }

  const addRow = (e) => {
    props.addRow(e.target.id)
  }
  return (

    <table className="table table-hover">
      <tbody>
        {props.array.map((el, index) => <tr key={index}>
          <td>
            <div>
              <div>
                <button className='mybtn btn btn-secondary' onClick={deleteRow} id={index}>Удалить</button>
                <button className='mybtn btn btn-secondary' onClick={shiftUp} id={index}>Вверх</button>
              </div>
              <div>

                <button className='mybtn btn btn-secondary' onClick={addRow} id={index}>Добавить</button>
                <button className='mybtn btn btn-secondary' onClick={shiftDown} id={index}>Вниз</button>
              </div>

            </div>

          </td>
          <RowTable array={props.array} countColomsInTable={props.countColomsInTable}
            getValue={getValue} idRow={index} key={index} />

        </tr>)}
      </tbody>
    </table>

  )
}
export default Table;
