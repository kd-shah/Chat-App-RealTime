import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { MessageService } from 'src/app/Services/message.service';
import { MessageResponse } from './model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private fb: FormBuilder, private auth: AuthService,
    private router: Router, private message: MessageService) {
  }

  searchForm!: FormGroup
  user_name = this.auth.getName();
  isSearching: boolean = false;
  loggedInUserId = this.auth.getUserId();

  matchingMessages!: MessageResponse[]


  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchInput: ['', Validators.required]
    })

  }

  onLogout() {
    this.auth.signOutExternal();
    this.auth.removetoken();
    this.router.navigate(['/login'])
  }

  onSearch() {
    this.isSearching = true;
    this.message.searchMessage(this.searchForm.value.searchInput)
      .subscribe((response: any) => {
        console.log(response)
        this.matchingMessages = response
      }
      );
    console.log(this.searchForm.value.searchInput);
  }
  onClose() {
    this.isSearching = false;
    this.searchForm.reset()

  }

}
