import {ImSearch} from 'react-icons/im';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

export default function Searchbar({onSubmit}) {
    const [query, setQuery] = useState('');

   const handleChange = event =>{
        setQuery(event.currentTarget.value.toLowerCase().trim());
    }

   const handleSubmit = event => {
        event.preventDefault();
        if(query === ''){
            toast.error('Введите название картинки');
            return;
        }
        onSubmit(query);
        setQuery('');
    }
        return(
    <header className="Searchbar">
    <form className="SearchForm" onSubmit={handleSubmit}>
    <button type="submit" className="SearchForm-button">
        <ImSearch style={{marginRight: 8}} />
      <span className="SearchForm-button-label">Search</span>
    </button>

    <input
      className="SearchForm-input"
      type="text"
      name="query"
      autoComplete='off'
      autoFocus
      placeholder="Search images and photos"
      onChange={handleChange}
      value={query}
    />
  </form>
    </header>
        );
}

