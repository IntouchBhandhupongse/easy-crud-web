import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserDetailDialogComponent } from './users-list/user-detail-dialog/user-detail-dialog.component';
import { NgxMaskDirective,NgxMaskPipe } from 'ngx-mask';

@NgModule({
  declarations: [
    UsersListComponent,
    UserDetailDialogComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    NgxMaskDirective,
    NgxMaskPipe
  ]
})
export class UsersModule { }
