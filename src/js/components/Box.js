import React, { Component } from "react";
import PropTypes from "prop-types";
import infoIcon from "../../assets/img/infomation-circle.png";
import InfoBox from "./InfoBox";
import infoContent from "../static/infoContent";

class Box extends Component {
  constructor(props) {
    super(props);
    this.state = { displayInfo: false };
  }

  render() {
    const { header, icon, infoType, children, smallMargin } = this.props;
    const { displayInfo } = this.state;

    const marginClass = smallMargin
      ? "box-bottom-margin-small"
      : "box-bottom-margin";

    const toggleInfo = () => {
      this.setState({
        displayInfo: !displayInfo
      });
    };

    return (
      <div className={`BoxContainer ${marginClass}`}>
        <div className="BoxWithHeader">
          {header ? <h1>{header}</h1> : null}
          <div className="icon-box-wrapper">
            {icon ? (
              <img src={icon} alt="" className="box-icon" />
            ) : (
              <div className="box-icon" />
            )}
            <div className="Box">
              {infoType ? (
                <button
                  type="button"
                  className="information-circle"
                  onClick={() => toggleInfo()}
                >
                  <img src={infoIcon} alt="Information" />
                </button>
              ) : null}
              {displayInfo && infoType ? (
                <InfoBox>
                  <h2>{infoContent[infoType].header}</h2>
                  <div className="info-content">
                    {infoContent[infoType].content}
                  </div>
                </InfoBox>
              ) : null}
              {children}
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
    PropTypes.node
  ]),
  header: PropTypes.string,
  icon: PropTypes.string,
  infoType: PropTypes.string,
  smallMargin: PropTypes.bool
};

Box.defaultProps = {
  children: [],
  header: "",
  icon: "",
  infoType: "",
  smallMargin: false
};

export default Box;
