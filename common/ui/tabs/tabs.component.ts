import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { EventEmitter, OnInit, Injectable, ViewChild, ElementRef, AfterViewInit, Output, Input } from '@angular/core';
import { Tab } from '../tab/tab.component';

@Component({
  selector: 'tabs',
  template: `
    <ul class="nav nav-tabs">
      <li *ngFor="let tab of tabs let i = index" (click)="selectTab(tab)" [class.active]="tab.active">
        <a href="#">{{tab.title}}</a>
        <span *ngIf="i!=0" class="pull-right" (click)="callMe(tab,i)" style="
        margin: -29px 5px 6px 1px;
        text-decoration: underline;
        "><i _ngcontent-c7="" class="glyphicon glyphicon-remove" style="
    font-size: 8px;
"></i></span>
      </li>
    </ul>
    <ng-content></ng-content>
  `
})
export class Tabs implements AfterContentInit {

  @Input('lPushedTabs')
  lPushedTabs: any = {};
  @ContentChildren(Tab) tabs: QueryList<Tab>;

  // contentChildren are set
  ngAfterContentInit() {
    // get all active tabs
    let activeTabs = this.tabs.filter((tab) => tab.active);

    // if there is no active tab set, activate the first
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
      
    }
  }
  callMe(tab: Tab,i) {
    console.log(tab,i);
    this.lPushedTabs.splice(i,1);
    this.tabs['_results'].splice(i,1);
    this.tabs['_results'][i-1].active=true;  
  }
  selectTab(tab: Tab) {
    // deactivate all tabs
    this.tabs.toArray().forEach(tab => tab.active = false);

    // activate the tab the user has clicked on.
    tab.active = true;
  }

}
