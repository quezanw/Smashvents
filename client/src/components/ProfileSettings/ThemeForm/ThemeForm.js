import React from 'react';
import styles from './ThemeForm.module.scss';
import { reduxForm, Field } from 'redux-form';

class ThemeForm extends React.Component {
  state = { theme_color: this.props.theme_color }

  onThemeChange = e => {
    if(e.currentTarget.checked) {
      this.setState({ theme_color: e.currentTarget.value});
    }
  }

  renderThemeColor = ({ input }) => {
    return (
      <div className={styles.iconWrapper}>
        <label>
          <input
            {...input}
            type="radio" 
            value={input.value}
            checked={this.state.theme_color === input.value}
            className={styles.radioBtn}
          />
          <div className={styles.themeColorIcon} style={{backgroundColor: input.value}}></div>
        </label>
      </div>
    );
  }

  render() {
    const colors = ['#7185AD', '#AAADC7', '#D8753B', 
                    '#F19A49', '#38A089', '#6ABBAA', 
                    '#FF7480', '#FF9DA6', '#69A6C3', 
                    '#795D50', '#6E6C5D', '#2A2A2A'];
    const themeColors = colors.map(val => {
      return (
        <Field
          key={val}
          name="theme_color"
          type="radio"
          component={this.renderThemeColor}
          value={val} 
          onChange={this.onThemeChange}
        />
      );
    })
    return (
      <div className={styles.formWrapper}>
        <h1>Theme Color</h1>
        <form className={styles.form}>
          <h3>Choose a theme color for your profile icon!</h3>
          <div className={styles.themeColorWrapper}>
            {themeColors}
          </div>
          <button className={styles.saveBtn}>save</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({form: 'themeForm'})(ThemeForm);


