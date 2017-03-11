import { UserDetailsPage } from './../user-details/user-details';
import { GithubUsers } from './../../providers/github-users';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Users page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class UsersPage {

  users: User[];
  originalUsers: User[];

  constructor(public navCtrl: NavController, private githubUsers: GithubUsers) {
    githubUsers.load().subscribe(users=>{
      this.users = users;
      this.originalUsers = users;
    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }

  goToDetails(login:string){
    this.navCtrl.push(UserDetailsPage, {login});
  }

  search(searchEvent){
    let term = searchEvent.target.value;

    if(term.trim() === '' || term.trim().length < 3){
      this.users = this.originalUsers;
    } else {
      this.githubUsers.serarchUsers(term).subscribe(users =>{
        this.users = users;
      });
    }
  }
}
