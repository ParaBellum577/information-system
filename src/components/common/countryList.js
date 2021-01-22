import React, { useState, useEffect } from 'react';
import countryList from 'react-select-country-list'
import { CustomSelect } from '../common/customFormComponents/select';

const CountrySelector = function ({ placeHolder, handleCallback, error }) {
  const options = countryList().getData();
  const [value, setvalue] = useState(null);

  const changeHandler = e => {
    setvalue(e.target.value);
  }

  useEffect(() => {
    handleCallback(value);
  }, [value, handleCallback]);

  return (
    <>
      <CustomSelect
        error={error}
        value={value}
        onChange={changeHandler}
        options={options}
        placeholder={placeHolder}
      />
    </>
  )
}

export default CountrySelector;