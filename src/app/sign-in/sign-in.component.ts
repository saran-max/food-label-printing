import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DataShareService } from '../data-share.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./../signup/signup.component.css']
})
export class SignInComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private afAuth: AngularFireAuth,
    private dataShareService: DataShareService,
    private router: Router) { }

  ngOnInit(): void {
  }

  signIn() {
    if (this.email === '') {
      alert('Email field cannot be empty');
      return;
    }
  
    if (this.password === '') {
      alert('Password field cannot be empty');
      return;
    }

    this.afAuth.signInWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        // Sign-in successful
        const user:any = userCredential.user;
        this.dataShareService.uid = user.uid;
        this.dataShareService.email = user.email;    
        this.router.navigate(['/food-items']);
      })
      .catch((error) => {
        // Sign-in failed, handle the error here
        alert(`Error signing in: wrong user name or password`);
      });
  }
  

}
