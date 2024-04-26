import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminPanelService } from '../admin-panel.service';

@Component({
  selector: 'app-approve',
  standalone: true,
  imports: [],
  templateUrl: './approve.component.html',
  styleUrl: './approve.component.scss',
})
export class ApproveComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private adminPanelService: AdminPanelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const email = params['email'];
      const password = params['password'];
      console.log('Email:', email);
      console.log('Password:', password);
      this.adminPanelService.signup({ email, password }).subscribe({
        next: (resData) => {
          console.log('Registered!', resData.token);
          this.adminPanelService.sendConfirmEmail(email).subscribe();
        },
      });
    });
    setTimeout(() => this.goToMainPage(), 3000);
  }
  goToMainPage() {
    this.router.navigate(['/main']);
  }
}
