import React, { Component } from 'react';
import { IWordcloudItem, Wordcloud } from '../components/Wordcloud';
import {withRouter} from 'react-router-dom'
import './Dashboard.scss';
import { RouteComponentProps } from '@reach/router';
import '../global.css'
import Sidebar from '../components/Sidebar';
import styled from "styled-components";
import CategoryCards from '../components/Stackcards';
import CategoryChart from '../components/CategoryChart';
import IncomeChart from '../components/IncomeChart';
import CategoryChips from '../components/CategoryChips';
import moment from 'moment';
import CombinedChart from '../components/CombinedChart';
import history from '../utils/history';
import CategoryCard from '../components/CategoryCard';
import {SwiperSlide,Swiper} from 'swiper/react';
import 'swiper/swiper.scss';
import CategorySection from '../components/CategorySection';
import { BottomSheet } from 'react-spring-bottom-sheet';
import "react-spring-bottom-sheet/dist/style.css";

import {categories} from '../utils/lookups'
// import CategoryCards from '../components/CategoryCards';

interface IFinanceTrackings{
  date:Date,
  account:string,
  category:string,
  amount:number,
  "converted amount": number,
  currency:string,
  description:string
}


class Dashboard extends Component<RouteComponentProps> {
    constructor(props) {
    super(props);

    }
  componentDidMount(){
    console.log(this.props)
    if(this.props.location.state == undefined){
      history.push("/");
    }

    // var spendingGroup = data.filter(t=>+t.amount.toString().replace(/,/g, '')<0 && moment(t.date,'DD/MM/YYYY').format('YYYY') == '2019').reduce((p,c)=>{
    //   let currAmount = isNaN(c.amount)? +c.amount.toString().replace(/,/g, ''):+c.amount; //caters for thousand separated values where its a string
    //   let year = moment(c.date,'DD/MM/YYYY').format("MMM YYYY")
    //   p[year] = p[year]? {x:year, y: p[year].y+=  Math.abs(currAmount)} : {x:year, y:  Math.abs(currAmount)};
    //   return p
    // },{})
    var data = this.props.location.state as any[];
    var allData  = data.map(c=>{
      return {
        date: moment(c.date,'DD/MM/YYYY'), 
        account: c.account, 
        amount:c.amount.toString().replace(/,/g, ''),
        category: c.category,
        currency: c.currency,
        description: c.description?.trim()
      }
    })
    this.setState({allData: allData},()=>{
      
      this.getIncomeChartData();
      this.getCategoryChartData()
      this.getCategoryCardData();
    })
    
    
      // this.setState({allFinanceTrackings: this.props.location.state})
      // console.log(this.state)
  }

