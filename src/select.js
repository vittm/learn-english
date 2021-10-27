import React, { Component } from 'react';
const ChevronUp = () => (
    <svg className="select-icon" viewBox="0 0 10 8">
      <path d="M2.08578644,7.29289322 C1.69526215,7.68341751 1.69526215,8.31658249 2.08578644,8.70710678 C2.47631073,9.09763107 3.10947571,9.09763107 3.5,8.70710678 L8.20710678,4 L3.5,-0.707106781 C3.10947571,-1.09763107 2.47631073,-1.09763107 2.08578644,-0.707106781 C1.69526215,-0.316582489 1.69526215,0.316582489 2.08578644,0.707106781 L5.37867966,4 L2.08578644,7.29289322 Z" transform="translate(5.000000, 4.000000) rotate(-90.000000) translate(-5.000000, -4.000000) " />
    </svg>
  )
  
  const X = () => (
    <svg className="select-icon" viewBox="0 0 16 16">
      <path d="M2 .594l-1.406 1.406.688.719 5.281 5.281-5.281 5.281-.688.719 1.406 1.406.719-.688 5.281-5.281 5.281 5.281.719.688 1.406-1.406-.688-.719-5.281-5.281 5.281-5.281.688-.719-1.406-1.406-.719.688-5.281 5.281-5.281-5.281-.719-.688z" />
    </svg>
  )
  
  const Check = () => (
    <svg className="select-icon" viewBox="0 0 16 16">
      <path d="M13 .156l-1.406 1.438-5.594 5.594-1.594-1.594-1.406-1.438-2.844 2.844 1.438 1.406 3 3 1.406 1.438 1.406-1.438 7-7 1.438-1.406-2.844-2.844z" transform="translate(0 1)" />
    </svg>
  )
  const ChevronDown = () => (
    <svg className="select-icon" viewBox="0 0 10 7">
      <path d="M2.08578644,6.5 C1.69526215,6.89052429 1.69526215,7.52368927 2.08578644,7.91421356 C2.47631073,8.30473785 3.10947571,8.30473785 3.5,7.91421356 L8.20710678,3.20710678 L3.5,-1.5 C3.10947571,-1.89052429 2.47631073,-1.89052429 2.08578644,-1.5 C1.69526215,-1.10947571 1.69526215,-0.476310729 2.08578644,-0.0857864376 L5.37867966,3.20710678 L2.08578644,6.5 Z" transform="translate(5.000000, 3.207107) rotate(90.000000) translate(-5.000000, -3.207107) " />
    </svg>
  )
