import React, { Fragment } from 'react';
import Layout from '../components/layout/layout'
import { Collapse } from 'antd';

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

const Shipping = () => {
  return <Fragment>
            <Layout>
            <div className="shipping-container container">
              <h1>Shipping</h1>
              
              <Collapse defaultActiveKey={['1']} onChange={callback}>
                <Panel header="What are the delivery charges?" key="1">
                  <p>Delivery charge varies with each Seller.
<br/><br/>
                    Sellers incur relatively higher shipping costs on low value items. In such cases, charging a nominal delivery charge helps them offset logistics costs. Please check your order summary to understand the delivery charges for individual products.
                    <br/><br/>                   For Products Rs X charge for delivery per item is applied if the order value is less than Rs 500. While, orders of Rs 500 or above are delivered free.</p>
                </Panel>
                <Panel header="Why does the delivery date not correspond to the delivery timeline of X-Y business days?" key="2">
                  <p>It is possible that the Seller or our courier partners have a holiday between the day your placed your order and the date of delivery, which is based on the timelines shown on the product page. In this case, we add a day to the estimated date. Some courier partners and Sellers do not work on Sundays and this is factored in to the delivery dates.</p>
                </Panel>
                <Panel header="What is the estimated delivery time?" key="3">
                  <p>Sellers generally procure and ship the items within the time specified on the product page. Business days exclude public holidays and Sundays.
                  <br/><br/>
                      Estimated delivery time depends on the following factors:
                      <br/><br/>
                      1. The Seller offering the product<br/>
                      2. Product's availability with the Seller<br/>
                      3. The destination to which you want the order shipped to and location of the Seller.</p>
                </Panel>
                <Panel header="Are there any hidden costs (GST etc.) on items sold by Sellers on MummaChoice?" key="4">
                  <p>There are NO hidden charges when you make a purchase on MummaChoice. List prices are final and all-inclusive. The price you see on the product page is exactly what you would pay.
                  <br/><br/>
                    Delivery charges are not hidden charges and are charged (if at all) extra depending on the Seller's shipping policy.</p>
                </Panel>
                <Panel header="Why does the estimated delivery time vary for each seller?" key="5">
                  <p>You have probably noticed varying estimated delivery times for sellers of the product you are interested in. Delivery times are influenced by product availability, geographic location of the Seller, your shipping destination and the courier partner's time-to-deliver in your location.
                  <br/><br/>
                    Please enter your default pin code on the product page (you don't have to enter it every single time) to know more accurate delivery times on the product page itself</p>
                </Panel>
                {/* <Panel header="Seller does not/cannot ship to my area. Why?" key="6">
                  <p>Please enter your pincode on the product page (you don't have to enter it every single time) to know whether the product can be delivered to your location.

                      If you haven't provided your pincode until the checkout stage, the pincode in your shipping address will be used to check for serviceability.

                      Whether your location can be serviced or not depends on

                      Whether the Seller ships to your location
                      Legal restrictions, if any, in shipping particular products to your location
                      The availability of reliable courier partners in your location
                      At times Sellers prefer not to ship to certain locations. This is entirely at their discretion.</p>
                </Panel> */}
                <Panel header="Why is the CoD option not offered in my location?" key="7">
                  <p>Availability of CoD depends on the ability of our courier partner servicing your location to accept cash as payment at the time of delivery.
                  <br/><br/>
                    Our courier partners have limits on the cash amount payable on delivery depending on the destination and your order value might have exceeded this limit. Please enter your pin code on the product page to check if CoD is available in your location.</p>
                </Panel>
                <Panel header="I need to return an item, how do I arrange for a pick-up?" key="8">
                  <p>Returns are easy. Contact Us to initiate a return. You will receive a call explaining the process, once you have initiated a return.
                  <br/><br/>
                    Wherever possible Ekart Logistics will facilitate the pick-up of the item. In case, the pick-up cannot be arranged through Ekart, you can return the item through a third-party courier service. Return fees are borne by the Seller.</p>
                </Panel>
                {/* <Panel header="What are the delivery charges?" key="9">
                  <p></p>
                </Panel> */}
              </Collapse>
            </div>
            </Layout>
         </Fragment>
}

export default Shipping;
