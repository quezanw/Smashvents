import React from 'react'
import PlacesAutocomplete from 'react-places-autocomplete';
import styles from './LocationSearch.module.scss';   


class LocationSearch extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = { address: '' };
  }

  handleChange = address => {
    const { input } = this.props;
    const { onChange } = input;
    this.setState({ address });
    onChange(address);
    // this.setState({ address });
  };

  handleSelect = address => {
    const { input } = this.props;
    const { onChange } = input;
    this.setState({ address });
    onChange(address);
  };

  render() {
    let {input, meta} = this.props;
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <label className={styles.label}>{this.props.label}</label>
            <input
              {...getInputProps()}
              className={styles.search}
              name="venue"
              value={input.value}
            />
            {meta.error && <p className={styles.error}>{meta.error}</p>}
            {/* {touched && ((error && <p className={styles.error}>{error}</p>))} */}
              <div className={styles.dropdownContainer}>
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div {...getSuggestionItemProps(suggestion, { className, style })}>
                      <p className={styles.searchVal}>{suggestion.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      );
    }
}

export default LocationSearch;