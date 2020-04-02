import { Component, OnInit } from '@angular/core';
import { PostsService } from './posts.service';
import { forkJoin, Observable } from 'rxjs';
import { PostDetailsComponent } from './post-details/post-details.component';
import { MatDialog } from '@angular/material/dialog';
import { PostFormComponent } from './post-form/post-form.component';
import { UsersService } from '../shared/services/users.service';
import { map } from 'rxjs/operators';
import { PostWithUser } from './post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: [ './posts.component.scss' ],
})
export class PostsComponent implements OnInit {
  public posts$: Observable<PostWithUser[]>;

  constructor(
    private postService: PostsService,
    private usersService: UsersService,
    public dialog: MatDialog,
  ) { }

  public ngOnInit(): void {
    this.posts$ = forkJoin([
        this.postService.getPosts(),
        this.usersService.getUsers(),
      ],
    )
      .pipe(
        map(([ posts, users ]) =>
          posts.map(post => {
            const user = users.find(u => u.id === post.userId);
            const name = user ? user.name : '';
            const userId = user ? user.id : null;

            return {
              ...post,
              name,
              userId,
            };
          }),
        ),
      );
  }

  public openPostDetailsDialog(post: PostWithUser): void {
    this.dialog.open(PostDetailsComponent, {
      height: '600px',
      width: '600px',
      data: post,
    });
  }

  public addPost() {
    this.dialog.open(PostFormComponent, {
      height: '400px',
      width: '600px',
    });
  }
}
