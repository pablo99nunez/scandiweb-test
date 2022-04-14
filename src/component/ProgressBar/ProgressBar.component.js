import { PureComponent, createRef } from "react";
import PropTypes from "prop-types";
import CSS from "Util/CSS";
import done from "./Icons/done.svg";
import "./ProgressBar.style";

export class ProgressBar extends PureComponent {
  static propTypes = {
    steps: PropTypes.arrayOf(PropTypes.string).isRequired,
    currentStep: PropTypes.number,
    itemsSize: PropTypes.number,
  };
  static defaultProps = {
    steps: [],
    currentStep: 0,
    height: "15vh",
    itemsSize: 1.5,
  };

  progressBarRef = createRef();

  componentDidMount() {
    if (this.props.steps.length === 0) {
      console.warn(
        "You should provide an array of steps to the ProgressBar component"
      );
    }
    CSS.setVariable(
      this.progressBarRef,
      "progress-bar-items-size",
      this.props.itemsSize + "rem"
    );
  }

  renderSteps() {
    const { steps, currentStep } = this.props;
    if (steps.length === 0) {
      return null;
    }
    return steps.map((step, index) => {
      const isActive = index === this.props.currentStep;
      return (
        <div
          key={index}
          className={`${isActive ? "active" : ""} ${
            currentStep > index ? "done" : ""
          }`}
          block="ProgressBar"
          elem="Step"
          style={{ "--progressbar-step": index }}
        >
          <span block="Step" elem="Number">
            {currentStep > index ? (
              <img src={done} alt="Done" block="Step" elem="Done" />
            ) : (
              index + 1
            )}
          </span>
          <p block="Step" elem="Text">
            {step}
          </p>
        </div>
      );
    });
  }

  renderLine() {
    //This render a line from start to finish that fills the empty space when the steps aren't active. So when they are, the line seems to fill.
    //It is a fake step to get the line to be the on the same height as the rest of the steps and avoid magic numbers.
    return (
      <div block="ProgressBar" elem="Step">
        <span block="Step" elem="Number">
          0
        </span>
        <p block="Step" elem="Text">
          Line
        </p>
      </div>
    );
  }

  render() {
    return (
      <div block="ProgressBar" ref={this.progressBarRef}>
        <div block="ProgressBar" elem="Steps">
          {this.renderLine()}
          {this.renderSteps()}
        </div>
      </div>
    );
  }
}

export default ProgressBar;
