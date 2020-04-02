import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { UsersService } from '../shared/services/users.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let usersServiceSpy: jasmine.SpyObj<UsersService>;

  beforeEach(async(() => {
    usersServiceSpy = jasmine.createSpyObj('UsersService', [ 'getUsers' ]);
    TestBed.configureTestingModule({
             declarations: [ UsersComponent ],
             providers: [
               {
                 provide: UsersService,
                 useValue: usersServiceSpy,
               },
             ],
             schemas: [ NO_ERRORS_SCHEMA ],
           })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it('should get users from users service', () => {
    expect(usersServiceSpy.getUsers)
      .toHaveBeenCalled();
  });
});
