import React, { PureComponent } from 'react';
import styled from 'react-emotion';

import { ImageLoader } from '../components';
import { MovieDetail, Poster, Posters } from '../interfaces';

import { paths } from '../utils';

export const Container = styled('div')`
  img.poster {
    width: 550px;
    height: 400px;
    border: 4px solid #222;
    margin: 0 30px;
  }
  .thumbnails {
    padding-top: 20px;
    text-align: center;
    .movie {
      display: inline-block;
      margin: 0 5px;
      cursor: pointer;
      width: 55px;
      height: 78px;
    }
    .active {
      border: 1px solid #ff5c00;
    }
  }
`;

interface State {
  active: number;
  images: Poster[];
}

export interface Props {
  images: Posters;
};

export class Carousel extends PureComponent <Props, State>{

  static displayName = 'CarouselComponent';
  static getDerivedStateFromProps({ images: { posters } }: MovieDetail) {
    const images = posters.slice(0, 5);
    return { images };
  }

  state = {
    images: [],
    active: 1
  };

  handleClick = (event: any) => {
    this.setState({active: +event.target.dataset.index});
  }

  render() {
    const { active, images }: State = this.state;
    return (
      <Container>
        <img className="poster" src={`${paths.imgPath500}${images[active].file_path}`} alt=""/>
        <div className="thumbnails">
          {
            images.map((img: Poster, index: number) =>
              <ImageLoader 
                className={ index === active ? 'active thumbnail movie' : 'thumbnail movie'}
                alt={`movie thumbnail ${index}`}
                clickHandler={this.handleClick}
                key={img.file_path}
                index={index}
                src={`${paths.imgPath45}${img.file_path}`}
              />
            )
          }
        </div>
      </Container>
    )
  }
}