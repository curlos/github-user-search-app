import { useState, useEffect } from 'react';
import './styles/styles.css';

const App = () => {
  const [query, setQuery] = useState('')

  const handleSearch = async (e) => {
    e.preventDefault()
    console.log('fuck')
    const response = await fetch(`https://api.github.com/users/${query}`)
    console.log(response)

    console.log(response.data)
  }

  return (
    <div className="mainContainer">
      <div className="">
        <form className="searchBar" onSubmit={handleSearch}>
          <i class="fas fa-search"></i>
          <input placeholder="Search GitHub username..." onChange={(e) => setQuery(e.target.value)} />
          <button type="submit">Search</button>
        </form>

        <div className="mainCard">

        </div>
      </div>
    </div>
  );
}

export default App;
