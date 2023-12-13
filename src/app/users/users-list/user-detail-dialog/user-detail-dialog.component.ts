import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsersService } from '../../../_services/users.service';

@Component({
  selector: 'app-user-detail-dialog',
  templateUrl: './user-detail-dialog.component.html',
  styleUrl: './user-detail-dialog.component.scss'
})
export class UserDetailDialogComponent implements OnInit {
  form: FormGroup

  DepartmentList = ["Business Analyst", "Admin", "Sale", "System Analyst", "Developer", "Software Tester", "SRE"];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UserDetailDialogComponent>,
    private fb: FormBuilder,
    private usersService: UsersService,
  ) {
    this.form = this.fb.group({
      id: [this.data?.id],
      first_name: [this.data?.first_name],
      last_name: [this.data?.last_name],
      email: [this.data?.email, Validators.email],
      tel: [this.data?.tel],
      department: [this.data?.department],
    });
  }

  ngOnInit(): void {

  }

  close() {
    this.dialogRef.close(null);
  }

  submit() {

    this.form.markAllAsTouched();

    if (!this.form.valid) {
      Swal.fire({
        title: 'Please fill out completely and correctly.',
        icon: 'warning',
        showConfirmButton: true,
        allowOutsideClick: false,
        confirmButtonColor: '#104E8E',
      });

      return;
    }

    let reqData = this.form.value;

    Swal.fire({
      icon: 'question',
      title: 'Confirm data recording',
      html: '<h4 style="margin: 0px;">Please check the accuracy of the information before clicking the "Save" button.</h4>',
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed === true) {

        if (reqData.id) {

          Swal.fire({
            title: 'Processing...',
            imageUrl: "assets/loading/loading-buffering.gif",
            imageWidth: 200,
            imageHeight: 200,
            timerProgressBar: true,
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => {
              this.usersService.update(reqData).subscribe((res: any) => {

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
                    this.dialogRef.close(true)
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
          });

        } else {
          Swal.fire({
            title: 'Processing...',
            imageUrl: "assets/loading/loading-buffering.gif",
            imageWidth: 200,
            imageHeight: 200,
            timerProgressBar: true,
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => {
              this.usersService.create(reqData).subscribe((res: any) => {

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
                    this.dialogRef.close(true)
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
          });
        }
      }
    });

  }

}
