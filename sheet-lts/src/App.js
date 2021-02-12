import React from 'react';



// user defined stuff .jsx
import Panel from './components/Panel.jsx';
import { inputHandler} from './components/pHandler';
// class storing whole - every panel etc.
class Sheet extends React.Component {

  // !!! handles have to be defined on top (above their binding)
  // !!! otherwise they will be assigned value undefined by components
  // !!! inside of constructor

  handleClickPanel(e) {



    // if passed object ref doesn't match the stored one:
    if(e !== this.state.objectClicked){
      // set passed object ref beenClicked to true
      e.setState( {beenClicked: true} );


      
      
      
      // if stored object ref isn't null (it exists):   
      if(this.state.objectClicked  !== null){
        // dom ref to a currently stored object
        const domRef = document.getElementById(this.state.objectClicked.props.id);

        debugger; 
        // debugger;
        // set beenClicked and beingEditedUnComp to false 
        // grouping-safe 
        this.state.objectClicked.setState( () => ( {
          beenClicked: false,
          beingEditedUnComp: false
        } ) );
        
        

        let output;
        
        new Promise (
          (resolve,rej) => {
            output = inputHandler(this.state.objectClicked.state.uncomputed);
            this.state.objectClicked.setState( () => ( {computed:output !== '' ? 
            output : this.state.objectClicked.state.computed } ) );
            // debugger;
            return resolve('');
          
          }
        ).then(
          () => {
            debugger;
            domRef.value = output !== '' ? output :
            this.state.objectClicked.state.computed;
            // return res();
          }

        ).then(
          () => {
              // set previous object ref to passed object ref
            this.setState( () => ({objectClicked: e}) );
            // return res('');
          }
        ).catch(
          (err) => {console.log(err);}
        );
        
        

        // domRef.value = output !== '' ? output :
        //  this.state.objectClicked.state.computed;
        
        debugger;

        // change the value of object to computed
        // and change background color to white
        // domRef.value = this.state.objectClicked.state.computed;
        domRef.style.backgroundColor = 'white';
      }   
      else{
          // set previous object ref to passed object ref
        this.setState( () => ({objectClicked: e}) );
      }

    
    }
    // if passed object ref and stored object ref are the same
    else {
      // // if object has been clicked on already && 
      // // the value hasn't been reseted out:
      if(this.state.objectClicked.state.beenClicked){
        // dom ref to a currently stored object
        const domRef = document.getElementById(this.state.objectClicked.props.id);
        // change domRef.value to stored object uncomputed
        // and change color to lightgreen
        domRef.value = this.state.objectClicked.state.uncomputed;
        domRef.style.backgroundColor = 'lightgreen';
        // set state to uncomputed
        this.state.objectClicked.setState( {beingEditedUnComp: true} );

      }
    }

    

    // console.log('\n\n\n');
   
  } // !handleClickPanel(e)

  // update panel/input value on each keystroke 
  handleChange(){
    
    // console.log('clicked');

    // dom ref to current objectClicked
    const domRef = document.querySelector('#'+this.state.objectClicked.props.id );
    // debugger;

    // value is uncomputed
    if(this.state.objectClicked.state.beingEditedUnComp === true ){
      // // if the value of domRef during uncomputed state has changed:
      // if(domRef.toString() !== this.state.objectClicked.state.computed.toString())
      //   // assign domRef.value to computed value of stored object
      //   this.state.objectClicked.setState(  () =>( {computed: domRef.value }) );

      // assign domRef.value to uncompute value of stored object
      this.state.objectClicked.setState(    () =>( {uncomputed: domRef.value }) );
    }
    // value is computed 
    else if(this.state.objectClicked.state.beingEditedUnComp === false ){
      // if the value of domRef during computed state has changed:
      if(domRef.toString() !== this.state.objectClicked.state.computed.toString)
        // clear out the value of uncomputed
        this.state.objectClicked.setState( () =>( {uncomputed: '' }) );

      // assign domRef.value to computed value of stored object
      this.state.objectClicked.setState(   () =>( {computed: domRef.value }) );
      

    }

   
  }
  