  wordcloudWords: IWordcloudItem[];
  papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transform: val =>
    val
        .trim()
  }


  state={
    allData:null,
    wordcloudWords: null,
    incomeChartData:null,
    incomeChartLabel:null,
    allFinanceTrackings: null,
    combinedChartData:null,
    categoryChartData:null,
    categoryCardData:null,
    categoryChipsData:[{text:'Food'},{text:'Medical'},{text:'Allowance'},{text:'Technology'},{text:'Games'},{text:'Sports'},{text:'Shirts'},{text:'All'},{text:'Car'},{text:'Trip'},{text:'Education'}],
    dateChipsData:[{text:"All"},{text:"Month"},{text:"Year"}]
  }

  render() {
    const { incomeChartData,combinedChartData,categoryChartData,categoryCardData, categoryChipsData, dateChipsData } = this.state;
    console.log(categoryCardData)
    return (
        // <FileInput onFileUploaded={this._onUpload}></FileInput>
        <div className="App">
            {/* <Sidebar /> */}
            
            {/* <div style={{position:'absolute',opacity:0.2,height: '100%', width: '100%', zIndex:-1}}>
                {this.state.wordcloudWords? <Wordcloud words={this.state.wordcloudWords}></Wordcloud>: null}    
            </div> */}
            {/* <div style={{display:'flex',justifyContent:'center'}}>
                <div className="glassmorphism-black" style={{height:'50vh',width:'50%'}}>
                    <h1>das</h1>
                </div>
            </div> */} 
            
            <section id="graph-section">
              <div >
                {dateChipsData? <CategoryChips data={dateChipsData} groupName="date" extraClass=""></CategoryChips>: null}
              </div>
              <div id="graph-card" className="neumorphism pressed" >
                {incomeChartData? <IncomeChart data={incomeChartData}></IncomeChart>: null}
                {combinedChartData? <CombinedChart data={combinedChartData}></CombinedChart>: null}
              </div>
            </section>
            <BottomSheet
              open={true}
              className="neumorphism pressed accent"
              //onDismiss={() => setOpen(false)}
              blocking={false}
              defaultSnap={({ maxHeight }) => maxHeight * 0.4}
              snapPoints={({ maxHeight }) => [maxHeight * 0.4, maxHeight * 0.9]}
              footer={
                categoryChipsData? <CategoryChips data={categoryChipsData} groupName="category" extraClass="accent"></CategoryChips>: null
              }
            >
              <div>
              <div  className='neumorphism accent concave category-card col-12' id="category-chart-card">
                    <div className="col-6" >
                      {categoryChartData? <CategoryChart data={categoryChartData}></CategoryChart>: null}
                      </div>
                      <div className="col-6">
                        {categoryCardData? <CategoryCard item={categoryCardData}></CategoryCard>: null}
                      
                      
                    </div>
                  </div>
                  <div className=" neumorphism accent concave category-card " id="category-data-list-card">
                  <div className="col-12 category-data-list">
                      <div className="row neumorphism pressed spending category-data">
                        <div className="col-8">
                          <span>Dinner mamak</span>
                          <p>02/07/2021</p>
                        </div>
                        <div className="col-4 data-amount">RM 23.44</div>
                      </div>

                      <div className="row neumorphism pressed spending category-data">
                        <div className="col-8">
                          <span>Dinner mamak</span>
                          <p>02/07/2021</p>
                        </div>
                        <div className="col-4 data-amount">RM 23.44</div>
                      </div>

                      <div className="row neumorphism pressed income category-data">
                        <div className="col-8">
                          <span>Dinner mamak</span>
                          <p>02/07/2021</p>
                        </div>
                        <div className="col-4 data-amount">RM 23.44</div>
                      </div>

                      <div className="row neumorphism pressed spending category-data">
                        <div className="col-8">
                          <span>Dinner mamak</span>
                          <p>02/07/2021</p>
                        </div>
                        <div className="col-4 data-amount">RM 23.44</div>
                      </div>
                      
                      <div className="row neumorphism pressed income category-data">
                        <div className="col-8">
                          <span>Dinner mamak</span>
                          <p>02/07/2021</p>
                        </div>
                        <div className="col-4 data-amount">RM 23.44</div>
                      </div>

                      <div className="row neumorphism pressed income category-data">
                        <div className="col-8">
                          <span>Dinner mamak</span>
                          <p>02/07/2021</p>
                        </div>
                        <div className="col-4 data-amount">RM 23.44</div>
                      </div>
                    </div>
                  </div>
              </div>
              
              
            </BottomSheet>
            {/* <section id="category-section" className="neumorphism accent pressed" >
              <Swiper style={{ width: '100%', height: '80%' }}
                spaceBetween={40}
                effect={'fade'}
                loop={true}
                // autoHeight= {true}
                //mousewheel={invert:false}
                //slidesPerView={3}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                >
                    
                <SwiperSlide style={{width:'100%'}} className=' '>
                  <div  className='neumorphism accent concave category-card col-12' id="category-chart-card">
                    <div className="col-6" >
                      {categoryChartData? <CategoryChart data={categoryChartData}></CategoryChart>: null}
                      </div>
                      <div className="col-6">
                        {categoryCardData? <CategoryCard item={categoryCardData}></CategoryCard>: null}
                      
                      
                    </div>
                  </div>
                 
                </SwiperSlide>
                <SwiperSlide style={{width:'100%'}} className="">
                  <div className=" neumorphism accent concave category-card " id="category-data-list-card">
                  <div className="col-12 category-data-list">
                      <div className="row neumorphism pressed spending category-data">
                        <div className="col-8">
                          <span>Dinner mamak</span>
                          <p>02/07/2021</p>
                        </div>
                        <div className="col-4 data-amount">RM 23.44</div>
                      </div>

                      <div className="row neumorphism pressed spending category-data">
                        <div className="col-8">
                          <span>Dinner mamak</span>
                          <p>02/07/2021</p>
                        </div>
                        <div className="col-4 data-amount">RM 23.44</div>
                      </div>

                      <div className="row neumorphism pressed income category-data">
                        <div className="col-8">
                          <span>Dinner mamak</span>
                          <p>02/07/2021</p>
                        </div>
                        <div className="col-4 data-amount">RM 23.44</div>
                      </div>

                      <div className="row neumorphism pressed spending category-data">
                        <div className="col-8">
                          <span>Dinner mamak</span>
                          <p>02/07/2021</p>
                        </div>
                        <div className="col-4 data-amount">RM 23.44</div>
                      </div>
                      
                      <div className="row neumorphism pressed income category-data">
                        <div className="col-8">
                          <span>Dinner mamak</span>
                          <p>02/07/2021</p>
                        </div>
                        <div className="col-4 data-amount">RM 23.44</div>
                      </div>

                      <div className="row neumorphism pressed income category-data">
                        <div className="col-8">
                          <span>Dinner mamak</span>
                          <p>02/07/2021</p>
                        </div>
                        <div className="col-4 data-amount">RM 23.44</div>
                      </div>
                    </div>
                  </div>
                    
                  </SwiperSlide>
                </Swiper>
                
              {categoryChipsData? <CategoryChips data={categoryChipsData} groupName="category" extraClass="accent"></CategoryChips>: null}
              
              </section>
            <CategorySection></CategorySection> */}
        
        </div>
      

      
    )
  }

  getIncomeChartData = ()=>{
    var spendingGroup = this.state.allData.filter(t=>+t.amount<0 && t.date.format('YYYY') == '2019').reduce((p,c)=>{
      let currAmount = +c.amount; //caters for thousand separated values where its a string
      let year = c.date.format("MMM YYYY")
      p[year] = p[year]? {x:year, y: p[year].y+=  Math.abs(currAmount)} : {x:year, y:  Math.abs(currAmount)};
      return p
    },{})

    var incomeGroup = this.state.allData.filter(t=>+t.amount>0 && moment(t.date,'DD/MM/YYYY').format('YYYY') == '2019').reduce((p,c)=>{
      let currAmount = +c.amount; //caters for thousand separated values where its a string
      let year = c.date.format("MMM YYYY")
      p[year] = p[year]? {x:year, y: p[year].y+=  Math.abs(currAmount)} : {x:year, y:  Math.abs(currAmount)};
      return p
    },{})
    console.log(this.state.allData.filter(t=>t.amount>0))
    var incomeData = Object.keys(incomeGroup).map(g=>{return incomeGroup[g]}).sort((a,b)=>{return moment(a,"MMM YYYY")<moment(b,"MMM YYYY")?-1:1 })
    var spendingsData = Object.keys(spendingGroup).map(g=>{return spendingGroup[g]}).sort((a,b)=>{return moment(a,"MMM YYYY")<moment(b,"MMM YYYY")?-1:1 })
    console.log(spendingGroup)

    //var incomeChartData = data.map(t=> Math.abs(t.amount))
    this.setState({combinedChartData:[incomeData,spendingsData]})
  }

  getCategoryChartData = ()=>{
    var categoryGroup = this.state.allData.filter(t=>t.category == "Allowance" ).reduce((p,c)=>{
      let currAmount = +c.amount; //caters for thousand separated values where its a string
      let year = c.date.format("MMM YYYY")
      p[year] = p[year]? {x:year, y: p[year].y+=  Math.abs(currAmount)} : {x:year, y:  Math.abs(currAmount)};
      return p
    },{})

    console.log(categoryGroup)
    var values = [];
    var labels=[];
    Object.keys(categoryGroup).forEach(g=>{
      values.push(categoryGroup[g].y)
      labels.push(g)
    })
    var categoryData = {values:values, labels:labels};
    console.log(categoryData)
    this.setState({categoryChartData:categoryData})
  }

  getCategoryCardData = ()=>{
    var categoryCardData = {
      frequency: '334',
      amount: '1234.12',
      average: '928.45'  
    }

    this.setState({categoryCardData:categoryCardData});
  }
  
}





export default (Dashboard);