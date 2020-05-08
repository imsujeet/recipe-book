import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  userSub: Subscription;


  constructor(private dataStorageServive: DataStorageService, private authService: AuthService) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(
      user => {
        this.isAuthenticated = !!user; // (equivalent to) !user ? false : true
      }
    );
  }

  onSaveData() {
    this.dataStorageServive.storeRecipes();
  }

  onFetchData() {
    this.dataStorageServive.fetchRecipes().subscribe();
  }

  ngOnDestroy(){}

}
