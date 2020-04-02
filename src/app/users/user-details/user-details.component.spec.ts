import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsComponent } from './user-details.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '../../../testing/activated-route.stub';
import { createUser } from '../../../testing/test-creators/user-creator';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let activatedRouteStub: ActivatedRouteStub;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async(() => {
    activatedRouteStub = new ActivatedRouteStub({ id: 1 });

    TestBed.configureTestingModule({
             imports: [
               RouterTestingModule,
             ],
             declarations: [ UserDetailsComponent ],
             providers: [
               {
                 provide: MAT_DIALOG_DATA,
                 useValue: createUser(1)
               },
               {
                 provide: ActivatedRoute,
                 useValue: activatedRouteStub,
               },
             ],
             schemas: [ NO_ERRORS_SCHEMA ],
           })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });
});
