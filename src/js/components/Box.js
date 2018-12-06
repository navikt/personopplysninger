import React, { Component } from 'react';
import PropTypes from 'prop-types';
import infoIcon from '../../assets/img/infomation-circle.png';
import InfoBox from './InfoBox';

class Box extends Component {
  constructor(props) {
    super(props);
    this.state = { displayInfo: false };
  }

  render() {
    const marginClass = this.props.smallMargin ? 'box-bottom-margin-small' : 'box-bottom-margin';

    const toggleInfo = () => {
      this.setState({
        displayInfo: !this.state.displayInfo,
      });
    };

    return (
      <div className={`BoxContainer ${marginClass}`}>
        <div className="BoxWithHeader">
          {this.props.header ? <h1>{this.props.header}</h1> : null}
          <div className="icon-box-wrapper">
            {this.props.icon ? <img src={this.props.icon} alt="" className="box-icon" /> : <div className="box-icon" />}
            <div className="Box">
              <button className="information-circle" onClick={() => toggleInfo()}>
                <img src={infoIcon} alt="Information" />
              </button>
              {this.state.displayInfo ? <InfoBox /> : null}
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Box.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  header: PropTypes.string,
  icon: PropTypes.string,
  smallMargin: PropTypes.bool,
};

Box.defaultProps = {
  children: [],
  header: '',
  icon: '',
  smallMargin: false,
};

export default Box;
