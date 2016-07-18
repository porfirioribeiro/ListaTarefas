/**
 * Created by porfirio on 10-07-2016.
 */
"use strict";
import React from "react";

/**
 * Footer, component to show the footer of the app, contains info and some actions
 * Todo split this into other components
 * @param {Number} remaining
 * @param {Number} done
 * @param {Number} all
 * @param {Function} onMarkAllAsDone
 * @param {Function} onDeleteAllDone
 * @returns {XML}
 * @constructor
 */
export default function Footer({remaining, done, all, onMarkAllAsDone, onDeleteAllDone}) {
    let markAllAsDone, deleteDone, remainingDiv, linkBar;

    if (remaining > 0) {
        markAllAsDone = <a href="javascript:;" onClick={onMarkAllAsDone}>Marcar todas ({remaining}) como completas</a>;
        remainingDiv = <div className="info-line">Ainda falta completar {remaining} tarefa(s)!</div>
    } else if (all > 0)
        remainingDiv = <div className="info-line">Todas as tarefas foram completadas!!</div>;
    else
        remainingDiv = <div className="info-line">Não tem nenhuma tarefa!</div>;

    if (done > 0)
        deleteDone = <a href="javascript:;" onClick={onDeleteAllDone}>Apagar todas ({done}) as completas</a>;

    if (!!markAllAsDone || !!deleteDone)
        linkBar = (<div className="link-bar">
            {markAllAsDone}
            {deleteDone}
        </div>);


    return (<footer>
        {linkBar}
        {remainingDiv}
    </footer>)
}

const {number, func}=React.PropTypes;

Footer.propTypes = {
    remaining: number,
    done: number,
    all: number,
    onMarkAllAsDone: func,
    onDeleteAllDone: func,
};