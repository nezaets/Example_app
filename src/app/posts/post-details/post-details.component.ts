import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostComment, PostWithUser } from '../post';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { PostsService } from '../posts.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  public allComments$: Observable<PostComment[]>;
  public comments$: Observable<PostComment[]>;
  public moreCommentsOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isMoreCommentsOpen = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PostWithUser,
    public postService: PostsService
  ) { }

  public ngOnInit(): void {
    this.allComments$ = this.postService.getPostComments(this.data.id);

    this.comments$ = combineLatest(this.moreCommentsOpen$, this.allComments$)
      .pipe(
        map(([ isMoreCommentsOpen, comments ]) => {
          if (isMoreCommentsOpen) {
            return comments;
          } else {
            return comments.slice(0, 3);
          }
        }),
      );
  }

  public toggleCommentsAmount() {
    this.isMoreCommentsOpen = !this.isMoreCommentsOpen;
    this.moreCommentsOpen$.next(this.isMoreCommentsOpen);
  }
}
