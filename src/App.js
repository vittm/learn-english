import React,{ useState, useRef, useEffect} from 'react';
import Select  from './select';
import Data from './data';
import ReactGA, { set } from 'react-ga';

const Header = () =>{
  
  const shuffle = (a) => {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
  }
  const refInput = useRef();
  const [list, setList] = useState();
  const [cacheList, setCacheList] = useState();
  const [n, setN] = useState(0);
  const [text, setText] = useState();
  const [unit, setUnit] = useState();
  const [type, setType] = useState();
  const [open, setOpen] = useState();
  const [didMound, setDidMound] = useState();
  const [congratulation, setCongratulation] = useState(false);
  
  const DISABLED =[
    {'id':1,'slug': 'cum', 'value': 'Verb phrase '},{'id':2,'slug': 'tu-vung', 'value': 'Vocabulary'}
  ];
  const setLearned = (value) => {
    localStorage.setItem("learn-count",value);
  }
  const getLearned = () => {
      if(localStorage.getItem("learn-count")){
        return localStorage.getItem("learn-count");
      }
    return false;
  }
  const removeLearned = () => {
    localStorage.removeItem("learn-count");
  }
  const setLearnEng = (value) => {
    localStorage.setItem("learn-en",value);
  }
  const getLearnEng = () => {
      if(localStorage.getItem("learn-en")){
        return localStorage.getItem("learn-en");
      }
    return false;
  }
  const removeLearnEng = () => {
    localStorage.removeItem("learn-en");
  }

  const reset = () =>{
    if(getLearnEng() && JSON.parse(getLearnEng()).length > 0){
      removeLearnEng();
      let newData = shuffle(Data._getData());
      setType("");
      setUnit("");
      setList(newData);
      setCacheList(newData);
      setLearnEng(JSON.stringify(newData));
      setCongratulation(false);
      removeLearned();
    }
  }
  useEffect(() => {
    ReactGA.initialize('UA-73457686-2');
    ReactGA.pageview(window.location.pathname + window.location.search);
    let sort = shuffle(Data._getData()); 
    if(getLearnEng()){
      sort = JSON.parse(getLearnEng());
    }else{
      setLearnEng(JSON.stringify(sort));
    }
    setDidMound(true);
    setList(sort);
    setCacheList(sort);
  },[]);

  useEffect(() => {
    _new(n);
  }, [list]);

  const _new = (value) =>{
    if(list && list[value] && list[value].learn){
      value += 1;
      _new(value);
    }else{
      setN(value);
    }
  };

  const updateLearn = (n) =>{
    for (let i = 0; i < cacheList.length; i++) {
      const element = cacheList[i];
      if(element.en == list[n].en){
        element.learn = true;
        break;
      }
    }
    setLearnEng(JSON.stringify(cacheList));
  }

  const _nextVocabulary = (e) => {
    if(e){
      setOpen(false);
      if(list && list.length > 0){
        if((n)+1 === list.length){
          setN(0);
          setText("");
          setCongratulation(true);
        }else{
          if(list[n+1] && list[n+1].learn){
            _new(n);
            setText("");
          }else{
            setN((n)+1);
            setText("");
          }
        }
      }
      if(refInput && refInput.current){
        refInput.current.focus();
      }
    }
  }
  const _changeText = (e) =>{
    if(e){
      let target = e.target;
      let value = target.value;
      setText(value);
      if(value == list[n].en){
        _talk();
        if(!type || !unit){
          if(!open){
            let count = parseInt(getLearned());
            if(count){
              count += 1;
              setLearned(count);
            }else{
              setLearned(1);
            }
            updateLearn(n);
          }
        }
        setOpen(false);
      }
    }
  }
  const _keyPress = (e) => {
    if(e.charCode === 13 && text == list[n].en && !open){
      _nextVocabulary("hi");
    }
  }
  const _clickNext = (e) => {
    _nextVocabulary(e);
  }
  const _onChangeType = (value,name) =>{
    setType(value);
  }
  const _onChangeUnit = (e) =>{
    if(e){
      let target = e.target;
      let value = target.value;
      setUnit(parseInt(value)); 
    }
  }
  const _onFilter = (e) =>{
    let newList = [];
    cacheList.forEach(element => {
      if(element.unit == unit){
        if(element.type == type){
          newList.push(element);
        }else{
          if(element.type !== 'cum' && type == 'tu-vung'){
            newList.push(element);
          }
        }
      }
    });
    setList(newList);
    setN(0);
    setText("");
  }
  
  const _talk = () =>{
    if ( 'speechSynthesis' in window ) {
      speechSynthesis.cancel(); // removes anything 'stuck'
      speechSynthesis.getVoices();
    }
    const utter = new SpeechSynthesisUtterance();
    utter.text = list[n].en;
    speechSynthesis.speak(utter);
  }
  const _anwser = () =>{
    _talk();
    setOpen(true);
  }
  const _clear = () => {
    setList(cacheList);
    setType("");
    setUnit("");
    setCongratulation(false);
  }
  return(
    <div className="learn-english">
      <div className="header">
      <img className="avatar" height="140px" alt="avatar" src="https://i.pinimg.com/236x/97/d4/67/97d467223a7d7308b8e5e581ee42ab73.jpg" />
        <p className="title">1500 Vocabulary : 50 unit </p>
      </div>
      {
        list && list.length > 0 ? 
        !congratulation ? 
        <div className="flash-card">
          <span className="learned">{!type || !unit ? 'learned: ' + (getLearned() ? getLearned() : 0) + '/' + cacheList?.length : "" } </span>
          <div className="group">
            <p> Unit {list[n].unit} </p>
            <div className="flx"><span id="vi">{list[n].vi}</span><span className="type">(<i className="type__text">{list[n].type}</i>)</span></div>
          </div>
          <div className="flx input-vocabulary">
            <input ref={refInput} placeholder="Từ" className="wl-input" value={text} onKeyPress={(e) => _keyPress(e)} onChange={(e) => _changeText(e)} type="text"/>
            <img className="avatar avatar-question" onClick={(e) => _anwser(e)} height="35px" alt="avatar" src="https://cdn-icons-png.flaticon.com/512/3468/3468145.png" />
          </div>
          <div style={{display: (text == list[n].en || open ? " block" : "none")}} >
          {open ? <p id="en">{list[n].en}</p> : "" }
          <p id="ipa">{list[n].ipa}</p>
          <p id="ex">{list[n]?.ex}</p>
          {n == 0 ? <p className="guide"> bấm <strong><i>enter</i></strong> để tiếp tục từ mới </p> : "" }
            <div className="group">
              <div onClick={(e) => _talk (e)}> <img className="voulume" alt="volume" src="https://cdn-icons-png.flaticon.com/128/608/608417.png" /> </div>
              {!open ?<button className="wl-btn wl-btn-primary"  onClick={(e) => _clickNext(e)}>next</button> : "" }
            </div>
          </div>
        </div>
        :
        <div className="congratulation">
          <img className="congratulation__images" alt="congratulation" src="https://cdn-icons-png.flaticon.com/128/3004/3004551.png" />
          <p>Congratulations on your success</p>
        </div>
        :
        <div className="congratulation">
          <img className="congratulation__images" alt="congratulation" src="https://cdn-icons-png.flaticon.com/512/2338/2338310.png" />
          <p>Không có kết quả</p>
        </div>
      }
      <img className="avatar avatar-search" height="80px" alt="avatar" src="https://i.pinimg.com/236x/32/24/07/322407e32e3bd65ee1ffe0e746fea8a8.jpg" />
      <div className="search">
        <input onChange={(e) => _onChangeUnit (e)} value={unit} placeholder="Unit ?" className="wl-input" type="text"/>
        <Select
            placeholder="--- Options ---"
            onChange= {(e) => _onChangeType (e)}
            options={DISABLED}
            selected={type}
            dataSlug='child_menu'
            slug="slug"
            value="value"
            color
          />
          <div className="flx">
            <button className="wl-btn wl-btn-primary btn-filter" onClick={(e) => _onFilter(e)}> Filter </button>
            <button className="wl-btn wl-btn-dangerous btn-filter" onClick={(e) => _clear(e)}> Clear </button>
          </div>
      </div>
      <div className="header">
        <span className="reset-text">Cài đặt lại tất cả </span>
        <img className="avatar avatar-search reset" onClick={(e) => reset(e)} height="40px" alt="avatar" src="https://cdn-icons-png.flaticon.com/128/5277/5277847.png" />
        <p>Note *</p>
        <span>Phần learned không được tính nếu chọn học từng unit một hoặc nhấn gợi ý từ.</span>
        <p> Mình chỉ dev vui để có cái ôn lại từ vựng đã học. </p>
      </div>
    </div>
  )
}

export default Header;