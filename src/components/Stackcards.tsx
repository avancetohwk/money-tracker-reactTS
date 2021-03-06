import React, { Component } from 'react'
import './Stackcards.scss'
import $ from 'jquery';
import CategoryChips from './CategoryChips';
import { FaChartBar, FaDollarSign, FaInfo } from 'react-icons/fa';
class CategoryCards extends Component {
  constructor(props){
    super(props)
    
  }


  componentDidMount(){
    function detect_active (){
      // get active
      var get_active = $("#dp-slider .dp_item:first-child").data("class");
      $("#dp-dots li").removeClass("active");
      $("#dp-dots li[data-class="+ get_active +"]").addClass("active");
    } 


    $("body").on("click", "#dp-slider .dp_item:not(:first-child)", function(){
      var get_slide = $(this).attr('data-class');
      $("#dp-slider .dp_item[data-class=" + get_slide + "]").hide().prependTo("#dp-slider").fadeIn();
      $.each($('.dp_item'), function (index, dp_item) {
        $(dp_item).attr('data-position', index + 1);
      });

      detect_active();
    });


    $("body").on("click", "#dp-slider .dp_item:first-child", function(){
      var get_slide = +($(this).attr('data-class'));
      get_slide = get_slide>3?1:get_slide+1;
      $("#dp-slider .dp_item[data-class=" + get_slide + "]").hide().prependTo("#dp-slider").fadeIn();
      
      $.each($('.dp_item'), function (index, dp_item) {
        $(dp_item).attr('data-position', index + 1);
      });

      detect_active();
    });
  }



  render() {
    return (
        // <div className="flex-centre">
        //   <div style={{width:'100%'}}>
            <div className="container" id="dp-slider">
              {/* <div id="slider">*/}
                {/* <div className="dp-wrap"> 
                    <div id="dp-slider"> */}

                        <div className="dp_item glassmorphism neumorphism accent pressed" data-class="1" data-position="1">
                            <div className="dp-content">
                              <h2>343</h2>
                              <p> Highest Frequency</p>
                              {/* <a href="#" className="site-btn">343</a> */}
                            </div>
                            <div className="chipsList radio-toolbar" style={{display:'flex',overflowX:'auto'}} >
                              <div className="chipContainer " >
                                  <input type="radio" id={'chip_frequency'} name='categoryDetails' value={'frequency'}></input>
                                  <label className="neumorphism concave" htmlFor={'chip_frequency'}><FaChartBar /></label>
                              </div>
                              <div className="chipContainer " style={{marginBottom:'1.5em'}} >
                                  <input type="radio" id={'chip_amount'} name='categoryDetails' value={'amount'}></input>
                                  <label className="neumorphism concave"  htmlFor={'chip_amount'}><FaDollarSign /></label>
                              </div>
                              <div className="chipContainer " >
                                  <input type="radio" id={'chip_average'} name='categoryDetails' value={'average'}></input>
                                  <label className="neumorphism concave " htmlFor={'chip_average'}><FaInfo /></label>
                              </div>
                            </div>
                        </div>
{/* 
                        <div className="dp_item glassmorphism" data-class="2" data-position="2">
                            <div className="dp-content">
                            <h2>RM 1234.41</h2>
                            <p> Highest Amount </p>
                            </div>
                        </div>

                        <div className="dp_item glassmorphism" data-class="3" data-position="3">
                            <div className="dp-content">

                            <h2>RM 3.45</h2>
                            <p>Average Amount </p>
                            </div>
                        </div>

                        <div className="dp_item glassmorphism" data-class="4" data-position="4">
                            <div className="dp-content">

                              <h2>RM 321.45</h2>
                              <p>Average Amount </p>
                            </div>
                        </div> */}
                    {/* </div>
                 </div> */}
              {/*</div> */}
            </div>
        //   </div>
        // </div>
    )
  }
}

export default CategoryCards;


