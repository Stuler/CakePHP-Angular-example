import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';

@Component({
  selector: 'app-user-sign-in',
  imports: [],
  templateUrl: './user-sign-in.component.html',
  styleUrl: './user-sign-in.component.css'
})
export class UserSignInComponent implements OnInit{
  users:any[] = [];
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

}