class Select extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      values: (this.props.selected && this.props.selected !== null ? this.props.selected : []),
      focusedValue: -1,
      isFocused: false,
      isOpen: false,
      typed: '',
      option: this.props.options,
      options: null,
      search: false,
      blur: false,
    }

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onDeleteOption = this.onDeleteOption.bind(this)
    this.onHoverOption = this.onHoverOption.bind(this)
    this.onClickOption = this.onClickOption.bind(this)
    this._onSearch = this._onSearch.bind(this)
    this.renderOption = this.renderOption.bind(this)
    this.onBlurInput = this.onBlurInput.bind(this)
  }
  
  componentDidUpdate(nextProps) {
		if (this.props.selected !== nextProps.selected) {
      this.setState({
        values: (this.props.selected && this.props.selected !== null ? this.props.selected : [])
      })
    }
    if (this.props.options !== nextProps.options) {
      this.setState({
        option: this.props.options,
        cacheData: this.props.options
      })
    }
	}
  onFocus() {
    this.setState({
      isFocused: true
    })
  }
  onBlurInput(){
    this.setState({
      blur: false
    })
  }
  onBlur() {
    if (this.state.blur) return false;
    const { options, multiple } = this.props
    
    this.setState(prevState => {
      const { values } = prevState
      
      if (multiple) {
        return {
          focusedValue: -1,
          isFocused: false,
          isOpen: false
        }
      } else {
        const value = values[0]
        
        let focusedValue = -1 
        
        if (value) {
          focusedValue = options.findIndex(option => option.value === value)
        }
        return {
          focusedValue,
          isFocused: false,
          isOpen: false
        }
      }
    })
  }

  onClick() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }))
  }
  
  onDeleteOption(e) {
    const { value } = e.currentTarget.dataset
    const {multiple} = this.props;
    if(!multiple){
      this.setState({
        values: []
      });
      this.props.onChange(null,this.props.dataSlug);
    }else{
      this.setState(prevState => {
        const [ ...values ] = prevState.values
        const index = values.indexOf(value)
        
        values.splice(index, 1);
        this.props.onChange(values,this.props.dataSlug);
        return { values }
      });
    }
  }
  
  onHoverOption(e) {
    const { options } = this.props
    
    const { value } = e.currentTarget.dataset
    const index = options.findIndex(option => option.value === value)

    this.setState({
      focusedValue: index
    })
  }
  
  onClickOption(e) {
    const { multiple } = this.props;
    const {slug,value,compact} = this.props;

    const data = {
      [value] : e.currentTarget.textContent,
      [slug] : e.currentTarget.attributes['data-value'].textContent,
      [compact]: compact ?  e.currentTarget.attributes['data-compact'].textContent : ""
    };
    
    this.setState(prevState => {
      if (!multiple) {
        this.props.onChange(data[slug],this.props.dataSlug);
        return {
          slug: [ data[slug] ],
          values: data[slug],
          isOpen: false
        }
      }
      const [ ...values ] = Array.isArray(prevState.values) ? prevState.values : [];
      let index = -1, selected = false;
      if(values.length > 0){
        for (let i = 0; i < values.length; i++) {
          const element = values[i];
          selected = element.includes(data[slug]);
          if(selected){
            index = i;
            break;
          }
        }
      }
      if (index === -1) {
        values.push(data[slug]);
      } else {
        if(values.length > 0){
          values.splice(index,1);
        }         
      }

      this.props.onChange(values,this.props.dataSlug);
      return { values }
    });
  }
  
  stopPropagation(e) {
   if(e){
    e.stopPropagation();
   }
  }
  
  renderValues() {
    const { placeholder, multiple } = this.props;
    const { values, option } = this.state;
    let {slug,value,compact} = this.props;
    let data = [];
    if (!values || values.length === 0) {
      return (
        <div className="placeholder">
          { placeholder }
        </div>
      )
    }
    if (!multiple) {
      let res = values;
      if(res && option && option.length > 0){
        option.forEach(res => {
          if(values == res[slug]){
            data.push(
              <span
                key={ res[value] }
                onClick={ this.stopPropagation }
                className="multiple value"
                data-value = {res[slug]}
                data-compact = {res[compact]}
                style={{'background': (this.props.color ? res[value] : "#d9f2fb"),'color': (this.props.color ? "#000000" : "#00a9e0") }}
              >
                { res[value] }
                <span
                  data-value={ res[slug] }
                  data-compact = {res[compact]}
                  onClick={ this.onDeleteOption }
                  className="delete"
                >
                  <X />
                </span>
              </span>
            )
          }
        });
      }
    }
    if(option && values && Array.isArray(values) && multiple && (Object.keys(option).length !== 0 || option && option.length !== 0)) {
      values.forEach((element) => {
        if((Object.keys(option).length !== 0 || option && option.length !== 0 || option.forEach)){
          option.forEach(res => {
            if(element == res[slug]){
              data.push(
                <span
                  key={ res[value]  }
                  onClick={ this.stopPropagation }
                  className="multiple value"
                  data-value = {res[slug]}
                  style={{'background': (this.props.color ? res[value] : "#d9f2fb"),'color': (this.props.color ? "#000000" : "#00a9e0") }}
                >
                  { res[value] }
                  <span
                    data-value={ res[slug] }
                    onClick={ this.onDeleteOption }
                    className="delete"
                  >
                    <X />
                  </span>
                </span>
              )
            }
        });
        }
      });
    }
    return data; 
  }
  
  renderOptions() {
    let  options  = this.props.options;
    const { isOpen } = this.state;
    if(this.state.search){
      options = this.state.options;
    }
    if (!isOpen) {
      return null
    }
    if ( options == undefined || Object.keys(options).length === 0 || !options || options.length === 0) {
      return null;
    }
    return (
      <div className="options">
        { options.map(this.renderOption) }
      </div>
    )
  }
  
  renderOption(option, index) {  // 1
    const { multiple } = this.props
    const { values, focusedValue } = this.state;
    const { value, slug, compact  } = this.props;

    let selected = false;
    if(values && values.length > 0){
      
        if(multiple){
          for (let i = 0; i < values.length; i++) {
            const element = values[i];
            selected = element.includes(option[slug]);
            if(selected){
              break;
            }
          }
        }else{
          if(values.length > 0){
            for (const key in values) {
              selected = key.includes(option[slug]);
              if(selected){
                break;
              }
            }
          }
        }
      
    }
    let className = "option"
    if (selected) className += " selected"
    if (index === focusedValue) className += " focused"
    
    return (
      <div
        key={ option[slug] }
        data-value={ option[slug] }
        data-compact = {compact ?option[compact] : ""}
        className={ className 
        }
        onClick={ this.onClickOption }
        style={{'background': (this.props.color ? option[value] : "#d9f2fb") }}
        >
        { multiple ?
          <span className="checkbox">
            { selected ? <Check /> : null }
          </span> :
          null
        }
        { option[value] }
      </div>
    )
  }
  _onSearch(event){
    if(event){
      let value = event.target.value;
      if(!value || value == ""){
        this.setState({
            options: this.state.cacheData,
            option: this.state.cacheData
        });
      }
      let data = this.props.funcSearch(event);
      if(data){
        data.then(res=>{
          if(res){
            this.setState({
              options: res,
              option: res,
              search: true,
              isOpen: true,
              blur: true
            });
          }
        });
      }
    }
  }
  render() {
    const { label } = this.props
    const { isOpen } = this.state
    
    return (
      <div
        className={"select " + this.props.className}
        tabIndex="0"
        onFocus={ this.onFocus }
        onBlur={ this.onBlur } 
      >
        <label className="label">{ label }</label>
        
        <div className="selection" onClick={ this.onClick }>
          { this.renderValues() }
          <span className="arrow">
            { isOpen ? <ChevronUp /> : <ChevronDown /> }
          </span>
        </div>
        { this.renderOptions() }
      </div>
    )
  }
}
Select.defaultProps = {
  multiple : false
};
export default Select