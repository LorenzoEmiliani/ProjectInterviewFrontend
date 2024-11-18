import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../services/user.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent implements OnInit {
  
  users: User[] = [];
  
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => (this.users = data));
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(() => 
      this.userService.getUsers().subscribe(data => (this.users = data))
    );
  }

}
