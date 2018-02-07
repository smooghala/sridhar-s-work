import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule, Response, Http } from '@angular/http';
import { AppComponent } from './app.component';
import {PanelModule} from 'primeng/primeng';
import { TreeTableModule, TreeModule, TreeNode } from 'primeng/primeng';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ContextMenuModule, ContextMenu, MenuModule, GrowlModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { PositionComponent } from './position/position.component';
import { TooltipModule } from 'primeng/primeng';
import { MenubarModule, MenuItem } from 'primeng/primeng';
import { LoadingModule } from 'ngx-loading';
import { RadioButtonModule, ButtonModule } from 'primeng/primeng';
import { MultiSelectModule } from 'primeng/primeng';
import { PopoverModule } from "ngx-popover";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UiSwitchModule } from 'angular2-ui-switch';
import {AutoCompleteModule} from 'primeng/primeng';
import { ModelDefinitionComponent } from './model-definition/model-definition.component';
import { ModelAssignmentComponent } from './model-assignment/model-assignment.component';
import {InputSwitchModule} from 'primeng/primeng';
import { HeaderComponentComponent } from './components/header/header-component.component';
import { ForeCastGridComponent } from './components/forecast/fore-cast-grid/fore-cast-grid.component';
import { ForecastFilterComponent } from './components/forecast/forecast-filter/forecast-filter.component';
import { ForcastFilterNavComponent } from './components/forecast/forcast-filter-nav/forcast-filter-nav.component';
import { ScenarioDropDownComponent } from './components/shared/scenario-drop-down/scenario-drop-down.component';
import { TreeViewComponent } from './components/shared/tree-view/tree-view.component';
import { DropDownTreeComponent } from './common/ui/drop-down-tree/drop-down-tree.component';
import {DropdownTreeviewSelectComponent} from './common/ui/dropdown-treeview-select/dropdown-treeview-select.component';
import { ManagedGeoComponent } from './components/shared/managed-geo/managed-geo.component';
import { ManagedSegComponent } from './components/shared/managed-seg/managed-seg.component';
import { LegalEntityComponent } from './components/shared/legal-entity/legal-entity.component';
import { SelectAccountComponent } from './components/shared/select-account/select-account.component';
import { MinusSignToParens } from './common/pipes';
import { Tabs, Tab } from './common/ui';
import { ViewForeCastComponent } from './components/forecast/view-fore-cast/view-fore-cast.component';
import { SelectAffliatesComponent } from './components/shared/select-affliates/select-affliates.component';
import { TreeviewModule, TreeviewConfig, TreeviewI18n, TreeviewI18nDefault, DefaultTreeviewEventParser, TreeviewEventParser } from './common/ui/lib';
import { CacheService } from './common/services';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    ForeCastGridComponent,
    PositionComponent, ForecastFilterComponent, ForcastFilterNavComponent, SelectAffliatesComponent, ScenarioDropDownComponent,TreeViewComponent, DropDownTreeComponent,DropdownTreeviewSelectComponent, ManagedGeoComponent, ManagedSegComponent, 
    LegalEntityComponent, SelectAccountComponent,
    MinusSignToParens,
    Tabs,
    Tab,
    ModelDefinitionComponent,
    ViewForeCastComponent,
    ModelAssignmentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    DataTableModule,
    HttpModule,
    TreeModule,
    AngularFontAwesomeModule,
    ContextMenuModule,
    MenuModule,
    TreeTableModule,
    GrowlModule,
    DropdownModule,
    TreeviewModule,
    TooltipModule,
    MenubarModule,
    LoadingModule,
    RadioButtonModule,
    InputTextModule,
    MultiSelectModule,
    UiSwitchModule,
    PopoverModule,
    PanelModule,
    AutoCompleteModule,
    InputSwitchModule,
    ButtonModule



  ],
  // pipes: [MinusSignToParens],
  providers: [CacheService,TreeviewConfig,
    { provide: TreeviewI18n, useClass: TreeviewI18nDefault },
    { provide: TreeviewEventParser, useClass: DefaultTreeviewEventParser }],
  bootstrap: [AppComponent],
})
export class AppModule { }
