/**
 * Created by porfirio on 10-07-2016.
 */
import React from "react";
import "./CheckBox.scss";
/**
 * CheckBox is a simple component that wraps a input[type=checkbox] and uses a custom icon to look the same in all platforms
 * @param {String} text   Optional text to show close to the box
 * @param {Boolean} checked   Checked state
 * @param {Function} onChange  Callback delegated from input
 * @param {Object} props Any other property passed to this component will be delegated to the top container <label>
 */
export default function CheckBox({onChange, text, checked, ...props}) {
    return (<label {...props} className="checkbox">
        <input type="checkbox" checked={checked} onChange={onChange}/>
        <span>{text}</span>
    </label>);
}

const {string, bool, func}=React.PropTypes;

CheckBox.propTypes = {
    text: string,
    checked: bool,
    onChange: func
};
// Task.defaultProps
