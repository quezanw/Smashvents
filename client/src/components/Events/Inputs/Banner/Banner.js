import React from 'react';
import styles from './Banner.module.scss';
import { Field } from 'redux-form';
import ImagesContainer from '../ImagesContainer/ImagesContainer';

class Banner extends React.Component {
  state = { banner: this.props.initialValues.banner_path }

  onBannerChange = e => {
    if(e.currentTarget.checked) {
      this.setState({ banner: e.currentTarget.value});
    }
  }

  renderBannerImage = ({ input }) => {
    return (
      <div className={styles.bannerImgWrapper}>
        <label>
          <input
            {...input}
            type="radio" 
            value={input.value}
            checked={this.state.banner === input.value}
            className={styles.radioImageBtn}
          />
          <img className={styles.bannerImg} src={`/assets${input.value}`} alt="banner"/>
        </label>
      </div>
    );
  }
  
  render() {
    let banners = [1,2,3];
    const bannerImages = banners.map(val => {
      return (
        <Field
          key={val}
          name="banner_path"
          type="radio"
          component={this.renderBannerImage}
          value={`/banner${val}.jpg`} 
          onChange={this.onBannerChange}
        />
      );
    });
    return (
      <ImagesContainer images={bannerImages} title='Event Banner'/>
    )
  }
}

export default Banner;