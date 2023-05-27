const name = "Srm"
function getTitle(title) {
  return title;
}

function App() {
  return (
    <div>
      <h1>"Hello {getTitle(name)}"</h1>
      <label htmlFor="search">Search:</label>
      <input id="search" type="text"/>
     </div>
  );
}

export default App;
