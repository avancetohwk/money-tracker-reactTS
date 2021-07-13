import { cpuUsage } from 'process';
import * as React from 'react';
//import { Swiper } from 'swiper';
import { Swiper,SwiperSlide } from 'swiper/react';
import './CategoryCard.scss'
import 'swiper/swiper.scss';

export interface ICategoryCardItem {
    text: string;
    value: number;
    amount:number;
    frequency:number;
}


export interface ICategoryCardState {
  words: ICategoryCardItem[]
}

export interface ICategoryCardProps {
    words: ICategoryCardItem[]
}


export default class CategoryCard extends React.Component {

    constructor(props) {
      super(props);
    //   const swiper = new Swiper('.blog-slider', {
    //     spaceBetween: 30,
    //     effect: 'fade',
    //     loop: true,
    //     mousewheel: {
    //       invert: false,
    //     },
    //     // autoHeight: true,
    //     pagination: {
    //       el: '.blog-slider__pagination',
    //       clickable: true,
    //     }
    //   });
    }
    

    componentDidUpdate(prevProps) {
    }


    

    public render(): React.ReactElement<ICategoryCardProps> {
        return (
            <Swiper
                spaceBetween={30}
                effect={'fade'}
                loop={true}
                //mousewheel={invert:false}
                //slidesPerView={3}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                >
                    
                <SwiperSlide className='blog-slider'>
                    <div className="blog-slider__img">
                        <img src="https://res.cloudinary.com/muhammederdem/image/upload/v1535759872/kuldar-kalvik-799168-unsplash.jpg" alt=""></img>
                    </div>
                    <div className="blog-slider__item ">
                        <div className="blog-slider__content">
                            <span className="blog-slider__code">Frequency</span>
                            {/* <div className="blog-slider__title">Lorem Ipsum Dolor</div> */}
                            <div className="blog-slider__text">334 </div>
                            <a href="#" className="blog-slider__button">READ MORE</a>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide><div className="blog-slider__img">
                        <img src="https://res.cloudinary.com/muhammederdem/image/upload/v1535759872/kuldar-kalvik-799168-unsplash.jpg" alt=""></img>
                    </div>
                    <div className="blog-slider__item ">
                        <div className="blog-slider__content">
                            <span className="blog-slider__code">Frequency</span>
                            {/* <div className="blog-slider__title">Lorem Ipsum Dolor</div> */}
                            <div className="blog-slider__text">334 </div>
                            <a href="#" className="blog-slider__button">READ MORE</a>
                        </div>
                    </div></SwiperSlide>
                <SwiperSlide><div className="blog-slider__img">
                        <img src="https://res.cloudinary.com/muhammederdem/image/upload/v1535759872/kuldar-kalvik-799168-unsplash.jpg" alt=""></img>
                    </div>
                    <div className="blog-slider__item ">
                        <div className="blog-slider__content">
                            <span className="blog-slider__code">Frequency</span>
                            {/* <div className="blog-slider__title">Lorem Ipsum Dolor</div> */}
                            <div className="blog-slider__text">334 </div>
                            <a href="#" className="blog-slider__button">READ MORE</a>
                        </div>
                    </div></SwiperSlide>
                <SwiperSlide><div className="blog-slider__img">
                        <img src="https://res.cloudinary.com/muhammederdem/image/upload/v1535759872/kuldar-kalvik-799168-unsplash.jpg" alt=""></img>
                    </div>
                    <div className="blog-slider__item ">
                        <div className="blog-slider__content">
                            <span className="blog-slider__code">Frequency</span>
                            {/* <div className="blog-slider__title">Lorem Ipsum Dolor</div> */}
                            <div className="blog-slider__text">334 </div>
                            <a href="#" className="blog-slider__button">READ MORE</a>
                        </div>
                    </div></SwiperSlide>
            </Swiper>
            // <div className="blog-slider">
            //     <div className="blog-slider__wrp swiper-wrapper">
                    // <div className="blog-slider__img">
                            
                    //     <img src="https://res.cloudinary.com/muhammederdem/image/upload/v1535759872/kuldar-kalvik-799168-unsplash.jpg" alt=""></img>
                    // </div>
            //         <div className="blog-slider__item swiper-slide">
                        
            //             <div className="blog-slider__content">
            //                 <span className="blog-slider__code">Frequency</span>
            //                 {/* <div className="blog-slider__title">Lorem Ipsum Dolor</div> */}
            //                 <div className="blog-slider__text">334 </div>
            //                 <a href="#" className="blog-slider__button">READ MORE</a>
            //             </div>
            //         </div>
            //         <div className="blog-slider__item swiper-slide">
            //             <div className="blog-slider__content">
            //                 <span className="blog-slider__code">26 December 2019</span>
            //                 {/* <div className="blog-slider__title">Lorem Ipsum Dolor2</div> */}
            //                 <div className="blog-slider__text">2123</div>
            //                 <a href="#" className="blog-slider__button">READ MORE</a>
            //             </div>
            //         </div>
                    
            //         <div className="blog-slider__item swiper-slide">
            //             <div className="blog-slider__content">
            //                 <span className="blog-slider__code">26 December 2019</span>
            //                 {/* <div className="blog-slider__title">Lorem Ipsum Dolor</div> */}
            //                 <div className="blog-slider__text">321</div>
            //                 <a href="#" className="blog-slider__button">READ MORE</a>
            //             </div>
            //         </div>
                    
            //     </div>
            //     <div className="blog-slider__pagination"></div>
            // </div>
        );
    }
}