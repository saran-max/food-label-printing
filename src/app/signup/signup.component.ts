import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
//import { auth } from 'firebase/compat/app';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email: string = '';
  password: string = '';
  reEnterPassword: string = '';

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  signUp() {

    if (this.email === '') {
      alert('Email field cannot be empty');
      return;
    }
  
    if (this.password === '') {
      alert('Password field cannot be empty');
      return;
    }
  
    if (this.password !== this.reEnterPassword) {
      alert('Password and Re-enter Password do not match');
      return;
    }
  

    this.afAuth.createUserWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        // Sign-up successful, you can do further processing here
        alert('Signed up successfully!');
      })
      .catch((error) => {
        // Sign-up failed, handle the error here
        alert(`Error signing up:, something went wrong`);
      });
  }

}
