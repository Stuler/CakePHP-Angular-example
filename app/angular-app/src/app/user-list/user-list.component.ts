import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { NgForOf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  imports: [CommonModule, NgForOf],  // ✅ Required for *ngFor
  providers: [UserService] // ✅ Providing UserService
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    console.log("Fetching users...");

    this.userService.getUsers().subscribe({
      next: (data) => {
        console.log("Users received:", data);  // ✅ Log the actual data
        console.log("Type of data:", typeof data);  // ✅ Check if it's an object or array

        if (Array.isArray(data)) {
          this.users = data;
        } else if (typeof data === 'object' && data !== null) {
          this.users = Object.values(data); // Convert object to an array
        } else {
          console.error("Invalid API response format:", data);
        }
      },
      error: (error) => {
        console.error("Error fetching users:", error);
      }
    });
  }

}
