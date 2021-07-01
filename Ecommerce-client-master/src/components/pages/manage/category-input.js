/* eslint-disable no-use-before-define */
import React,{ Fragment, useEffect, useState }from 'react';
import { getCategory, singleCategory } from '../../../actions/category';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

function CategoryInput({ data, listID, listName }) {
    const [cat, setCat] = useState([]);
    
  return (
    <div>
      <Autocomplete
      multiple
       onChange={(event, newValue) => {
         const catID = newValue.map(id => {
           return id._id
         })
         const catName = newValue.map(id => {
           return id.name
         })
         listName(catName)
         listID(catID)
       }}
      options={data || 'Empty'}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          className="category-input"
          variant="outlined"
          label="Category"
          placeholder="Select categories"
        />
      )}
      />
    </div>
  );
}
export default CategoryInput;
