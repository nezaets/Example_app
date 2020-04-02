import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Post } from '../post';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  @Output() post = new EventEmitter<Post>()
  public postForm = this.fb.group({
    title: [ '', [ Validators.required ] ],
    body: [ '', [ Validators.required ] ],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  public onSubmit() {
    this.post.next(this.postForm.value);
  }
}
