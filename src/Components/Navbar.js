import React, { Component } from 'react';
import './Navbar.css'

export default class Navbar extends Component {

    constructor(props) {
        super(props)
        this.state = {
         currencyINR:true
        }
      }


  render() {
    return <>

    <div className="navbar">

        <div className="searchbar">
            <img src="https://img.icons8.com/ios/50/000000/search--v1.png"/>
            <input type="text" placeholder='Type a new search'/>
           
        </div>

        <div className="logo">
        <img src="https://demonexpwa.gumlet.io/logo/stores/1/NexPWA_-_Color_2.png" />
        </div>

        <div className="languages">
            <select  className='language-select'>
                <option >English</option>
                <option >Arabic (عربى)</option>
            </select>
        </div>


        <div className="currency">
            <select className='currency-select' onChange={()=>
                {this.props.data.isCurrencyInr(!this.state.currencyINR);
                this.setState({currencyINR:!this.state.currencyINR})}}>
                <option >INR</option>
                <option >USD</option>
            </select>
        </div>

        <div className="my-account">
        <svg xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 0 24 24" width="26" fill="grey"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>
        </div>

        <div className="cart">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="grey"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M22 9h-4.79l-4.38-6.56c-.19-.28-.51-.42-.83-.42s-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1zM12 4.8L14.8 9H9.2L12 4.8zM18.5 19l-12.99.01L3.31 11H20.7l-2.2 8zM12 13c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
        </div>
        
        </div>    

        <div className="menu-list">
            <div className="menu-list-inner">
            <ul>
                <li>Men</li>
                <li>Women</li>
                <li>Accessories</li>
                <li>Footwear</li>
                <li>Trending</li>
            </ul>
            </div>
        </div>

        <div className="horizontal-line">
            <hr />
        </div>

    
    </>;
  }
}
