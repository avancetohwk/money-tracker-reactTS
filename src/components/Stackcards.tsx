import React, { Component } from 'react'
import './Stackcards.scss'
import $ from 'jquery';
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

                        <div className="dp_item glassmorphism" data-class="1" data-position="1">
                            <div className="dp-content">

                            <p> Highest Frequency</p>
                            <a href="#" className="site-btn">343</a>
                            </div>
                        </div>

                        <div className="dp_item glassmorphism" data-class="2" data-position="2">
                            <div className="dp-content">

                            <p> Highest Amount </p>
                            <a href="#" className="site-btn">RM 1234.51</a>
                            </div>
                        </div>

                        <div className="dp_item glassmorphism" data-class="3" data-position="3">
                            <div className="dp-content">

                            <h2>Slide 3</h2>
                            <p> This is Slide 3 </p>
                            <a href="#" className="site-btn">Read More…</a>
                            </div>
                        </div>

                        <div className="dp_item glassmorphism" data-class="4" data-position="4">
                            <div className="dp-content">

                                <h2>Slide 4</h2>
                                <p> This is Slide 4 </p>
                                <a href="#" className="site-btn">Read More…</a>
                            </div>
                        </div>
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


