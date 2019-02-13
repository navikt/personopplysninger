import React, { Component } from 'react';
import PropTypes from 'prop-types';
import infoIcon from '../../assets/img/infomation-circle.png';
import InfoBox from './InfoBox';
import infoContent from '../static/infoContent';

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
              {this.props.infoType ? (
                <button className="information-circle" onClick={() => toggleInfo()}>
                  <img src={infoIcon} alt="Information" />
                </button>) : null}
              {this.state.displayInfo && this.props.infoType ?
                <InfoBox>
                  <h2>{infoContent[this.props.infoType].header}</h2>
                  <div className="info-content">
                    {infoContent[this.props.infoType].content}
                  </div>
                </InfoBox> : null}
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
  infoType: PropTypes.string,
  smallMargin: PropTypes.bool,
};

Box.defaultProps = {
  children: [],
  header: '',
  icon: '',
  infoType: '',
  smallMargin: false,
};

export default Box;
