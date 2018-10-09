import React, { Component } from "react";
import { } from "./post-viewer.css";
import { AnchorButton, Button, Classes, Code, Dialog, H5, Intent, Switch, Tooltip } from "@blueprintjs/core";


export default class PostEditor extends Component {
    constructor(props) {
        super(props);

    }

    onCloseEditor = () => {
        //save changes
        if (this.props.onClose) {
            this.props.onClose();
        }
    }
    render() {
        return (<Dialog
            icon="info-sign"
            title="Palantir Foundry"
            isOpen={this.props.isOpen}
            className={Classes.DARK + " post-editor "}
            onClose={this.onCloseEditor}
        >
            <div className={Classes.DIALOG_BODY}>
                <p>
                    <strong>
                        Data integration is the seminal problem of the digital age. For over ten years, we’ve
                        helped the world’s premier organizations rise to the challenge.
                        </strong>
                </p>
                <p>
                    Palantir Foundry radically reimagines the way enterprises interact with data by amplifying
                    and extending the power of data integration. With Foundry, anyone can source, fuse, and
                    transform data into any shape they desire. Business analysts become data engineers — and
                    leaders in their organization’s data revolution.
                    </p>
                <p>
                    Foundry’s back end includes a suite of best-in-class data integration capabilities: data
                    provenance, git-style versioning semantics, granular access controls, branching,
                    transformation authoring, and more. But these powers are not limited to the back-end IT
                    shop.
                    </p>
                <p>
                    In Foundry, tables, applications, reports, presentations, and spreadsheets operate as data
                    integrations in their own right. Access controls, transformation logic, and data quality
                    flow from original data source to intermediate analysis to presentation in real time. Every
                    end product created in Foundry becomes a new data source that other users can build upon.
                    And the enterprise data foundation goes where the business drives it.
                    </p>
                <p>Start the revolution. Unleash the power of data integration with Palantir Foundry.</p>
            </div>
            <div className={Classes.DIALOG_FOOTER}>
                <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                    <Tooltip content="This button is hooked up to close the dialog.">
                        <Button onClick={this.onCloseEditor}>Close</Button>
                    </Tooltip>
                    <AnchorButton
                        intent={Intent.PRIMARY}
                        href="https://www.palantir.com/palantir-foundry/"
                        target="_blank"
                    >
                        Visit the Foundry website
                        </AnchorButton>
                </div>
            </div>
        </Dialog>);
    }
}