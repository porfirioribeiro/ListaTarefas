/**
 * Created by porfirio on 06-07-2016.
 */
"use strict";
import React from "react";
import classNames from "classnames";
import ColorPicker from "rc-color-picker";
import "../../node_modules/rc-color-picker/assets/index.css";
import CheckBox from "./CheckBox";
import {taskShape} from "../utils/PropTypes";


/**
 * Task component
 */
export default class Task extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            editColorMode: false,
            title: this.props.task.title,
            color: this.props.task.color
        };
    }


    edit_onKeyDown(e) {
        if (e.which == 13) {
            this.setState({editMode: false});//save
            var val = this.state.title.trim();
            if (val) {
                this.props.onEditTitle(val);
                this.setState({title: val});
            }
        }
        else if (e.which == 27)//escape
            this.setState({editMode: false, title: this.props.task.title});
    }

    saveColor() {
        this.setState({editColorMode: false});
        this.props.onEditColor(this.state.color);
    }

    render() {
        var el;
        if (!this.state.editMode) {
            el = (<li className={classNames({"done": this.props.task.done, "edit-color": this.state.editColorMode})}>
                <CheckBox checked={this.props.task.done} onChange={(e)=>this.props.onToggle(e.target.checked)}/>
                <label
                    className="title"
                    style={{color: this.state.color}}
                    onDoubleClick={(e)=>this.setState({editMode: true})}>
                    {this.state.title}</label>
                <div className="actions">
                    <ColorPicker
                        color={this.state.color}
                        onChange={(e)=>this.setState({color: e.color})}
                        onOpen={()=>this.setState({editColorMode: true})}
                        onClose={()=>this.saveColor()}
                        placement="topRight"
                    >

                    </ColorPicker>
                    <button onClick={(e)=>this.props.onDestroy()}>x</button>
                </div>
            </li>);
        } else
            el = (
                <li className="edit">
                    <input type="text"
                           value={this.state.title}
                           autoFocus="true"
                           ref={(el)=> {
                               if (el) el.focus()
                           }}
                           onChange={(e)=>this.setState({title: e.target.value})}
                           onKeyDown={(e)=>this.edit_onKeyDown(e)}
                           onFocus={(e)=>e.target.setSelectionRange(0, e.target.value.length)}
                           onBlur={(e)=>this.setState({editMode: false})}/>
                </li>);

        return el;
    }
}
const {func}=React.PropTypes;

Task.propTypes = {
    onDestroy: func,
    onToggle: func,
    onEditTitle: func,
    onEditColor: func,
    task: taskShape.isRequired
};
// Task.defaultProps