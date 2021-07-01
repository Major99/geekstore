import React, { Fragment } from 'react';
import Link from 'next/link';
import {Card as Card1,Button} from "antd";
const { Meta } = Card1;

const Card = ({ data }) => {
  const titleCase = (str) => {
  return str.toLowerCase().split(' ').map(function(word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
}

 
  return <Fragment>
          <Link href="/product/[pid]" as={`/product/${data.slug}`}>
          <a>
           <div className="">
            {/* <img src="https://cdn.shopify.com/s/files/1/0070/7032/files/camera_56f176e3-ad83-4ff8-82d8-d53d71b6e0fe.jpg?v=1527089512" className="img img-fluid"/>
            <div className="product-card-title">
             {data.name}
            </div>
            <Button size="small" fullWidth className="product-card-button">₹{data.price}</Button> */}

           <Card1  hoverable={true} bordered={true} size={"small"}
              cover={
                <img
                  alt="Product Image"
                  src={data.photoURL}
                />
              } actions={[
                          <Button>For more info</Button>
                        ]}>
                          <Meta
                            title= {`₹${data.price}`}
                            description={`${data.name}`}
                          />
                        </Card1>
           </div>
           </a>

          </Link>
         </Fragment>
}

export default Card
