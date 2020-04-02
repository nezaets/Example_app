import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailsComponent } from './post-details.component';
import { PostsService } from '../posts.service';
import { of } from 'rxjs/internal/observable/of';

import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { createEntities } from 'src/testing/test-creators/entity-creator';
import { createPostComment } from 'src/testing/test-creators/post-creators';

describe('PostDetailsComponent', () => {
  let component: PostDetailsComponent;
  let fixture: ComponentFixture<PostDetailsComponent>;
  let postsServiceSpy: jasmine.SpyObj<PostsService>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async(() => {
    postsServiceSpy = jasmine.createSpyObj('PostsService', [ 'getPostComments' ]);
    matDialogSpy = jasmine.createSpyObj('MatDialog', [ 'closeAll' ]);

    TestBed.configureTestingModule({
             declarations: [
               PostDetailsComponent,
             ],
             providers: [
               {
                 provide: PostsService,
                 useValue: postsServiceSpy,
               },
               {
                 provide: MAT_DIALOG_DATA,
                 useValue: {},
               },
               {
                 provide: MatDialog,
                 useValue: matDialogSpy,
               },
             ],
             schemas: [ NO_ERRORS_SCHEMA ],
           })
           .compileComponents();
  }));

  beforeEach(() => {
    postsServiceSpy.getPostComments.and.returnValue(of(createEntities(4, createPostComment)));

    fixture = TestBed.createComponent(PostDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  describe('should contain proper amount of comments', () => {
    it('should initially contain 3 comments', () => {
      fixture.detectChanges();

      const comments = fixture.debugElement.queryAll(By.css('.comment'));

      expect(comments.length)
        .toEqual(3);
    });

    it('should show 4 comments and "less comments" btn when click toggle btn', () => {
      const toggleBtn = fixture.debugElement.query(By.css('.toggle-btn'));
      toggleBtn.triggerEventHandler('click', null);
      fixture.detectChanges();

      const comments = fixture.debugElement.queryAll(By.css('.comment'));
      expect(comments.length)
        .toEqual(4);
      expect(toggleBtn.nativeElement.textContent)
        .toContain('less comments');
    });

    it('should show 3 comments and "more comments" btn when click on toggle btn', () => {
      const toggleBtn = fixture.debugElement.query(By.css('.toggle-btn'));
      component.toggleCommentsAmount();
      fixture.detectChanges();

      toggleBtn.triggerEventHandler('click', null);
      fixture.detectChanges();

      const comments = fixture.debugElement.queryAll(By.css('.comment'));
      expect(comments.length)
        .toEqual(3);
      expect(toggleBtn.nativeElement.textContent)
        .toContain('more comments');
    });
  });

  describe('onAuthorClick', () => {

    it('should close all dialogs', () => {
      component.onAuthorClick();
      expect(matDialogSpy.closeAll)
        .toHaveBeenCalled();
    });
  });
});
