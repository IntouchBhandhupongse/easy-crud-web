import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { UserDetailDialogComponent } from './user-detail-dialog.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { AppRoutingModule } from '../../../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../../material/material.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from '../../../_services/users.service';
import { of } from 'rxjs';

describe('UserDetailDialogComponent', () => {
  let component: UserDetailDialogComponent;
  let fixture: ComponentFixture<UserDetailDialogComponent>;

  let service: UsersService;
  let httpClientSpy: jasmine.SpyObj<UsersService>;

  let Mockdata = [
    {
      "_id": "657745b9e8bd2e55273c9c8d",
      "id": "2495f0b9-70cf-4a1d-b806-786f6aae8c11",
      "full_name": "Intouch Bhandhupongse",
      "first_name": "Intouch",
      "last_name": "Bhandhupongse",
      "email": "Intouch.Bhandhupongse@gmail.com",
      "tel": "0814309650",
      "department": "Developer"
    },
    {
      "_id": "6578669dccc7ae8b285e0e0b",
      "id": "b5dbf8d8-8927-464f-a8f4-733f1a611c95",
      "full_name": "test 1",
      "first_name": "test",
      "last_name": "1",
      "email": "test1@gmail",
      "tel": "1111111111",
      "department": "Admin"
    },
    {
      "_id": "6578686bccc7ae8b285e0e0c",
      "id": "10dc8e35-9d5b-4827-9910-d21dc6623833",
      "full_name": "test 2",
      "first_name": "test",
      "last_name": "2",
      "email": "test2@gmail",
      "tel": "2222222222",
      "department": "Sale"
    },
    {
      "_id": "6578690cccc7ae8b285e0e0d",
      "id": "f12a7de0-bcdd-434a-892e-ebb7ccb6b7f0",
      "full_name": "test 3",
      "first_name": "test",
      "last_name": "3",
      "email": "test3@gmail",
      "tel": "3333333333",
      "department": "System Analyst"
    },
    {
      "_id": "65786982ccc7ae8b285e0e0e",
      "id": "909eba14-39ec-47de-94bd-447c52009d2d",
      "full_name": "test  4",
      "first_name": "test ",
      "last_name": "4",
      "email": "test4@gmail",
      "tel": "4444444444",
      "department": "Software Tester"
    }
  ]

  beforeEach(async () => {
    let httpClientSpyObj = jasmine.createSpyObj('UsersService',
      {
        'list': of(Mockdata),
        'create': of(true),
        'update': of(true),
        'deleteOne': of(true),
        'deletelist': of(true),
      });
    await TestBed.configureTestingModule({
      declarations: [UserDetailDialogComponent],
      imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        NgxMaskDirective,
        NgxMaskPipe,
        HttpClientModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: UsersService, useValue: httpClientSpyObj },
        provideNgxMask(),
      ]
    })
      .compileComponents().then(() => {

        fixture = TestBed.createComponent(UserDetailDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        httpClientSpy = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;

      });

    fixture.detectChanges();

  });

  it('UserDetailDialogComponent should create', () => {
    expect(component).toBeTruthy();
  });

  describe("Form", () => {
    it(`Case 1 (No Data) : form should invalid`,(() => {
      component.form.controls['first_name'].setValue('');
      component.form.controls['last_name'].setValue('');
      component.form.controls['email'].setValue('');
      component.form.controls['tel'].setValue('');
      component.form.controls['department'].setValue('');
      expect(component.form.valid).toBeFalsy();
    }));

    it(`Case 2 (Fill All Data) : form should valid`,(() => {
      component.form.controls['first_name'].setValue('test');
      component.form.controls['last_name'].setValue('test');
      component.form.controls['email'].setValue('test@test.com');
      component.form.controls['tel'].setValue('0811111111');
      component.form.controls['department'].setValue('Developer');
      expect(component.form.valid).toBeTruthy();
    }));

    it(`Case 3 (Forget First Name) : form should invalid`,(() => {
      component.form.controls['first_name'].setValue('');
      component.form.controls['last_name'].setValue('test');
      component.form.controls['email'].setValue('test@test.com');
      component.form.controls['tel'].setValue('0811111111');
      component.form.controls['department'].setValue('Developer');
      expect(component.form.valid).toBeFalsy();
    }));

    it(`Case 4 (Forget Department) : form should valid`,(() => {
      component.form.controls['first_name'].setValue('test');
      component.form.controls['last_name'].setValue('test');
      component.form.controls['email'].setValue('test@test.com');
      component.form.controls['tel'].setValue('0811111111');
      component.form.controls['department'].setValue('');
      expect(component.form.valid).toBeTruthy();
    }));
  });

  describe("Buttons", () => {

    it('Close Button (should call close)', fakeAsync(() => {
      spyOn(component, 'close');
      let buttonElement = fixture.debugElement.query(By.css('#close_bt'));
      buttonElement.triggerEventHandler('click', null);

      tick();
      expect(component.close).toHaveBeenCalled();
    }));

    it('Save Button (should call submit)', fakeAsync(() => {
      spyOn(component, 'submit');
      let buttonElement = fixture.debugElement.query(By.css('#save_bt'));
      buttonElement.triggerEventHandler('click', null);
      
      tick();
      expect(component.submit).toHaveBeenCalled();
    }));
  });
});
