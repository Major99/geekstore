import React, { Fragment, useState } from 'react';
import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
const { Search } = Input;
import { searchProduct } from '../../actions/product'
import Router from "next/router";
import Link from 'next/link';

const HeaderSearch = () => {
  const [searchResult, setSearchResult] = useState();
  const [term, setTerm] = useState();


  const showSearchResult = () => {
    return searchResult && searchResult.map((item, i) => {
      return <Link href="/product/[pid]" as={`/product/${item.slug}`}>
                <a>
                   <div className="search-each-result" key={i}>
                      {item.name}
                   </div>
                </a>
             </Link>
    })
  }


  return <Fragment>
              <Search
            placeholder="Search Product"
            onChange={(e) => {
               setTerm(e.target.value)
               searchProduct(term)
                 .then((res) => {
                   setSearchResult(res)
                 })
                 .catch(err => console.log(err))
            }}
            enterButton={true}	
            className="search-input-bar"/>

             <div className="search-bar-result-container">
             {term && showSearchResult()}
             </div>
         </Fragment>
}

export default HeaderSearch;
