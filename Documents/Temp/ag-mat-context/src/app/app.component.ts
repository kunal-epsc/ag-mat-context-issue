import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import type {
  ColDef,
  DefaultMenuItem,
  GetContextMenuItemsParams,
  GridOptions,
  GridReadyEvent,
  MenuItemDef,
} from 'ag-grid-community';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

export interface IOlympicData {
  athlete: string;
  age: number;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {
  public gridOptions: GridOptions = {
    popupParent: document.querySelector('body'),
  };
  columnDefs: ColDef[] = [
    { field: 'athlete', minWidth: 200 },
    { field: 'age' },
    { field: 'country', minWidth: 200 },
    { field: 'year' },
    { field: 'date', minWidth: 180 },
    { field: 'sport', minWidth: 200 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ];
  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
  };
  rowData!: IOlympicData[];

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  onGridReady(params: GridReadyEvent<IOlympicData>) {
    this.http
      .get<IOlympicData[]>(
        'https://www.ag-grid.com/example-assets/olympic-winners.json'
      )
      .subscribe((data) => (this.rowData = data));
  }

  getContextMenuItems = (
    params: GetContextMenuItemsParams
  ):
    | (DefaultMenuItem | MenuItemDef)[]
    | Promise<(DefaultMenuItem | MenuItemDef)[]> => {
    const result: (DefaultMenuItem | MenuItemDef)[] = [
      {
        // custom item
        name: 'Alert ' + params.value,
        action: () => {
          window.alert('Alerting about ' + params.value);
        },
        cssClasses: ['red', 'bold'],
      },
      {
        // custom item
        name: 'Always Disabled',
        disabled: true,
        tooltip:
          'Very long tooltip, did I mention that I am very long, well I am! Long!  Very Long!',
      },
      {
        name: 'Country',
        subMenu: [
          {
            name: 'Ireland',
            action: () => {
              console.log('Ireland was pressed');
            },
            icon: createFlagImg('ie'),
          },
          {
            name: 'UK',
            action: () => {
              console.log('UK was pressed');
            },
            icon: createFlagImg('gb'),
          },
          {
            name: 'France',
            action: () => {
              console.log('France was pressed');
            },
            icon: createFlagImg('fr'),
          },
        ],
      },
      {
        name: 'Person',
        subMenu: [
          {
            name: 'Niall',
            action: () => {
              console.log('Niall was pressed');
            },
          },
          {
            name: 'Sean',
            action: () => {
              console.log('Sean was pressed');
            },
          },
          {
            name: 'John',
            action: () => {
              console.log('John was pressed');
            },
          },
          {
            name: 'Alberto',
            action: () => {
              console.log('Alberto was pressed');
            },
          },
          {
            name: 'Tony',
            action: () => {
              console.log('Tony was pressed');
            },
          },
          {
            name: 'Andrew',
            action: () => {
              console.log('Andrew was pressed');
            },
          },
          {
            name: 'Kev',
            action: () => {
              console.log('Kev was pressed');
            },
          },
          {
            name: 'Will',
            action: () => {
              console.log('Will was pressed');
            },
          },
          {
            name: 'Armaan',
            action: () => {
              console.log('Armaan was pressed');
            },
          },
        ],
      },
      'separator',
      {
        // custom item
        name: 'Windows',
        shortcut: 'Alt + W',
        action: () => {
          console.log('Windows Item Selected');
        },
        icon: '<img src="https://www.ag-grid.com/example-assets/skills/windows.png" />',
      },
      {
        // custom item
        name: 'Mac',
        shortcut: 'Alt + M',
        action: () => {
          console.log('Mac Item Selected');
        },
        icon: '<img src="https://www.ag-grid.com/example-assets/skills/mac.png"/>',
      },
      'separator',
      {
        // custom item
        name: 'Checked',
        checked: true,
        action: () => {
          console.log('Checked Selected');
        },
        icon: '<img src="https://www.ag-grid.com/example-assets/skills/mac.png"/>',
      },
      'copy',
      'separator',
      'chartRange',
    ];
    if (params.column?.getColId() === 'country') {
      return new Promise((res) => setTimeout(() => res(result), 150));
    }
    return result;
  };

  openDialog(): void {
   this.dialog.open(DialogComponent, {
      width: '400px',
      height: '350px'
    });
  }
}

function createFlagImg(flag: string) {
  return (
    '<img border="0" width="15" height="10" src="https://flags.fmcdn.net/data/flags/mini/' +
    flag +
    '.png"/>'
  );
}
