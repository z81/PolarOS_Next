import React, {PropTypes} from 'react';

class Button extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    Style:  PropTypes.string,
    size:  PropTypes.string,
    icon:  PropTypes.string,
    dropdown: PropTypes.any,
    right: PropTypes.any,
    left: PropTypes.any,
    active: PropTypes.any,
    onClick: PropTypes.func,
    style: PropTypes.object
  };
  
  constructor(props) {
    super(props);

    this.state = {
      btnStyles: {
        'default': 'btn-default',
        'primary': 'btn-primary',
        'positive': 'btn-positive',
        'negative': 'btn-negative',
        'warning': 'btn-warning'
      }
    };
  }

  render() {
    const Style = this.props.Style || 'default';
    let btnClass = `btn btn-${this.state.size} ${this.state.btnStyles[Style]}`;
    let iconClass = '';

    if (this.props.icon) {
      if (this.props.children) {
        iconClass = `icon icon-${this.props.icon} icon-text`;
      } else {
        iconClass = `icon icon-${this.props.icon}`;
      }
    }

    if (this.props.right) {
      btnClass += ' pull-right';
    }

    if (this.props.left) {
      btnClass += ' pull-left';
    }

    if (this.props.dropdown) {
      btnClass += ' btn-dropdown';
    }

    return (
      <button style={this.props.style} onClick={this.props.onClick} className={btnClass}>
        <span>
          <span className={iconClass}/>
          {this.props.children}
        </span>
      </button>
    );
  }
}

export default Button;
