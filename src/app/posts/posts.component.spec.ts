import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsComponent } from './posts.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../shared/services/users.service';
import { PostsService } from './posts.service';
import { createUser } from '../../testing/test-creators/user-creator';
import { of } from 'rxjs';
import { createPost } from '../../testing/test-creators/post-creators';
import { TextEllipsisPipe } from '../shared/pipes/text-ellipsis.pipe';

describe('PostsComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let usersServiceSpy: jasmine.SpyObj<UsersService>;
  let postsServiceSpy: jasmine.SpyObj<PostsService>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async(() => {
    usersServiceSpy = jasmine.createSpyObj(UsersService, [ 'getUsers' ]);
    postsServiceSpy = jasmine.createSpyObj(PostsService, [ 'getPosts' ]);
    matDialogSpy = jasmine.createSpyObj('MatDialog', [ 'open' ]);

    TestBed.configureTestingModule({
             imports: [
               RouterTestingModule,
               HttpClientTestingModule,
             ],
             providers: [
               {
                 provide: MatDialog,
                 useValue: matDialogSpy,
               }, {
                 provide: UsersService,
                 useValue: usersServiceSpy,
               }, {
                 provide: PostsService,
                 useValue: postsServiceSpy,
               },
             ],
             declarations: [
               PostsComponent,
               TextEllipsisPipe,
             ],
             schemas: [ NO_ERRORS_SCHEMA ],
           })
           .compileComponents();
  }));

  beforeEach(() => {
    usersServiceSpy.getUsers.and.returnValue(of([ createUser(1) ]));
    postsServiceSpy.getPosts.and.returnValue(of([ createPost(1) ]));
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it('should add user with post', () => {
    const expectedPosts = [
      {
        title: 'title1',
        body: 'body1',
        userId: 1,
        id: 1,
        name: 'name1',
      },
    ];
    component.posts$.subscribe(posts => {
      expect(posts)
        .toEqual(expectedPosts);
    });
  });

  describe('openPostDetailsDialog', () => {

    it('open dialog', () => {
      component.openPostDetailsDialog({
        title: 'title1',
        body: 'body1',
        userId: 1,
        id: 1,
        name: 'name1',
      });
      expect(matDialogSpy.open)
        .toHaveBeenCalled();
    });
  });

  describe('addPost', () => {

    it('open dialog', () => {
      component.addPost();
      expect(matDialogSpy.open)
        .toHaveBeenCalled();
    });
  });
});
