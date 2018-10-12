import React, { Component } from "react";
import { } from "./modal.css";

export default class Modal extends Component {

    onClose = () => {
        if (this.props.onClose)
            this.props.onClose();
    }

    render() {
        let modalClass = this.props.open ? "modal modal-open" : "modal";

        return (
            <div className={modalClass}>
                <div className="modal-content">
                    <span className="close" onClick={this.onClose}>&times;</span>
                    <div className="modal-inner">
                        {this.props.content}
                    </div>
                </div>
            </div>
        )

    }
}