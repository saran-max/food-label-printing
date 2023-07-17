import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./../signup/signup.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email = '';

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  sendLink(){
    if(this.email == ''){
      alert('please enter email');
      return;
    }

    this.afAuth.sendPasswordResetEmail(this.email)
    .then(() => {
      alert('Password reset email sent');
      this.email = '';
      // Optionally, display a success message to the user
    })
    .catch((error) => {
      console.log('Error sending password reset email', error);
      // Optionally, display an error message to the user
    });

  }

}
