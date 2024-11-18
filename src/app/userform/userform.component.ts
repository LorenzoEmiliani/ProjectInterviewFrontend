import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../services/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-userform',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './userform.component.html',
  styleUrl: './userform.component.css'
})
export class UserformComponent implements OnInit {

  user: User = {
    id:0,
    name:''
  };
  updateMode: boolean = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('userId');
    if(id) {
      this.updateMode = true;
      this.user.id = +id;
    }
  }

  onSubmit(form: NgForm): void {
    if(this.updateMode) {
      this.userService.updateUser(this.user.id, this.user).subscribe(() => this.router.navigate(['/']));
    } else {
      this.userService.createUser(this.user).subscribe(() => this.router.navigate(['/']));
    }
  }

}
