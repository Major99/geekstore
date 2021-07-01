import 'react-toastify/dist/ReactToastify.min.css';
import Layout from '../../core/layout'
import 'antd/dist/antd.css'
import React,{Fragment, useEffect, useState} from 'react';
import { Layout as Layout1, Divider,Card, Col, Row,Button } from 'antd';
import "./dashboard.css";
import {InfoOutlined} from "@ant-design/icons";
import openSocket from "socket.io-client";
import LineChart from '../../core/charts/lineChart';
import DrilldownPie from '../../core/charts/pieChart';
import faker from "faker";
import chroma from "chroma-js";
import * as d3 from "d3";
import { Link, withRouter } from 'react-router-dom'
import { socket } from '../../../actions/chat'

function generateData(level, prevIndex, color) {
  const N = d3.randomUniform(3, 10)();
  const colors = color
    ? d3.range(N).map(i =>
        chroma(color)
          .brighten(i * 0.1)
          .hex()
      )
    : d3.schemePaired;

  return d3.range(N).map(i => ({
    value: Math.abs(d3.randomNormal()()),
    id: `${level}-${i}`,
    level: level,
    index: i,
    prevIndex: prevIndex,
    name: faker.internet.userName(),
    color: colors[i],
    children: level > 0 ? generateData(level - 1, i, colors[i]) : []
  }));
}

const { Header, Content, Footer } = Layout1;
const { Meta } = Card;

const Home  = () =>{

  const data1 = generateData(4);
  const [online, setOnline] =useState();

  useEffect(() => {
    const socket= openSocket(process.env.REACT_APP_SERVER);
    socket.on('online',(data)=>setOnline(data));
  }, [])
  const [data, setData] = useState(
    Array.from({length :30}).map(()=>Math.round(Math.random()*100))
  );
  return( <Fragment>
            <Layout>
              <div className='container text-center'>
              <Divider orientation="left"><h1>Dashboard</h1></Divider>
                <div className="site-layout-content" style={{}}>
                <h3><b>Statistics</b></h3>
                  <div className="row col justify-content-center">
                  <div className="site-card-wrapper">
                    <div className="container" style={{display:"flex",flexWrap:"wrap"}}>
                      <div className="box">
                        <Card hoverable={true} bordered={false} style={{background:"lightblue"}} actions={[
                          <h6 style={{fontFamily: "Times New Roman, Times, serif",}}>Active Users On Site</h6>
                        ]}>
                          <Meta
                            title="{online}"
                            description="Right Now "
                          />
                        </Card>

                        </div>
                      <div className="box">
                        <Card hoverable={true} bordered={false} style={{background:"pink"}} actions={[
                          <Link  to="/orders">
                            <Button >For more info</Button>
                          </Link>
                        ]}>
                          <Meta
                            title="13"
                            description="Orders"
                          />
                        </Card>
                        </div>
                      <div className="box">
                        <Card  hoverable={true} bordered={false} style={{background:"lightgreen"}} actions={[

                          <Link  to="/users">
                            <Button>For more info</Button>
                          </Link>
                        ]}>
                          <Meta
                            title="34"
                            description="Registered Customers"
                          />
                        </Card>
                        </div>
                        </div>
                  </div>
                  </div></div>
              <Divider/>
              <div class="row">
              <div class="col-sm-8">
                <Content style={{ padding: '0 50px' }}>
                  <div className="site-layout-content" style={{}}>
                    <h3><b>Statistics</b></h3>
                    <button onClick={()=> setData(data.map(value=> value+5))} >Today</button>
                    <button onClick={()=> setData(data.filter(value=> value <50))}>Week</button>
                    <button onClick={()=> setData([...data, Math.round(Math.random()*100)])}>Month</button>

                      <LineChart data={data}/>
                    </div>
                </Content>
              </div>
              <div class="col-sm-4">
                <Content style={{ padding: '0 50px' }}>
                  <div className="site-layout-content" style={{}}>
                  <h3><b>Statistics</b></h3>
                      <DrilldownPie data={data1} x={130} y={130} />
                    </div>
                </Content>
              </div>
              </div>
              </div>
            </Layout>
          </Fragment>
);
}

export default Home;
