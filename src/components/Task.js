/**
 * Created by porfirio on 06-07-2016.
 */

import React from 'react'
import classNames from 'classnames'
import ColorPicker from 'rc-color-picker'
import '../../node_modules/rc-color-picker/assets/index.css'

import TaskModel from '../models/Task'
import CheckBox from './CheckBox'


/**
 * Task component
 */
export default class Task extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            editColorMode: false,
            title: this.props.task.get("title"),
            color: this.props.task.get("color")
        };
    }


    edit_onKeyDown(e) {
        if (e.which == 13) {
            this.setState({editMode: false});//save
            var val = this.state.title.trim();
            if (val) {
                this.props.onEdit(this.props.task,Task.FIELD_TIILE,val);
                this.setState({title: val});
            }
        }
        else if (e.which == 27)//escape
            this.setState({editMode: false, title: this.props.task.get("title")});
    }

    saveColor(){
        this.setState({editColorMode:false});
        this.props.onEdit(this.props.task,Task.FIELD_COLOR,this.state.color);
    }

    render() {
        var el;
        var done=this.props.task.get("done");
        if (!this.state.editMode) {
            el = (<li className={classNames({"done":done,"edit-color":this.state.editColorMode})}>
                <CheckBox checked={done} onChange={(e)=>this.props.onToggle(this.props.task,e.target.checked)}/>
                <label
                    className="title"
                    style={{color:this.state.color}}
                    onDoubleClick={(e)=>this.setState({editMode: true})}>
                    {this.state.title}</label>
                <div className="actions">
                    <ColorPicker
                        color={this.state.color}
                        onChange={(e)=>this.setState({color: e.color})}
                        onOpen={()=>this.setState({editColorMode:true})}
                        onClose={()=>this.saveColor()}
                        placement="topRight"
                    >

                    </ColorPicker>
                    <button onClick={(e)=>this.props.onDestroy(this.props.task)}>x</button>
                </div>
            </li>);
        } else
            el = (
                <li className="edit">
                    <input type="text"
                           value={this.state.title}
                           autoFocus="true"
                           ref={(el)=>{if(el) el.focus()}}
                           onChange={(e)=>this.setState({title: e.target.value})}
                           onKeyDown={(e)=>this.edit_onKeyDown(e)}
                           onFocus={(e)=>e.target.setSelectionRange(0, e.target.value.length)}
                           onBlur={(e)=>this.setState({editMode: false})}/>
                </li>)

        return el;
    }
}

Task.FIELD_TIILE="title";
Task.FIELD_COLOR="color";
Task.propTypes={
    onDestroy:React.PropTypes.func,
    onToggle:React.PropTypes.func,
    onEdit:React.PropTypes.func,
    task:React.PropTypes.instanceOf(TaskModel).isRequired
};
// Task.defaultProps