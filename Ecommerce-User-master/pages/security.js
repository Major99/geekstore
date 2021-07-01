import React, { Fragment } from 'react';
import Layout from '../components/layout/layout'
import { Collapse } from 'antd';

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

const Security = () => {
  return <Fragment>
            <Layout>
            <div className="security-container container">
              <h1>Security</h1>
              
              <Collapse defaultActiveKey={['1']} onChange={callback}>
                <Panel header="Is it safe to use my credit/debit card on MummaChoice?" key="1">
                  <p>Your online transaction on MummaChoice is secure with the highest levels of transaction security currently available on the Internet. All credit card and debit card payments on Flipkart are processed through secure and trusted payment gateway i.e. RazorPay managed by leading banks. Banks now use the 3D Secure password service for online transactions, providing an additional layer of security through identity verification.</p>
                </Panel>
                <Panel header="Does MummaChoice store my credit/debit card infomation?" key="1">
                  <p>MummaChoice stores the first 6 and last 4 digits of your card number in a secure and encrypted manner. The first 6 digits (also known as the Bank Identification Number) are used to identify the bank name and country where your card was issued. The first 6 and last 4 digits are together used for fraud detection and prevention purposes. We dont store your card CVV.</p>
                </Panel>
                </Collapse>
            </div>
            </Layout>
         </Fragment>
}

export default Security;
