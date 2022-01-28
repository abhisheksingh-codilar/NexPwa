import React, { Component } from 'react'
import Header from './Components/Header';
import Navbar from './Components/Navbar';
import Slider from './Components/Slider';
import sendRequest from './request';
import './styles/App.css';


export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: null,
      breadcrumbs:[],
      images:[],
      currency:null,
      cartItems:1,
      description:null,
      relatedProducts:[],
      footer:null,
      currencyInr:true
    }
  }

  handleIncrement = () =>{
    this.setState({cartItems:this.state.cartItems + 1})
  }

  handleDecrement = () =>{
    this.setState({cartItems:this.state.cartItems - 1})
  }

  isCurrencyInr =(val) =>{
    this.setState({currencyInr:val})
  }

  componentDidMount() {


    const query = `
    query{

      cmsBlocks (identifiers: "1"){
        items {
          content
          disabled
          identifier
         
        }
      }
      currency{
        available_currency_codes
        base_currency_code
        base_currency_symbol
        default_display_currecy_code
        default_display_currecy_symbol
        default_display_currency_code
        default_display_currency_symbol
        exchange_rates{
    currency_to
    rate
  }
      }
  products(
    search: null
    sort: { position: ASC }
    currentPage: 1
    pageSize: 1
    filter: {
      custom_filter: [{ attribute: "entity_id", condition: { eq: "1958" } }]
    }
  ){
  items{
    name
 
    sku
    special_price 
    price{
    regularPrice{
      amount{
        currency
        value
      }
    }
      
      
  }
    
     breadcrumbs{
    category_name

  }
    
    media_gallery_entries{
      id
      thumbnail{
        url
      }
     
    }
    
    description{
      html
    }
    
    related_products{
      media_gallery_entries{
        thumbnail{
          url
        }
      }
      name
      sku
    special_price 
    price{
    regularPrice{
      amount{
        currency
        value
      }
    }

  }    
 image{
  url
  
}
      thumbnail{
        url
      }
    }

  
}

}
    }
    
    `
    sendRequest({
      query,
    }).then(res => {
      this.setState({
        data: res,
        breadcrumbs:res.data.products.items[0].breadcrumbs,
        images:res.data.products.items[0].media_gallery_entries,
        currency:res.data.currency,
        description:res.data.products.items[0].description.html,
        relatedProducts:res.data.products.items[0].related_products,
        footer:res.data.cmsBlocks.items[0].content
      })
    })
  
  }

  render() {

    return (
      <div className="App">
          {
              !this.state.data ? (
                <p>Loading....</p>
              ) : (
                <>
                  <div className="header-section" >

                <Header/>

                <Navbar data ={{isCurrencyInr:this.isCurrencyInr.bind(this)}}/>
                </div>

                <div className="breadcrumbs">
                      <div className="breadcrumbs-inner">
                      <ul>
                        <li>Home</li>
                        <div className='arrow'></div>
                        {
                          this.state.breadcrumbs.map((item)=>{
                            return(
                              <>
                              <li>{item.category_name}</li>
                              <div className='arrow'></div>
                              </>
                            )
                          })
                        }

                          <li style={{color:'#888'}}>{this.state.data.data.products.items[0].name}</li>
                      </ul>

                      </div>
                </div>

                <div className="product-content">

                 <div className="slider-img">
                <Slider images={this.state.images}/>
                </div>
                
                <div className="product-details">

                        <div className="heading">
                          <h1>{this.state.data.data.products.items[0].name}</h1>
                          <p>SKU: {this.state.data.data.products.items[0].sku}</p>
                        </div>

                            <div className="cart-price-section">

                                <div className="price-tags">
                                  <div className='special-price'>
                                      {this.state.currencyInr ? this.state.currency.base_currency_symbol :'$'}
                                      {this.state.currencyInr ? (this.state.data.data.products.items[0].special_price).toFixed(2) :  (this.state.data.data.products.items[0].special_price*0.013).toFixed(2)}
                                  </div>

                                  <div className="original-price">
                                  {this.state.currencyInr ? this.state.currency.base_currency_symbol :'$'}
                                  {this.state.currencyInr ? (this.state.data.data.products.items[0].price.regularPrice.amount.value).toFixed(2): (this.state.data.data.products.items[0].price.regularPrice.amount.value*0.013).toFixed(2) }
                                  </div>
                                  </div>

                            <div className="cart-details">

                              <div className="input">
                                <input  value={this.state.cartItems} />
                                <button className='increment' onClick={this.handleIncrement}>+</button>
                                <button disabled={this.state.cartItems == 1} className='decrement' onClick={this.handleDecrement}>-</button>
                              </div>

                              <button className="add-to-cart">
                                ADD TO CART
                              </button>

                            </div>
                        </div>

                        <div className="additional-buttons">
                          <button>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#e0e0e0" d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"></path></svg>
                          </button>
                          <button>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 19h-6v-11h6v11zm8-18h-6v18h6v-18zm8 11h-6v7h6v-7zm1 9h-24v2h24v-2z"></path></svg>
                          </button>
                          <button>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 9c-1.656 0-3 1.343-3 3s1.344 3 3 3 3-1.343 3-3-1.344-3-3-3zm-15 9c-1.657 0-3 1.343-3 3s1.343 3 3 3c1.656 0 3-1.343 3-3s-1.344-3-3-3zm3-15c0 1.657-1.344 3-3 3s-3-1.343-3-3 1.344-3 3-3 3 1.343 3 3zm1.588-1.979l.412-.021c4.281 0 7.981 2.45 9.8 6.021-.717.029-1.39.21-1.998.511-1.555-2.703-4.466-4.532-7.802-4.532 0-.703-.149-1.372-.412-1.979zm10.212 15.958c-1.819 3.571-5.519 6.021-9.8 6.021l-.412-.021c.263-.607.412-1.276.412-1.979 3.336 0 6.247-1.829 7.802-4.532.608.302 1.281.483 1.998.511zm-18.91 1.186c-1.193-1.759-1.89-3.88-1.89-6.165s.697-4.406 1.89-6.165c.392.566.901 1.039 1.487 1.403-.867 1.383-1.377 3.012-1.377 4.762s.51 3.379 1.377 4.762c-.586.364-1.096.837-1.487 1.403z"></path></svg>
                          </button>
                        </div>

                </div>

                </div>


                <div className="description-wrapper">
                  <div className="description">
                    <h2>ABOUT THIS PRODUCT</h2>
                    <div className="description-html" dangerouslySetInnerHTML={{ __html: this.state.description }}/>
                  </div>
                </div>

                <div className="customer-reviews">

                  <div className="review-summary">
                  <h3>Customer reviews</h3>
                  <p>There are no reviews yet! Click button on the right to submit one!</p>
                  </div>

                  <div className="review-btn">
                    <button>WRITE A NEW REVIEW</button>
                  </div>
                </div>

                <div className="related-products">
                  <h4>YOU MAY ALSO LIKE</h4>

                  <div className="image-cards">

                  {this.state.relatedProducts.map((product =>{
                          return(
                            <div className="card">

                       
                            <div className="card-img">
                              <img  style={{backgroundColor:"rgb(243, 243, 243)"}} src={product.image.url} alt="img" className='image-img' />
                            </div>
      
                            <div className="price-tags-card">
                            <div className='special-price-card'>
                                {this.state.currencyInr ?this.state.currency.base_currency_symbol:'$'}{this.state.currencyInr ?(product.special_price).toFixed(2) :(product.special_price*0.013).toFixed(2) }
                            </div>
      
                            <div className="original-price-card">
                            {this.state.currencyInr ?this.state.currency.base_currency_symbol:'$'}{this.state.currencyInr ?(product.price.regularPrice.amount.value).toFixed(2):(product.price.regularPrice.amount.value*0.013).toFixed(2) }
                            </div>
      
      
                            </div>
      
                            <div className="name">
                            {product.name}
                            </div>
      
      
                          </div>
                          )
                        }))}
                  

                  </div>
                </div>

                <div className="footer-wrapper">
                <div className='footer-inner' dangerouslySetInnerHTML={{ __html: this.state.footer }}/>
                </div>
              
                </>
              )
          }
      </div>
      
   
      
   
    );
  }
}
