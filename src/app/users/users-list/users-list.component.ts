import { Component, Directive, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface TableElement {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  tel: string;
  department: string;
}

const USERS : TableElement[] = [
  { id: "01", first_name: "1first", last_name: "1last", email: "e1@email.com", tel: "0811111111", department: "test_department1" },
  { id: "02", first_name: "2first", last_name: "2last", email: "e2@email.com", tel: "0822222222", department: "test_department2" },
  { id: "03", first_name: "3first", last_name: "3last", email: "e3@email.com", tel: "0833333333", department: "test_department3" },
  { id: "04", first_name: "4first", last_name: "4last", email: "e4@email.com", tel: "0844444444", department: "test_department4" },
  { id: "05", first_name: "5first", last_name: "5last", email: "e5@email.com", tel: "0855555555", department: "test_department5" },
  { id: "06", first_name: "6first", last_name: "6last", email: "e6@email.com", tel: "0866666666", department: "test_department6" },
  { id: "07", first_name: "7first", last_name: "7last", email: "e7@email.com", tel: "0877777777", department: "test_department7" },
  { id: "08", first_name: "8first", last_name: "8last", email: "e8@email.com", tel: "0888888888", department: "test_department8" },
  { id: "09", first_name: "9first", last_name: "9last", email: "e9@email.com", tel: "0899999999", department: "test_department9" },
  { id: "10", first_name: "10first", last_name: "10last", email: "e10@email.com", tel: "0900000000", department: "test_department10" },
  { id: "11", first_name: "11first", last_name: "11last", email: "e11@email.com", tel: "0911111111", department: "test_department11" },
  { id: "12", first_name: "12first", last_name: "12last", email: "e12@email.com", tel: "0922222222", department: "test_department12" },
];

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  Coloumn = ['select', 'name', 'email', 'tel', 'department'];
  
  @ViewChild(MatTable) table: MatTable<any> | undefined;
  @ViewChild(MatSort) sort: MatSort = new MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<TableElement>(USERS);
  selection = new SelectionModel<TableElement>(true, []);


  isLoadingData: boolean = false;
  selectAll = false;
  form_search: FormGroup;

  pageSizeOptions = [10, 25, 50, 100];
  pageEvent: PageEvent | undefined;


  constructor(
    private fb: FormBuilder,

  ) { 
    //Init DataSource
    this.dataSource.filterPredicate = this.createFilter();

    this.form_search = this.fb.group({
      name: [''],
      email: [''],
      tel: [''],
      department: [''],
    });
  }

  ngOnInit() {
    this.form_search.valueChanges.subscribe(form => {
      this.dataSource.filter = JSON.stringify(form);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  clear() {
    this.form_search.get('name')?.setValue('');
    this.form_search.get('email')?.setValue('');
    this.form_search.get('tel')?.setValue('');
    this.form_search.get('department')?.setValue('');
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data: any, filter: any): boolean {
      let searchTerms = JSON.parse(filter);      
      
      return (data.first_name + data.last_name).toString().toLowerCase().indexOf(searchTerms.name) !== -1
        && data.email.toLowerCase().indexOf(searchTerms.email) !== -1
        && data.tel.toLowerCase().indexOf(searchTerms.tel) !== -1
        && data.department.toLowerCase().indexOf(searchTerms.department) !== -1
    }
    return filterFunction;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.filteredData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.filteredData.forEach(row => this.selection.select(row));
  }
}
