//App.js
import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
import { Modal } from "./Modal";

export default function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const webSocketRef = useRef();
  const [resp, setResp] = useState('--');
  const [units, setUnit] = useState(100);
  const [yields, setYields] = useState(9);
  const [showModal, setShowModal] = useState(false);
  var yieldchange = 9.9;
  var unitschange = 100;
  const openModal = () => {
    setShowModal(true);
  };
  useEffect(() => {
    (function() {
      //console.time('websocket');
      webSocketRef.current = new WebSocket('wss://ec59uo87q3.execute-api.ap-south-1.amazonaws.com/dev');
      //wss://sobtlwxwo5.execute-api.ap-south-1.amazonaws.com/dev
      //webSocketRef.current = new WebSocket('wss://sobtlwxwo5.execute-api.ap-south-1.amazonaws.com/dev');
      // webSocketRef.current.onopen = () =>  console.timeEnd('websocket');
     
      })();
  }, [])

  function getfees(){
    // Send the msg object as a JSON-formatted string.
    // var url = 'wss://8y048atr7j.execute-api.ap-south-1.amazonaws.com/dev';
    // webSocket = new WebSocket(url);
    let msg = {
      action: "getFees", 
      debenture_type: "NCD",
      input_fields: {
        'faceValue': 1000000,
        'issueDate': '21-Mar-2011',
        'couponRate': '8.60',
        'tradeDate': '24-Nov-21',
        'unitsTraded': 100,
        'unitsAlloted': 50,
        'allInYieldRate': '9.9',
        'tradeYTMRate': '8.6',
        'tenorInYrs': '7.3',
        'principalPaymentFreq': '12',
        'interestPaymentFreq': '6'}
        ,
      perform_action: 'view'
      };
        
    webSocketRef.current.send(JSON.stringify(msg)); 
    console.time('websocketSend');
    webSocketRef.current.onmessage = function (event) {
        setResp(event.data);
        console.timeEnd('websocketSend');
    }
  }
  function increaseY(){
    setYields(yields + 1)
    let msg = {
      action: "getFees", 
      debenture_type: "NCD",
      input_fields: {
        'faceValue': 1000000,
        'issueDate': '21-Mar-2011',
        'couponRate': '8.60',
        'tradeDate': '24-Nov-21',
        'unitsTraded': 100,
        'unitsAlloted': 50,
        'allInYieldRate': '9.9',
        'tradeYTMRate': '8.6',
        'tenorInYrs': '7.3',
        'principalPaymentFreq': '12',
        'interestPaymentFreq': '6'}
        ,
      perform_action: 'view'
      };
    webSocketRef.current.send(JSON.stringify(msg));
    webSocketRef.current.onmessage = function (event) {
      console.log('received');
      setResp(event.data);
  }
  }
  function decreaseY(){
    setYields(yields - 1)
    let msg = {
      action: "getFees", 
      debenture_type: "NCD",
      input_fields: {
        'faceValue': 1000000,
        'issueDate': '21-Mar-2011',
        'couponRate': '8.60',
        'tradeDate': '24-Nov-21',
        'unitsTraded': 100,
        'unitsAlloted': 50,
        'allInYieldRate': '9.9',
        'tradeYTMRate': '8.6',
        'tenorInYrs': '7.3',
        'principalPaymentFreq': '12',
        'interestPaymentFreq': '6'}
        ,
      perform_action: 'view'
      };
    webSocketRef.current.send(JSON.stringify(msg));
    webSocketRef.current.onmessage = function (event) {
      setResp(event.data);
  }
  }
  function increaseU(){
    setUnit(units + 1)
    let msg = {
      action: "getFees", 
      debenture_type: "NCD",
      input_fields: {
        'faceValue': 1000000,
        'issueDate': '21-Mar-2011',
        'couponRate': '8.60',
        'tradeDate': '24-Nov-21',
        'unitsTraded': 100,
        'unitsAlloted': 50,
        'allInYieldRate': '9.9',
        'tradeYTMRate': '8.6',
        'tenorInYrs': '7.3',
        'principalPaymentFreq': '12',
        'interestPaymentFreq': '6'}
        ,
      perform_action: 'view'
      };
    webSocketRef.current.send(JSON.stringify(msg));
    webSocketRef.current.onmessage = function (event) {
      setResp(event.data);
  }
  }
  function decreaseU(){
    setUnit(units - 1)
    let msg = {
      action: "getFees", 
      debenture_type: "NCD",
      input_fields: {
        'faceValue': 1000000,
        'issueDate': '21-Mar-2011',
        'couponRate': '8.60',
        'tradeDate': '24-Nov-21',
        'unitsTraded': 100,
        'unitsAlloted': 50,
        'allInYieldRate': '9.9',
        'tradeYTMRate': '8.6',
        'tenorInYrs': '7.3',
        'principalPaymentFreq': '12',
        'interestPaymentFreq': '6'}
        ,
      perform_action: 'view'
      };
    webSocketRef.current.send(JSON.stringify(msg));
    webSocketRef.current.onmessage = function (event) {
      setResp(event.data);
  }
  }
  
  return (
    <div className="App">
      <h1>Buy Bonds</h1>
      <h2>Fee calculator</h2>
      <div>
        <h4>Yield rate</h4>
      <button onClick={decreaseY}>-</button><p>{yields}</p><button onClick={increaseY}>+</button>
      </div>
      <div>
      <h4>Total units</h4>
      <button onClick={decreaseU}>-</button><p>{units}</p><button onClick={increaseU}>+</button>
      </div>
      <div>
      <h4>Trade date</h4>
      <button onClick={getfees}>-</button><p>24-Nov-21</p><button onClick={getfees}>+</button>
      </div>
      <div>
        <h5>Distribution Fee: 1000</h5>
      </div>
      <button>Download Cashflows</button><br></br><br></br>
      <button onClick={openModal}>View Cashflows</button>
      {showModal ? <Modal setShowModal={setShowModal} /> : null}
      <div>
      <h5>
        {resp}
        </h5>
        </div>
    </div>
  );
}

// {
//   "action": "getFees", 
//   "debenture_type": "NCD",
//   "input_fields": {
//     "faceValue": "1000000",
//     "issueDate": "21-Mar-2011",
//     "couponRate": "8.60",
//     "tradeDate": "24-Nov-21",
//     "unitsTraded": "100",
//     "unitsAlloted": "50",
//     "allInYieldRate": "9.9",
//     "tradeYTMRate": "8.6",
//     "tenorInYrs": "7.3",
//     "principalPaymentFreq": "12",
//     "interestPaymentFreq": "6"}
//     ,
//   "perform_action": "view"
//   }