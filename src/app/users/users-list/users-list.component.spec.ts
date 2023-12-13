import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { UsersListComponent } from './users-list.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MaterialModule } from '../../material/material.module';
import { BrowserModule, By } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { UsersService } from '../../_services/users.service';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;

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
      declarations: [UsersListComponent],
      imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        NgxMaskDirective,
        NgxMaskPipe,
        HttpClientModule],
      providers: [
        {
          provide: UsersService,
          useValue: httpClientSpyObj
        },
        provideNgxMask()
      ]
    })
      .compileComponents().then(() => {

        fixture = TestBed.createComponent(UsersListComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(UsersService);
        httpClientSpy = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;

      });

    fixture.detectChanges();
  });

  it('UsersListComponent should create', () => {
    expect(component).toBeTruthy();
  });

  describe("User Service", () => {
    it(`Service 1 : List (table should have data)`, waitForAsync(async () => {
      await component.getUserList();
      expect(component.dataSource.data.length).toBeGreaterThan(0);
    }));
  });

  describe("Filter", () => {
    it(`Name 1 : table should have 1 record`,(() => {
      component.form_search.controls['name'].setValue('in');
      component.form_search.controls['email'].setValue('');
      component.form_search.controls['tel'].setValue('');
      component.form_search.controls['department'].setValue('');
      expect(component.dataSource.filteredData.length).toEqual(1);
    }));

    it(`Name 2 : table should have 4 records`,(() => {
      component.form_search.controls['name'].setValue('test');
      component.form_search.controls['email'].setValue('');
      component.form_search.controls['tel'].setValue('');
      component.form_search.controls['department'].setValue('');
      expect(component.dataSource.filteredData.length).toEqual(4);
    }));

    it(`Name 3 : table shouldn't have any record`,(() => {
      component.form_search.controls['name'].setValue('AWE');
      component.form_search.controls['email'].setValue('');
      component.form_search.controls['tel'].setValue('');
      component.form_search.controls['department'].setValue('');
      expect(component.dataSource.filteredData.length).toEqual(0);
    }));

    it(`Email 1 : table should have 1 record`,(() => {
      component.form_search.controls['name'].setValue('');
      component.form_search.controls['email'].setValue('.com');
      component.form_search.controls['tel'].setValue('');
      component.form_search.controls['department'].setValue('');
      expect(component.dataSource.filteredData.length).toEqual(1);
    }));

    it(`Email 2 : table should have 5 records`,(() => {
      component.form_search.controls['name'].setValue('');
      component.form_search.controls['email'].setValue('@gmail');
      component.form_search.controls['tel'].setValue('');
      component.form_search.controls['department'].setValue('');
      expect(component.dataSource.filteredData.length).toEqual(5);
    }));

    it(`Email 3 : table shouldn't have any record`,(() => {
      component.form_search.controls['name'].setValue('');
      component.form_search.controls['email'].setValue('@hotmail');
      component.form_search.controls['tel'].setValue('');
      component.form_search.controls['department'].setValue('');
      expect(component.dataSource.filteredData.length).toEqual(0);
    }));

    it(`Tel 1 : table should have 1 record`,(() => {
      component.form_search.controls['name'].setValue('');
      component.form_search.controls['email'].setValue('');
      component.form_search.controls['tel'].setValue('081');
      component.form_search.controls['department'].setValue('');
      expect(component.dataSource.filteredData.length).toEqual(1);
    }));

    it(`Tel 2 : table should have 1 record`,(() => {
      component.form_search.controls['name'].setValue('');
      component.form_search.controls['email'].setValue('');
      component.form_search.controls['tel'].setValue('111');
      component.form_search.controls['department'].setValue('');
      expect(component.dataSource.filteredData.length).toEqual(1);
    }));

    it(`Tel 3 : table shouldn't have any record`,(() => {
      component.form_search.controls['name'].setValue('');
      component.form_search.controls['email'].setValue('');
      component.form_search.controls['tel'].setValue('5555');
      component.form_search.controls['department'].setValue('');
      expect(component.dataSource.filteredData.length).toEqual(0);
    }));

    it(`Department 1 : table should have 1 record`,(() => {
      component.form_search.controls['name'].setValue('');
      component.form_search.controls['email'].setValue('');
      component.form_search.controls['tel'].setValue('');
      component.form_search.controls['department'].setValue(['Developer']);
      expect(component.dataSource.filteredData.length).toEqual(1);
    }));

    it(`Department 2 : table should have 2 records`,(() => {
      component.form_search.controls['name'].setValue('');
      component.form_search.controls['email'].setValue('');
      component.form_search.controls['tel'].setValue('');
      component.form_search.controls['department'].setValue(['Developer','Sale']);
      expect(component.dataSource.filteredData.length).toEqual(2);
    }));

    it(`Department 3 : table shouldn't have any record`,(() => {
      component.form_search.controls['name'].setValue('');
      component.form_search.controls['email'].setValue('');
      component.form_search.controls['tel'].setValue('');
      component.form_search.controls['department'].setValue(['SRE']);
      expect(component.dataSource.filteredData.length).toEqual(0);
    }));
  });

  describe("Buttons", () => {

    it('Clear Button (should call clear)', fakeAsync(() => {
      spyOn(component, 'clear');
      let buttonElement = fixture.debugElement.query(By.css('#clear_button'));
      buttonElement.triggerEventHandler('click', null);

      tick();
      expect(component.clear).toHaveBeenCalled();
    }));

    it('Add Button (should call opendialog)', fakeAsync(() => {
      spyOn(component, 'opendialog');
      let buttonElement = fixture.debugElement.query(By.css('#add_button'));
      buttonElement.triggerEventHandler('click', null);
      
      tick();
      expect(component.opendialog).toHaveBeenCalled();
    }));

    it('Edit Button (should call opendialog)', fakeAsync(() => {
      spyOn(component, 'opendialog');
      let buttonElement = fixture.debugElement.query(By.css('#edit_button'));
      buttonElement.triggerEventHandler('click', null);
      
      tick();
      expect(component.opendialog).toHaveBeenCalled();
    }));

    it('Delete Button (1) (should call remove)', fakeAsync(() => {
      spyOn(component, 'remove');
      let buttonElement = fixture.debugElement.query(By.css('#del_button'));
      buttonElement.triggerEventHandler('click', null);
      
      tick();
      expect(component.remove).toHaveBeenCalled();
    }));
  });
});
