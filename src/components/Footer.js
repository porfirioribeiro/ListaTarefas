/**
 * Created by porfirio on 10-07-2016.
 */

import React from 'react'


import TaskListCol from '../models/TaskList'
/**
 * Footer, component to show the footer of the app, contains info and some actions
 */
export default class Footer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        var markAllAsDone, deleteDone, remaining, linkBar;
        var countRemaining = this.props.tasks.remaining().length;
        var countDone = this.props.tasks.done().length;
        var countAll = this.props.tasks.length;


        if (countRemaining > 0) {
            markAllAsDone =
                <a href="javascript:;" onClick={(e)=>this.props.tasks.markAllAsDone()}>Marcar todas ({countRemaining})
                    como completas</a>;
            remaining = <div className="info-line">Ainda falta completar {countRemaining} tarefa(s)!</div>
        } else if (countAll > 0)
            remaining = <div className="info-line">Todas as tarefas foram completadas!!</div>
        else
            remaining = <div className="info-line">Não tem nenhuma tarefa!</div>

        if (countDone > 0)
            deleteDone =
                <a href="javascript:;" onClick={(e)=>this.props.tasks.deleteAllDone()}>Apagar todas ({countDone}) as
                    completas</a>;

        if (!!markAllAsDone || !!deleteDone)
            linkBar = (<div className="link-bar">
                {markAllAsDone}
                {deleteDone}
            </div>);


        return (<footer>
            {linkBar}
            {remaining}
        </footer>)
    }
}
//Todo Probably should not pass tasks as a prop, and use a different approach...
Footer.propTypes = {
    tasks: React.PropTypes.instanceOf(TaskListCol).isRequired
};