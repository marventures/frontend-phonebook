import css from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/filter/filterSlice';
import { selectFilter } from '../../redux/filter/filterSelector';
import { FaSearch } from 'react-icons/fa';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  //filter name based on the the search keyword
  const handleFilterChange = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div className={css.searchBar}>
      <button type='submit' className={css.searchFormButton}>
        <FaSearch />
      </button>
      <input
        className={css.searchFormInput}
        type='text'
        name='filter'
        placeholder='Search a contact by name'
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  );
};
