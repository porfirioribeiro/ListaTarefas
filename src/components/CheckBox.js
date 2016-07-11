/**
 * Created by porfirio on 10-07-2016.
 */
import React from 'react'


import "./CheckBox.scss"
/**
 * CheckBox is a simple component that wraps a input[type=checkbox] and uses a custom icon to look the same in all platforms
 * @param {String} text   Optional text to show close to the box
 * @param {Boolean} checked   Checked state
 * @param {Function} onChange  Callback delegated from input
 */
export default class CheckBox extends React.Component{

    constructor(props) {
        super(props);

    }
    componentDidMount(){
    }
    componentWillUnmount(){
    }
    render(){
        var {onChange, text, checked, ...otherProps}=this.props;
        return (<label {...otherProps} className="checkbox">
            <input type="checkbox" checked={checked} onChange={onChange}/>
            <span>{text}</span>
        </label>);
    }
}

CheckBox.propTypes={
    text:React.PropTypes.string,
    checked:React.PropTypes.bool,
    onChange:React.PropTypes.func
};
// Task.defaultProps