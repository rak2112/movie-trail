import React, { PureComponent } from 'react';

import loadingImg from '../../images/loader.gif';

export class ImageLoader extends PureComponent<any, any> {
  img: any;
  state = {
    error: false,
    loaded: false
  };

  componentDidMount() {
    this.img = new Image();
    this.img.onload = () => {
      this.setState({
        loaded: true
      });
    };
  
    this.img.onerror = () => {
      this.setState({
        error: true
      });
    };

    this.img.src = this.props.src;
  }

  componentWillUnmount() {
    if(!this.img) {
      return;
    }
    this.img.onload = null;
    this.img.onerror = null;
    delete this.img;
  }

  render() {
    const { error, loaded} = this.state;
    const { alt, className, clickHandler, index, src, style, unloadedSrc } = this.props;
    if(error || !loaded){
      return <img
        alt={alt}
        className={className}
        style={style}
        src={unloadedSrc || loadingImg}
      />
    }

    return <img
      alt={alt}
      className={className}
      data-index={index}
      style={style}
      src={src}
      onClick={clickHandler}/>
  }
}