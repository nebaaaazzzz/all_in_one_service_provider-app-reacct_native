import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { Button } from "react-native-paper";
import { ViewPropTypes } from "deprecated-react-native-prop-types";
class IncrementDecrement extends React.Component {
  static defaultProps = {
    buttonSize: 44,
    value: 15,
    incrementDecrementBy: 1,
    incrementDisable: false,
    decrementDisable: false,
    isSwipeControl: false,
    incrementIcon: "plus",
    decrementIcon: "minus",
  };

  //set default values
  state = {
    value: 0,
  };

  constructor(props) {
    super(props);
    this.incrementTapHandler = this.incrementTapHandler.bind(this);
    this.decrementTapHandler = this.decrementTapHandler.bind(this);
  }

  componentDidMount() {
    this.setState(
      {
        value: this.props.value,
        incrementDisable: this.props.incrementDisable,
        decrementDisable: this.props.decrementDisable,
      },
      () => {
        this.checkMinMaxValue();
      }
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ value: this.props.value }, () => {
        this.checkMinMaxValue();
      });
    }

    if (prevProps.decrementDisable !== this.props.decrementDisable) {
      this.setState({ decrementDisable: this.props.decrementDisable });
    }

    if (prevProps.incrementDisable !== this.props.incrementDisable) {
      this.setState({ incrementDisable: this.props.incrementDisable });
    }
  }

  checkMinMaxValue = () => {
    let currentValue = this.state.value;
    if (!this.props.decrementDisable) {
      if (this.props.minValue != 0 && this.props.minValue >= currentValue) {
        this.setState({ decrementDisable: true });
      } else {
        this.setState({ decrementDisable: false });
      }
    }

    if (!this.props.incrementDisable) {
      if (this.props.maxValue !== 0 && this.props.maxValue <= currentValue) {
        this.setState({ incrementDisable: true });
      } else {
        this.setState({ incrementDisable: false });
      }
    }
  };

  incrementTapHandler() {
    // if (this.props.max)
    if (this.props.incrementTapHandler) {
      this.props.incrementTapHandler();
    } else {
      this.setState(
        { value: this.state.value + this.props.incrementDecrementBy },
        () => {
          this.checkMinMaxValue();
        }
      );
    }
  }

  decrementTapHandler() {
    if (this.props.decrementTapHandler) {
      this.props.decrementTapHandler();
    } else {
      this.setState(
        { value: this.state.value - this.props.incrementDecrementBy },
        () => {
          this.checkMinMaxValue();
        }
      );
    }
  }

  render() {
    return (
      <View
        style={[
          styles.style,
          this.props.buttonSize
            ? { borderRadius: this.props.buttonSize / 2 }
            : {},
          this.props.style ? this.props.style : {},
        ]}
      >
        {this.props.isSwipeControl
          ? this.incrementView()
          : this.decrementView()}
        <Text
          style={[
            this.props.valueStyle,
            { marginEnd: 8, marginStart: 8, alignSelf: "center" },
          ]}
        >
          {this.state.value}
        </Text>
        {this.props.isSwipeControl
          ? this.decrementView()
          : this.incrementView()}
      </View>
    );
  }

  decrementView = () => {
    return (
      <Button
        onPress={this.decrementTapHandler}
        disabled={this.state.decrementDisable}
        icon={this.props.decrementIcon}
        buttonStyle={[
          { alignSelf: "center" },
          styles.buttonStyle,
          this.props.buttonSize
            ? {
                width: this.props.buttonSize,
                height: this.props.buttonSize,
                borderRadius: this.props.buttonSize / 2,
              }
            : {},
          this.props.decrementStyle ? this.props.decrementStyle : {},
        ]}
      />
    );
  };

  incrementView = () => {
    return (
      <Button
        onPress={this.incrementTapHandler}
        disabled={this.state.incrementDisable}
        icon={this.props.incrementIcon}
        buttonStyle={[
          { alignSelf: "center" },
          styles.buttonStyle,
          this.props.buttonSize
            ? {
                width: this.props.buttonSize,
                height: this.props.buttonSize,
                borderRadius: this.props.buttonSize / 2,
              }
            : {},
          this.props.incrementStyle ? this.props.incrementStyle : {},
        ]}
      />
    );
  };
}

const styles = StyleSheet.create({
  style: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 50,
  },
  buttonStyle: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  valueStyle: {
    alignSelf: "center",
    marginEnd: 8,
    marginStart: 8,
  },
});

IncrementDecrement.propTypes = {
  value: PropTypes.number,
  buttonStyle: ViewPropTypes.style,
  incrementStyle: ViewPropTypes.style,
  decrementStyle: ViewPropTypes.style,
  incrementTapHandler: PropTypes.func,
  decrementTapHandler: PropTypes.func,
  style: ViewPropTypes.style,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  incrementDecrementBy: PropTypes.number,
  incrementDisable: PropTypes.bool,
  decrementDisable: PropTypes.bool,
  isSwipeControl: PropTypes.bool,
  valueStyle: ViewPropTypes.style,
  incrementIcon: PropTypes.string,
  decrementIcon: PropTypes.string,
  buttonSize: PropTypes.number,
};

export default IncrementDecrement;
