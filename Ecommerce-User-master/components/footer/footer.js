import React, { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import Svg from './footer-svg'
import { Modal, Button } from 'antd';



class Footer extends React.Component{

  state = {
    loading: false,
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };


    render() {
    const { visible, loading } = this.state;
  return <Fragment>
            <div class="pg-footer">
                <footer class="footer">
                <svg class="footer-wave-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 100" preserveAspectRatio="none">
                    <path class="footer-wave-path" d="M851.8,100c125,0,288.3-45,348.2-64V0H0v44c3.7-1,7.3-1.9,11-2.9C80.7,22,151.7,10.8,223.5,6.3C276.7,2.9,330,4,383,9.8 c52.2,5.7,103.3,16.2,153.4,32.8C623.9,71.3,726.8,100,851.8,100z"></path>
                </svg>
                <div class="footer-content">
                    <div class="footer-content-column">
                    <div class="footer-logo">
                        <a class="footer-logo-link" href="#">
                        <span class="hidden-link-text">MummaChoice</span>
                         <Svg />
                        </a>
                    </div>
                    <div class="footer-menu">
                        <h2 class="footer-menu-name"> About</h2>
                       <ul class="footer-menu-list">Admin</ul> 
                        <ul id="menu-get-started" class="footer-menu-list">


                        <li id="menu-item-173730" class="menu-item menu-item-type-post_type menu-item-object-product menu-item-173730">
                          <Link href="/contact-us">
                             <a>Contact Us</a>
                          </Link>
                        </li>
                        <li id="menu-item-173728" class="menu-item menu-item-type-post_type menu-item-object-product menu-item-173728">
                            <Link href="/about-us">
                              <a>About Us</a>
                            </Link>
                        </li>

                        </ul>
                    </div>
                    </div>
                    <div class="footer-content-column">
                    <div class="footer-menu">
                        <h2 class="footer-menu-name"> Help</h2>
                        <ul id="menu-company" class="footer-menu-list">
                        <li id="menu-item-167408" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-167408">
                           <Link href="/payment">
                            <a>Payment</a>
                           </Link>
                        </li>
                        <li id="menu-item-167409" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-167409">
                            <Link href="/shipping">
                              <a>Shipping</a>
                            </Link>
                        </li>
                        <li id="menu-item-171917" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-171917">
                              <Link href="/cancellation-and-returns">
                                <a>Cancellation & Returns</a>
                              </Link>
                        </li>
                        </ul>
                    </div>
                    <div class="footer-menu">
                        <h2 class="footer-menu-name"> Legal</h2>
                        <ul id="menu-legal" class="footer-menu-list">
                        <li id="menu-item-170434" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-privacy-policy menu-item-170434">
                            <Link href="/return-policy">
                              <a>Return Policy</a>
                            </Link>
                        </li>
                        <li id="menu-item-179115" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-179115">
                              <Link href="/security">
                                <a>Security</a>
                              </Link>
                        </li>
                        <li id="menu-item-178960" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-178960">
                              <Link href="/term-of-use">
                                <a>Terms of Use</a>
                              </Link>
                        </li>
                        <li id="menu-item-178960" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-178960">
                              <Link href="/privacy">
                                <a>Privacy</a>
                              </Link>
                        </li>
                        </ul>
                    </div>
                    </div>
                    <div class="footer-content-column">
                    <div class="footer-menu">
                        <h2 class="footer-menu-name"> Registered Office</h2>
                        <p class="footer-call-to-action-description"> 2/10, rajiv chowk,<br/>
                         Hemant nagar,<br/>
                         New Delhi.<br/> 206727</p>
                         <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.8922702777113!2d77.21718531505665!3d28.632990690811134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37ebbdf4af%3A0x2be7eefccedf4b84!2sRajiv%20Chowk!5e0!3m2!1sen!2sin!4v1593776925991!5m2!1sen!2sin" width="120" height="120" frameborder="0" style={{border:"0",}} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                    </div>
                    </div>
                    <div class="footer-content-column">
                    <div class="footer-call-to-action">
                        <h2 class="footer-call-to-action-title"> Let's Chat</h2>
                        <p class="footer-call-to-action-description"> Have a support question? Want to add SMS to your app? Need to talk to legal? Whatever the reason you need to chat, let us know and we'll give you a call.</p>
                        <a class="footer-call-to-action-button button" onClick={this.showModal}> Get in Touch </a>
                        <Modal
                        visible={visible}
                        title="Do you have any question"
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>
                            Return
                            </Button>,
                            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            Submit
                            </Button>,
                        ]}
                        >
                                    <form class="contact-form" id="contact-form-data">
                                        <div class="row my-form">
                                            <div class="col-md-12 col-sm-12 mb-1">
                                                <div id="result"></div>
                                            </div>
                                            <div class="col-12 col-md-4">
                                                <input type="text" class="form-control" id="candidate_name" name="userName" placeholder="Name" required="required"/>
                                            </div>
                                            <div class="col-12 col-md-4">
                                                <input type="email" class="form-control" id="user_email" name="userEmail" placeholder="Email" required="required"/>
                                            </div>
                                            <div class="col-12 col-md-4">
                                                <input type="text" class="form-control" id="user_subject" name="userSubject" placeholder="Subject" required="required"/>
                                            </div>
                                            <div class="col-12">
                                                <textarea class="form-control" id="user_message" name="userMessage" placeholder="Message" rows="7" required="required"></textarea>
                                            </div>
                                        </div>
                                    </form>
                        </Modal>
                    </div>
                    <div class="footer-call-to-action">
                        <h2 class="footer-call-to-action-title"> You Call Us</h2>
                        <p class="footer-call-to-action-link-wrapper"> <a class="footer-call-to-action-link" href="tel:0124-64XXXX" target="_self"> +91 XXXXXXXX </a></p>
                    </div>
                    </div>
                </div>
                <div class="footer-copyright">
                    <div class="footer-copyright-wrapper">
                    <p class="footer-copyright-text">
                        <a class="footer-copyright-link" href="#" target="_self"> ©2020. | GeekStore. | All rights reserved. </a>
                    </p>
                    </div>
                </div>
                </footer>
            </div>
         </Fragment>
}}

export default Footer;
