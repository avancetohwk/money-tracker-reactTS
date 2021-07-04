import React, { Component } from 'react'
import './Stackcards.scss'
import './Stackcards.js'
class CategoryCards extends Component {
  constructor(props){
    super(props)
    
  }

  render() {
    return (
        <div className="flex-centre">
          <div style={{width:'100%'}}>
            <div className="container" style={{maxWidth:'1400px',margin: '0 auto'}}>
              <div id="slider">
                <div className="dp-wrap">
                    <div id="dp-slider">

                        <div className="dp_item" data-class="1" data-position="1">
                            <div className="dp-content">

                              <h2>Slide 1</h2>
                              <p> This is Slide 1 </p>
                              <a href="#" className="site-btn">Read More…</a>
                            </div>
                            {/* <div className="dp-img">
                            <img className="img-fluid" src="https://placeimg.com/821/739/any" alt="investing"></img>
                            </div> */}
                        </div>

                        <div className="dp_item" data-class="2" data-position="2">
                            <div className="dp-content">

                            <h2>Slide 2</h2>
                            <p> This is Slide 2 </p>
                            <a href="#" className="site-btn">Read More…</a>
                            </div>
                            {/* <div className="dp-img">
                            <img className="img-fluid" src="https://placeimg.com/821/738/any" alt="investing"></img>
                            </div> */}
                        </div>

                        <div className="dp_item" data-class="3" data-position="3">
                            <div className="dp-content">

                            <h2>Slide 3</h2>
                            <p> This is Slide 3 </p>
                            <a href="#" className="site-btn">Read More…</a>
                            </div>
                            {/* <div className="dp-img">
                            <img className="img-fluid" src="https://placeimg.com/821/737/any" alt="investing"></img>
                            </div> */}
                        </div>

                        <div className="dp_item" data-class="4" data-position="4">
                            <div className="dp-content">

                                <h2>Slide 4</h2>
                                <p> This is Slide 4 </p>
                                <a href="#" className="site-btn">Read More…</a>
                            </div>
                            {/* <div className="dp-img">
                                <img className="img-fluid" src="https://placeimg.com/821/736/any" alt="investing"></img>
                            </div> */}
                        </div>
                    </div>
                    {/* <ul id="dp-dots">
                      <li data-class="1" className="active"></li>
                      <li data-class="2"></li>
                      <li data-class="3"></li>
                      <li data-class="4"></li>
                    </ul> */}
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default CategoryCards;


