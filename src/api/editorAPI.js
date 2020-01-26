const editorAPI = {
  async getData() {
    try {
      let response = await fetch('http://localhost:2000/parser/')
      return await response.json();
    }
    catch(e){
      console.log(e)
    }
  },
  setData(data) {
    fetch('http://localhost:2000/parser/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data
    })

  }
}
export default editorAPI;
