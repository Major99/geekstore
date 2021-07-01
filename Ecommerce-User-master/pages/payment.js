import React, { Fragment } from 'react';
import Layout from '../components/layout/layout'

import { Collapse } from 'antd';

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

const Payment = () => {
  return <Fragment>
            <Layout>
            <div className="payment-container container">
              <h1>Payment</h1>
              <Collapse defaultActiveKey={['1']} onChange={callback}>
                <Panel header="How do I pay for a MummaChoice purchase?" key="1">
                  <p>MummaChoice offers you multiple payment methods. Whatever your online mode of payment, you can rest assured that MummaChoice's trusted payment gateway partners use secure encryption technology to keep your transaction details confidential at all times.<br/><br/>

                  You may use Internet Banking, Cash on Delivery and Wallet to make your purchase.<br/><br/>

                  MummaChoice also accepts payments made using Visa, MasterCard, Maestro and American Express credit/debit cards in India.</p>
                </Panel>
                <Panel header="Are there any hidden charges (GST) when I make a purchase on MummaChoice?" key="2">
                  <p>There are NO hidden charges when you make a purchase on MummaChoice. The prices listed for all the items are final and all-inclusive. The price you see on the product page is exactly what you pay.<br/><br/>

                  Delivery charges may be extra depending on the seller policy. Please check individual seller for the same. In case of seller WS Retail, the ₹50 delivery charge is waived off on orders worth ₹500 and over.</p>
                </Panel>
                <Panel header="What is Cash on Delivery?" key="3">
                  <p>If you are not comfortable making an online payment on MummaChoice.com via RazorPay, you can opt for the Cash on Delivery (C-o-D) payment method instead. With C-o-D you can pay in cash at the time of actual delivery of the product at your doorstep, without requiring you to make any advance payment online.<br/><br/>

                  The maximum order value for a Cash on Delivery (C-o-D) payment is ₹50,000. It is strictly a cash-only payment method. Gift Cards or store credit cannot be used for C-o-D orders. Foreign currency cannot be used to make a C-o-D payment. Only Indian Rupees accepted.</p>
                </Panel>
                <Panel header="How do I pay using a credit/debit card?" key="4">
                  <p>We accept payments made by credit/debit cards issued in India.<br/><br/>

                  <b>Credit cards</b>

                  <br/><br/>                 We accept payments made using Visa, MasterCard and American Express credit cards.

                  <br/><br/>                 To pay using your credit card at checkout, you will need your card number, expiry date, three-digit CVV number (found on the backside of your card). After entering these details, you will be redirected to the bank's page for entering the online 3D Secure password.

                  <br/><br/>               <b>Debit cards</b>

                  <br/><br/>                We accept payments made using Visa, MasterCard and Maestro debit cards.

                  <br/><br/>                To pay using your debit card at checkout, you will need your card number, expiry date (optional for Maestro cards), three-digit CVV number (optional for Maestro cards). You will then be redirected to your bank's secure page for entering your online password (issued by your bank) to complete the payment.</p>
                </Panel>
                <Panel header="Is it safe to use my credit/debit card on Flipkart?" key="5">
                  <p>Your online transaction on MummaChoice is secure with the highest levels of transaction security currently available on the Internet. 
                  <br/><br/>
                  All credit card and debit card payments on MummaChoice are processed through secure and trusted payment gateway RazorPay managed by leading banks. Banks now use the 3D Secure password service for online transactions, providing an additional layer of security through identity verification.</p>
                </Panel>
                <Panel header="What steps does Flipkart take to prevent card fraud?" key="6">
                  <p>MummaChoice realizes the importance of a strong fraud detection and resolution capability. We and our online payments partners monitor transactions continuously for suspicious activity and flag potentially fraudulent transactions for manual verification by our team.
                  <br/><br/>
                  In the rarest of rare cases, when our team is unable to rule out the possibility of fraud categorically, the transaction is kept on hold, and the customer is requested to provide identity documents. The ID documents help us ensure that the purchases were indeed made by a genuine card holder. We apologise for any inconvenience that may be caused to customers and request them to bear with us in the larger interest of ensuring a safe and secure environment for online transactions.</p>
                </Panel>
                <Panel header="What is a 3D Secure password?" key="7">
                  <p>The 3D Secure password is implemented by VISA and MasterCard in partnership with card issuing banks under the "Verified by VISA" and "Mastercard SecureCode" services, respectively.
                  <br/><br/>
                  The 3D Secure password adds an additional layer of security through identity verification for your online credit/debit card transactions. This password, which is created by you, is known only to you. This ensures that only you can use your card for online purchases.</p>
                </Panel>
                <Panel header="How can I get the 3D Secure password for my credit/debit card?" key="8">
                  <p>You can register for the 3D Secure password for your credit/debit card by visiting your bank's website. </p>
                </Panel>
              </Collapse>
            </div>
            </Layout>
         </Fragment>
}

export default Payment;
