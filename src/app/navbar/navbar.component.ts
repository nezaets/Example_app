import { Component, EventEmitter, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() collapseChanged = new EventEmitter<boolean>();
  public collapsed;

  constructor() { }

  ngOnInit(): void {
  }

  public toggle(): void {
    this.collapsed = !this.collapsed;
    this.collapseChanged.emit(this.collapsed);
  }
}
