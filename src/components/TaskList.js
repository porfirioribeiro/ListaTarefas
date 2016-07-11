/**
 * Created by porfirio on 07-07-2016.
 */
import React from 'react'


import Task from "./Task"

// import TaskModel from '../models/Task'
import TaskListCol from '../models/TaskList'

import "./TaskList.scss"

export default class TaskList extends React.Component {

    constructor(props) {
        super(props);
        this.taskList = this.props.tasks;
    }


    render() {
        var elTasks = this.taskList.filter(function (task) {
            switch (this.props.filter) {
                case "done":
                    return task.get('done');
                case "remaining":
                    return !task.get('done');
                default:
                    return true;
            }
        }, this).map((task)=> {
            return (<Task
                key={task.get("timestamp")}
                task={task}
                onDestroy={(task)=>task.destroy()}
                onToggle={(task, done)=>task.save({done: done})}
                onEdit={this.handleEdit.bind(this)}
            />)
        });
        return (<ul className="task-list">{elTasks}</ul>);
    }

    handleEdit(task, field, value) {
        if (field==Task.FIELD_TIILE)
            task.save({title: value})
        else if (field==Task.FIELD_COLOR)
            task.save({color: value})
    }
}
//Todo Probably should not pass tasks as a prop, and use a different approach...
TaskList.propTypes = {
    tasks: React.PropTypes.instanceOf(TaskListCol).isRequired
};