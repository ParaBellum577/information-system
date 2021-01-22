import React from 'react';
import _ from 'lodash';
import { BiSearchAlt2 } from 'react-icons/bi';
import styles from '../main/userCabinet/projects/index.module.scss';
// styles in projects/style.scss

const SearchComponent = function ({ search, handleSearch, placeholder }) {

    return (
        <div className={styles.customSearch}>
            <BiSearchAlt2 size="20" />
            <input
                type="text"
                placeholder={placeholder}
                value={search}
                onChange={handleSearch}
            />
        </div>

    )
}

export default SearchComponent;