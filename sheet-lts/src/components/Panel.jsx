import React from 'react';



class Panel extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      // uncomputed (raw) value
      uncomputed: this.props.defaultValue,
      // computed (visible on start) value
      computed  : this.props.defaultValue,
      // determine if text contained by panel is being edited  
      beingEditedUnComp: false,
      // number of times object has been clicked
      beenClicked: false
    };
    
  }


  
  

  render(){
    return ( <input type="text"  
      key={ this.props.id } id={this.props.id} defaultValue = {this.props.defaultValue}
      onClick   ={()=> this.props.onClick(this) } 
      onChange  ={()=> this.props.onChange()    }
      onKeyDown ={ this.props.onKeyDown(this)   }
      // onLoad    ={ this.props.onLoad(this)} 
    />);
  }
}


export default Panel;