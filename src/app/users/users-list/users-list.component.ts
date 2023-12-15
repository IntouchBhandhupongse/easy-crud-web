import { Component, Directive, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { UserDetailDialogComponent } from './user-detail-dialog/user-detail-dialog.component';
import { UsersService } from '../../_services/users.service';

export interface IUser {
  _id: string;
  id: string;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  tel: string;
  department: string;
}

// Mock Data
// const USERS: IUser[] = [
//   { id: "01", full_name: "1first 1last", first_name: "1first", last_name: "1last", email: "e1@email.com", tel: "0811111111", department: "test_department1" },
//   { id: "02", full_name: "2first 2last", first_name: "2first", last_name: "2last", email: "e2@email.com", tel: "0822222222", department: "test_department2" },
//   { id: "03", full_name: "3first 3last", first_name: "3first", last_name: "3last", email: "e3@email.com", tel: "0833333333", department: "test_department3" },
//   { id: "04", full_name: "4first 4last", first_name: "4first", last_name: "4last", email: "e4@email.com", tel: "0844444444", department: "test_department4" },
//   { id: "05", full_name: "5first 5last", first_name: "5first", last_name: "5last", email: "e5@email.com", tel: "0855555555", department: "test_department5" },
//   { id: "06", full_name: "6first 6last", first_name: "6first", last_name: "6last", email: "e6@email.com", tel: "0866666666", department: "test_department6" },
//   { id: "07", full_name: "7first 7last", first_name: "7first", last_name: "7last", email: "e7@email.com", tel: "0877777777", department: "test_department7" },
//   { id: "08", full_name: "8first 8last", first_name: "8first", last_name: "8last", email: "e8@email.com", tel: "0888888888", department: "test_department8" },
//   { id: "09", full_name: "9first 9last", first_name: "9first", last_name: "9last", email: "e9@email.com", tel: "0899999999", department: "test_department9" },
//   { id: "10", full_name: "10first 10last", first_name: "10first", last_name: "10last", email: "e10@email.com", tel: "0900000000", department: "test_department10" },
//   { id: "11", full_name: "11first 11last", first_name: "11first", last_name: "11last", email: "e11@email.com", tel: "0911111111", department: "test_department11" },
//   { id: "12", full_name: "12first 12last", first_name: "12first", last_name: "12last", email: "e12@email.com", tel: "0922222222", department: "test_department12" },
// ];

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  Coloumn = ['select', 'full_name', 'email', 'tel', 'department', 'actions'];
  DepartmentList = ["Business Analyst", "Admin", "Sale", "System Analyst", "Developer", "Software Tester", "SRE"];

  @ViewChild(MatTable) table: MatTable<any> | undefined;
  @ViewChild(MatSort) sort: MatSort = new MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<IUser>();
  selection = new SelectionModel<IUser>(true, []);

  isLoadingData: boolean = false;
  selectAll = false;
  form_search: FormGroup;

  pageSizeOptions = [10, 25, 50, 100];

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private usersService: UsersService,

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

  async ngOnInit() {
    await this.getUserList();
    this.form_search.valueChanges.subscribe(form => {
      this.dataSource.filter = JSON.stringify(form);
      // console.log(this.dataSource);
      
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async getUserList() {
    this.isLoadingData = true;
    this.selection.clear();
    this.clear();

    this.usersService.list().subscribe((res: any) => {

      this.isLoadingData = false;

      // console.log(res);
      if (res) {
        if (res && res.length > 0) {
          this.dataSource.data = res;
          // console.log(this.dataSource);

        }
      }
    });
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
        && (searchTerms.department.length > 0 ? (searchTerms.department.indexOf(data.department) !== -1) : true);

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

  opendialog(data?: any) {
    const dialogRef = this.dialog.open(UserDetailDialogComponent, {
      maxHeight: '95vh',
      maxWidth: '95vw',
      width: '80vw',
      data: data,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getUserList();
      }
    });
  }

  remove(data: any[]) {
    // console.log(data);

    let reqData = { ids: data.map(x => x.id) };
    console.log(reqData);

    Swal.fire({
      title: 'Are you sure ?',
      text: 'Do you really want to delete ' + data.length + ' user' + (data.length > 1 ? "s" : "" ) + '? This process cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#fa8072',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {

        Swal.fire({
          title: 'Processing...',
          imageUrl: "assets/loading/loading-buffering.gif",
          imageWidth: 200,
          imageHeight: 200,
          timerProgressBar: true,
          showConfirmButton: false,
          allowOutsideClick: false,
          didOpen: () => {

            if (data.length > 1) {
              this.usersService.deletelist(reqData).subscribe((res: any) => {

                Swal.close();

                if (res) {

                  Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    timer: 1500,
                    timerProgressBar: true,
                  }).then(() => {
                    Swal.close;
                    this.getUserList()
                  })

                } else {

                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.message,
                  });

                }
              }, (error) => {
                console.log("ERROR");
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: error,
                })
              });
            }
            else {
              this.usersService.deleteOne(data[0].id).subscribe((res: any) => {

                Swal.close();

                if (res) {

                  Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    timer: 1500,
                    timerProgressBar: true,
                  }).then(() => {
                    Swal.close;
                    this.getUserList()
                  })

                } else {

                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.message,
                  });

                }
              }, (error) => {
                console.log("ERROR");
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: error,
                })
              });
            }

          }
        });

      }
    })
  }
}