  // handle keyDown event in input panels
  // used solely with Enter key
  handleKeyDown(e){

    // if key code is 'Enter'
    if(e.key === 'Enter'){

      // console.log( getSum('A1','B3') );

      // reference dom object used to extracts current value of a specified panel
      const block = document.getElementById(this.state.objectClicked.props.id);

      // block.value is set to to uncomputed state if objectClicked is in uncomputed state
      // otherwise,  sets block.value to computed state  
      block.value = this.state.objectClicked.state.beingEditedUnComp === 
      false ? this.state.objectClicked.state.uncomputed : this.state.objectClicked.state.computed;
      
      // if object is in state of computed (will switch to uncomputed)
      if(!this.state.objectClicked.state.beingEditedUnComp){
        // block.value set to uncomputed
        block.value = this.state.objectClicked.state.uncomputed;
        // change background color
        block.style.backgroundColor = 'lightgreen';
        
      }
      // if object is in state of uncomputed (will switch to computed)
      else {

        const buffer = inputHandler(this.state.objectClicked.state.uncomputed);

        // set computed to math expression result from uncomputed state
        // and then change block.value (displayed value) to computed 
        this.state.objectClicked.setState({computed: buffer !== '' ? buffer : 
        this.state.objectClicked.state.computed }, () => 
          block.value = this.state.objectClicked.state.computed);
        // change color to white   
        block.style.backgroundColor = 'white';


      }
      // on pressing Enter, switch value of beingEditedUnComp to opposite 
      this.state.objectClicked.setState({beingEditedUnComp : 
        !this.state.objectClicked.state.beingEditedUnComp} );
    }

  } 
  
  


  constructor(props) {
    super(props);

    this.handleClickPanel = this.handleClickPanel.bind(this);
    this.handleChange     = this.handleChange.bind(this);
    this.handleKeyDown    = this.handleKeyDown.bind(this);
    // this.handleLoad       = this.handleLoad.bind(this);

    // console.log(getAvg('A1','B2') );


    //#region   table set-up 
    const tb = [
      // [0] .topbar  
      [],
      // [1] .content
      [
        // [1][0] .content-sidebar
        [],
        // [1][1] .content-main
        [
          // [1][1][0] .content-main-row
          []
        ]
      ]
    ];

    const tableSize = this.props.tab;

    const width = tableSize[0];
    const height = tableSize[1];

    // generate .topbar
    tb[0].push(<div></div>);
    for (let i = 0; i < width; i++)
      // .topbar
      tb[0].push(<div key={i}>{String.fromCharCode(65 + i)}</div>);



    // generate .content-sidebar
    for (let i = 0; i < height; i++)
      tb[1][0].push(<div key={i}>{i}</div>);

      // input collection
      const inputCol = [];

    // generate .content-main
    for (let y = 0; y < height; y++) {
      const row = [];
      // generate .content-main-row
      for (let x = 0; x < width; x++)
        // id is like "A1","C5","F11" etc.
        row.push(<Panel id={`${String.fromCharCode(65 + x)}${y.toString()}`}
          defaultValue  ={y*10 + x}
          onClick       ={this.handleClickPanel} 
          onChange      ={this.handleChange} 
          onKeyDown     ={()=> this.handleKeyDown}
          // onLoad        ={this.handleLoad}
          />);

      inputCol[y] = row;
      // add new row containing specyfied panels
      tb[1][1][0][y] = (<div className="content-main-row" key={y}> {row} </div>);
    }



    // this.table != this.state.table
    this.table = (
      <div className="Table">
        <div className="topbar">
          {tb[0].map(o => o)}
        </div>
        <div className="content">
          <div className="content-sidebar">
            {tb[1][0].map(o => o)}
          </div>
          <div className="content-main">
            {tb[1][1][0].map(o => o)}
          </div>
        </div>
      </div>
    );

    //#endregion  table set-up


    // [tab[1]][tab[0]] 2d array
    this.panelArr = [];
    this.state = {
       // stores reference to clicked object
      objectClicked: null
    };
    
  }

  // // handle loading of elements 
  // handleLoad(e){   
  //   this.panelArr.push(e);
  // }
  

  // componentDidMount(){
  //   // temporary array 
  //   const tempArr = [...this.panelArr];
  //   this.panelArr = [];
  //   // divide this.panelArr into sections
  //   for(let num1=0; num1<this.props.tab[1]; num1++){
  //     // new row section
  //     this.panelArr.push([]);
  //     for(let num2=0; num2<this.props.tab[0]; num2++)
  //       // push panel into array
  //       // num1(index of row) * this.props.tab[0](row size) + num2(index of panel inside of row) 
  //       this.panelArr[num1].push(tempArr[ (num1*this.props.tab[0])+num2 ]);
  //   }    
  // }

  render() {
    return (
      <div className="Sheet">
        {this.table}
      </div>
    );
  } 
}




class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Sheet tab={[8, 12]} />
      </div>
    );
  }
}

export default App;




