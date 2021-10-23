import './App.css';
import React from 'react';

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      picture: [],
      onePicture: null,
      endPicture: null,
      startIndex: null,
      endIndex: null
    }
    this.inputFileRef = React.createRef();
    this.onBtnClick = this.handleBtnClick.bind(this)
  }

  handleBtnClick() {
    this.inputFileRef.current.click();
  }

  fileSelectedHandler = event => {
    let img = event.target.files;
    let images;
    let imagesAll = [];
    Array.from(img).forEach(item => {
      images = URL.createObjectURL(item);
      imagesAll.push(images);
    }
    )
    this.setState({ picture: [...imagesAll, ...this.state.picture] });
  }

  dragstartHandler = (e, index) => {
    this.setState({ onePicture: e.target.src });
    this.setState({ startIndex: index });
  }

  dragoverHandler = (e, index) => {
    e.preventDefault();
    e.target.style.boxShadow = "0 4px 3px 0";
    this.setState({ endPicture: e.target.src })
    this.setState({ endIndex: index });
  }

  dragleaveHandler = e => {
    e.preventDefault();
    e.target.style.boxShadow = "none";
  }

  dropHandler = (e, index) => {
    e.preventDefault();
    this.setState({ endPicture: e.target.src });
    e.target.style.boxShadow = "none";
    this.setState({
      picture: this.state.picture.reduce((acum, item, i) => {
        if (i === this.state.startIndex) { item = this.state.endPicture };
        if (i === this.state.endIndex) { item = this.state.onePicture };
        acum.push(item);
        console.log(acum);
        return acum
      }, [])
    })
  }

  areadragstartHandler = (e) => {
    e.preventDefault()
  }

  areadragoverHandler = (e) => {
    e.preventDefault()
    e.target.style.backgroundColor = "lightgreen";
  }

  areadragleaveHandler = (e) => {
    e.preventDefault()
    e.target.style.backgroundColor = "white";
  }

  areadropHandler = (e) => {
    e.preventDefault()
    let img = e.dataTransfer.files;
    console.log(img);
    let images;
    let imagesAll = [];
    Array.from(img).forEach(item => {
      images = URL.createObjectURL(item);
      imagesAll.push(images);
    }
    )
    console.log(imagesAll);
    this.setState({ picture: [...imagesAll, ...this.state.picture] });
    e.target.style.backgroundColor = "white";
  }

  render() {
    return (
      <div className="app" >
        <div className="draganddrop"
          onDragStart={(e) => this.areadragstartHandler(e)}
          onDragOver={(e) => this.areadragoverHandler(e)}
          onDragLeave={(e) => this.areadragleaveHandler(e)}
          onDrop={(e) => this.areadropHandler(e)}
        >Переместите файл, чтобы его открыть</div>
        <input ref={this.inputFileRef} type="file" className="inputFile" onChange={this.fileSelectedHandler} multiple accept="image/gif, image/jpeg" />
        <button onClick={this.onBtnClick}>Добавить изображение</button>
        <div className="container">
          {this.state.picture.map((item, index) =>
            <div className="dnd" key={item}
            >
              <img src={item} alt="" key={item + index}
                draggable={true}
                onDragStart={(e) => this.dragstartHandler(e, index)}
                onDragOver={(e) => this.dragoverHandler(e, index)}
                onDragLeave={(e) => this.dragleaveHandler(e, index)}
                onDrop={(e) => this.dropHandler(e, index)}
              />
            </div>
          )}
        </div>
      </div >
    );
  }
}

export default App;
