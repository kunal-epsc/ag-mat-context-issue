import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { provideHttpClient } from '@angular/common/http';
import { ContextMenuModule } from 'ag-grid-enterprise';
import { CellSelectionModule } from 'ag-grid-enterprise';

import { MatButtonModule } from '@angular/material/button';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { IntegratedChartsModule } from 'ag-grid-enterprise'; 
import { AgChartsEnterpriseModule } from 'ag-charts-enterprise'; 
import { ClipboardModule } from 'ag-grid-enterprise'; 

ModuleRegistry.registerModules([
  ContextMenuModule,
  AllCommunityModule,
  CellSelectionModule,
  IntegratedChartsModule.with(AgChartsEnterpriseModule),
  ClipboardModule
]);

@NgModule({
  declarations: [AppComponent, DialogComponent],
  imports: [
    // core modules
    BrowserModule,
    BrowserAnimationsModule,

    // app modules
    AppRoutingModule,

    // thrid party libraries
    MatButtonModule,
    MatDialogModule,
    AgGridModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
