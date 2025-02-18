import React from 'react';
import './App.css';
import DataIntro from './DataIntro/DataIntro';
import VisualController from './VisualController/VisualController';
import ModuleContainer from './ModuleContainer/ModuleContainer';
import Parameter from './Parameter/Parameter';
import DataSource from './DataSource/DataSource';
import DataRange from './DataRange/DataRange';
import CalcuInfo from './CalcuInfo/CalcuInfo';
import DateStatistic from './DateStatistic/DateStatistic';
import Result from './Result/Result';
import Map from './Map/Map';
import Layer from './Layer/Layer';
import Nano from './Nano/Nano';
import NanoCharts from './NanoCharts/NanoCharts';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dimension: 3,
      scale: 1,
      colorObj: {
        isRShow: true, 
        isGShow: true,
        isBShow: true,
        RContent: 1,
        GContent: 2,
        BContent: 3,
      },
      layer: 1,
      params:{
        KType: 'S',
        DataCate1: 0,
        DataCate2: 1,
        SpatialMax: 2000,
        TimeMax: 20,
        SpatialStep: 20,
        TimeStep: 20,
        simuTime: 100,
      },
      calResult: null,
    };
  };
  changeDimension = (isChecked) => {
    this.setState({dimension : isChecked ? 3 : 2});
  };

  changeColor = (colorObject) => {
    this.setState({colorObj: colorObject});
  };

  changeScale = (scale) => {
    this.setState({scale: scale});
  }

  changeLayer = (layer) => {
    this.setState({layer: layer});
  };

  updateParams = (params) => {
    this.setState({params: params});
  }

  getCalResult = (calResult) => {
    this.setState({calResult: calResult});
  }

  render() {
    const layer = this.state.layer;
    return (
      <div>
        <div className={layer === 2 ? 'hidden' : ''}>
          <Map dimension={this.state.dimension} colorObj={this.state.colorObj} scale={this.state.scale}/>
        </div>
        <div className={layer === 1 ? 'hidden' : ''}>
          <Nano />
        </div>
        <div className={`left-moudles ${layer === 2 ? 'bottom' : ''}`}>
          <ModuleContainer  title="点数据概况" close="true" hidden={layer === 2}>
            <DataIntro />
          </ModuleContainer>
          <ModuleContainer  title="展示控制" hidden={layer === 2}>
            <VisualController changeDimension={this.changeDimension} changeColor={this.changeColor} changeScale={this.changeScale}/>
          </ModuleContainer>
          <ModuleContainer  title="图层选择" close="true">
            <Layer changeLayer={this.changeLayer}/>
          </ModuleContainer>
          <ModuleContainer  title="属性选择" autowidth="true" hidden={layer === 1}>
            <NanoCharts />
          </ModuleContainer>
          <ModuleContainer  title="时间统计" autowidth="true" dark="true" hidden={layer === 1}>
            <DateStatistic />
          </ModuleContainer>
        </div>
        <div className="right-moudles">
          <ModuleContainer  right="true" title="数据源" close="true">
            <DataSource />
          </ModuleContainer>
          <ModuleContainer  right="true" title="研究范围" close="true">
            <DataRange />
          </ModuleContainer>
          <ModuleContainer  right="true" title="参数选择" >
            <Parameter updateParams={this.updateParams}/>
          </ModuleContainer>
          <ModuleContainer  right="true" title="计算信息" >
            <CalcuInfo params={this.state.params} getCalResult={this.getCalResult}/>
          </ModuleContainer>
          <ModuleContainer  close="true" right="true" title="结果展示" autowidth="true">
            <Result calResult={this.state.calResult}/>
          </ModuleContainer>
        </div>
      </div>
    );
  }
}
