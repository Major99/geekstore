import React, { Fragment } from 'react';
import Layout from '../components/layout/layout'
import { Collapse } from 'antd';

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

const CancellationAndReturns = () => {
  return <Fragment>
            <Layout>
               <div className="cancellation-and-return-container container">
                 <h1>Cancellation And Returns</h1>
                  <Collapse defaultActiveKey={['1']} onChange={callback}>
                  <Panel header="If I request for a replacement, when will I get it?" key="1">
                    <p>Visit My Orders to check the status of your replacement.
                    <br/><br/>
                    In most locations, the replacement item is delivered to you at the time of pick-up. In all other areas, the replacement is initiated after the originally delivered item is picked up. Please check the SMS & email we send you for your replacement request for more details.</p>
                  </Panel>
                  <Panel header="Can items be returned after the time period mentioned in the seller's Returns Policy?" key="2">
                    <p>No, sellers will not be able to accept returns after the time period mentioned in the seller's Returns Policy.</p>
                  </Panel>
                  <Panel header="Do I have to return the freebie when I return a product?" key="3">
                    <p>Yes, the freebie has to be returned along with the product.</p>
                  </Panel>
                  <Panel header="How do returns work?" key="4">
                    <p>You can raise a request to return your items with these simple steps:
                    <br/><br/>
                        1. Log into your MummaChoice account
                        <br/>
                        2. Go to My Orders
                        <br/>
                        3. Click on 'Return' against the item you wish to return or exchange
                        <br/>
                        4. Fill in the details and raise a return request
                        <br/><br/>
                        Once you raise a request, you'll get an email and SMS confirming that your request is being processed. Based on the item, your request may be automatically approved or you may be contacted for more details. If the request is approved, the item will be picked up after which you will get a replacement or refund. You can also track the status of your return request instantly from the 'My Orders' section of your MummaChoice account.</p>
                  </Panel>
                  <Panel header="I see the 'Cancel' button but I can't click on it. Why?" key="5">
                    <p>A greyed out and disabled 'Cancel' button can mean any one of the following:
                    <br/><br/>
                        1. The item has been delivered already
                        <br/>
                        OR
                        <br/>
                        2. The item is non-refundable (e.g. Gift Card)</p>
                  </Panel>
                  </Collapse>
               </div>
            </Layout>
         </Fragment>
}

export default CancellationAndReturns;
