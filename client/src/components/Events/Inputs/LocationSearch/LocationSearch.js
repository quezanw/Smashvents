import React from 'react'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
import styles from './LocationSearch.module.scss';   


class LocationSearch extends React.Component {
constructor(props) {
    super(props);
    this.state = { address: '' };
}

handleChange = address => {
    this.setState({ address });
};

handleSelect = address => {
    const { input } = this.props;
    const { onChange } = input;
    this.setState({ address });
    onChange(address);
};

render() {
    return (
    <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
    >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
            <input
            // {...this.props.input}
            name="venue"
            {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
            })}
            className={styles.search}
            />
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
                <div
                    {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                    })}
                >
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