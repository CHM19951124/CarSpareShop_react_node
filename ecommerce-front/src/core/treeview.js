import React, { useState } from "react";
import * as ReactDOM from 'react-dom';
import { enableRipple } from '@syncfusion/ej2-base';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
enableRipple(true);


export default class TreeView extends React.Component {

    constructor() {
        super(...arguments);
        // define the JSON of data
        this.isChecked = true;
        this.state = {
            checked: []
        };
    }

    nodeChecked(arg) {
        //console.log(args);
        const data = arg.data;
        for(let i = 0 ; i < data.length ; i++){
            if(!this.props.categories[data[i].id - 1].hasChild)
            {
                const id = this.props.categories[data[i].id - 1]._id;
                const currentCategoryId = this.state.checked.indexOf(id);
                const newCheckedCategoryId = [...this.state.checked];
                // if currently checked was not already in checked state > push
                // else pull/take off
                if (currentCategoryId === -1) {
                    newCheckedCategoryId.push(id);
                } else {
                    newCheckedCategoryId.splice(currentCategoryId, 1);
                }
                this.setState({checked:newCheckedCategoryId});
                this.props.handleFilters(newCheckedCategoryId);
            }
        }
    }

    render() {
        this.categories = this.props.categories;
        this.field = {dataSource: this.categories, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild'};
        return (
            <TreeViewComponent fields={this.field} showCheckBox={this.isChecked} nodeChecked={this.nodeChecked.bind(this)}/>);
    }
}
