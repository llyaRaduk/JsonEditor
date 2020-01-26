import React from 'react';
import Textarea from './Textarea'
import Table from './Table';
import editorAPI from './../api/editorAPI'
class EditorPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      mainArray: [],
      arrayToTable: [],
      countColomsInTable: []
    }
  }
  componentDidMount() {
    editorAPI.getData().then((data) => {
      this.setState({
        mainArray: JSON.stringify(data)
      })
    })

  }

  changeInputData = (text) => {
    this.setState({
      mainArray: text,
    })
  }

  createTable = () => {
    if (this.IsJson(this.state.mainArray)) {
      editorAPI.setData(this.state.mainArray);
      if (JSON.parse(this.state.mainArray).length != 0) {
        this.setState({ countColomsInTable: Object.keys(JSON.parse(this.state.mainArray)[0]) })
      }
      this.setState({
        arrayToTable: JSON.parse(this.state.mainArray)
      })
    }
    else {
      alert('Проверьте введённые данные, должен быть массив объектов формата JSON')
    }
  }
  IsJson = (data) => {
    try {
      JSON.parse(data);
    } catch (e) {
      return false;
    }
    return true;
  }

  createJSONToTextarea = async () => {
    await this.setState({
      mainArray: JSON.stringify(this.state.arrayToTable)
    });
    editorAPI.setData(this.state.mainArray);
  }

  editInformationInTable = (value, idRow, KeyNameCol) => {

    this.setState({
      arrayToTable: this.state.arrayToTable.map((el, index) => {
        if (index == idRow) {
          return { ...el, [KeyNameCol]: value }
        }
        return el;
      })

    })
  }
  deleteRow = (idRow) => {
    this.setState({
      arrayToTable: this.state.arrayToTable.filter((el, index) => (index != idRow))
    })
  }

  shiftUp = (idRow) => {
    let tempArrayToTable = [...this.state.arrayToTable];
    if (idRow == 0) {
      return;
    }
    [tempArrayToTable[+idRow], tempArrayToTable[+idRow - 1]] = [tempArrayToTable[+idRow - 1], tempArrayToTable[+idRow]]
    this.setState({
      arrayToTable: tempArrayToTable
    })
  }
  shiftDown = (idRow) => {
    let tempArrayToTable = [...this.state.arrayToTable];
    if (tempArrayToTable.length - 1 == idRow) {
      return;
    }
    [tempArrayToTable[+idRow], tempArrayToTable[+idRow + 1]] = [tempArrayToTable[+idRow + 1], tempArrayToTable[+idRow]]
    this.setState({
      arrayToTable: tempArrayToTable
    })
  }

  addRow = (idRow) => {
    let tempArrayToTable = [...this.state.arrayToTable];
    let emptyRow = {}
    this.state.countColomsInTable.forEach((el) => (emptyRow[el] = ''))
    tempArrayToTable.splice(+idRow + 1, 0, emptyRow)

    this.setState({
      arrayToTable: tempArrayToTable
    })
  }



  render() {
    return (
      <div className='container'>
        <Textarea className='center-block' changeInputData={this.changeInputData} value={this.state.mainArray} />
        <Table array={this.state.arrayToTable} editInformationInTable={this.editInformationInTable}
          countColomsInTable={this.state.countColomsInTable} deleteRow={this.deleteRow} addRow={this.addRow} shiftUp={this.shiftUp} shiftDown={this.shiftDown} />
        <button  className='mybtnMain btn btn-secondary' onClick={this.createTable}>Создать таблицу</button>
        <button  className='mybtnMain btn btn-secondary' onClick={this.createJSONToTextarea}>Создать JSON в textarea</button>
      </div>
    )
  }
}
export default EditorPage;
