/**
 * Created by porfirio on 10-07-2016.
 */

import React, {Component, PropTypes} from 'react'

/**
 * Footer, component to show the footer of the app, contains info and some actions
 */
export default class Footer extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        var markAllAsDone, deleteDone, remaining, linkBar;

        if (this.props.remaining > 0) {
            markAllAsDone =
                <a href="javascript:;" onClick={this.props.onMarkAllAsDone}>Marcar todas ({this.props.remaining})
                    como completas</a>;
            remaining = <div className="info-line">Ainda falta completar {this.props.remaining} tarefa(s)!</div>
        } else if (this.props.all > 0)
            remaining = <div className="info-line">Todas as tarefas foram completadas!!</div>;
        else
            remaining = <div className="info-line">Não tem nenhuma tarefa!</div>;

        if (this.props.done > 0)
            deleteDone =
                <a href="javascript:;" onClick={this.props.onDeleteAllDone}>Apagar todas ({this.props.done}) as
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

Footer.propTypes = {
    remaining: PropTypes.number,
    done: PropTypes.number,
    all: PropTypes.number,
    onMarkAllAsDone:PropTypes.func,
    onDeleteAllDone:PropTypes.func,
};