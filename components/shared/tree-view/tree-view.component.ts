import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';

@Component({
    selector: 'app-tree-view',
    templateUrl: './tree-view.component.html',
    styleUrls: ['./tree-view.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class TreeViewComponent implements OnInit {

    config: any;
    items: TreeviewItem[];

    constructor() { }

    ngOnInit() {
        this.config = TreeviewConfig.create({
            hasAllCheckBox: false,
            hasFilter: true,
            hasCollapseExpand: true,
            decoupleChildFromParent: true,
            maxHeight: 400
        });

        const item = new TreeviewItem({
            text: 'IT', value: 9, children: [
                {
                    text: 'Programming', value: 91, children: [{
                        text: 'Frontend', value: 911, children: [
                            { text: 'Angular 1', value: 9111 },
                            { text: 'Angular 2', value: 9112 },
                            { text: 'ReactJS', value: 9113 }
                        ]
                    }, {
                        text: 'Backend', value: 912, children: [
                            { text: 'C#', value: 9121 },
                            { text: 'Java', value: 9122 },
                            { text: 'Python', value: 9123, checked: false }
                        ]
                    }]
                },
                {
                    text: 'Networking', value: 92, children: [
                        { text: 'Internet', value: 921 },
                        { text: 'Security', value: 922 }
                    ]
                }
            ]
        });

        this.items = [item];
    }

    onSelectedChange(e) {
        console.log(e);
    }

}
