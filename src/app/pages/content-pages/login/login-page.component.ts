import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {

    public loginForm: FormGroup;

    constructor(private router: Router,
        private route: ActivatedRoute) {
        this.loginForm = new FormGroup({
            'username': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
            'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
        });
    }

    // On submit button click
    onSubmit() {
        console.log(this.loginForm.value);
        // this.loginForm.reset();
    }
    // On Forgot password link click
    onForgotPassword() {
        this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
    }
    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }
}
