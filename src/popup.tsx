import "./less/popup.less";
import * as React from "react";
import * as ReactDOM from "react-dom";

class App extends React.Component {
  public state: {
    clickCount: number;
  };

  constructor(props: {}) {
    super(props);

    this.state = {
      clickCount: 0,
    };
  }

  render() {
    return (
      <div id="root">
        <p onClick={this.handleClick.bind(this)}>{this.state.clickCount}</p>
      </div>
    );
  }

  handleClick() {
    try {
      chrome.extension
        .getBackgroundPage()
        ?.window.console.log(this.state.clickCount);
    } catch (error) {}

    this.setState({
      clickCount: this.state.clickCount + 1,
    });
  }
}

ReactDOM.render(<App />, document.body);
