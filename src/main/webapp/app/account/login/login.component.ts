import {Component, OnInit, AfterViewInit, Renderer, ElementRef} from '@angular/core';
// import {NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {LoginService} from './login.service';
// import {LoginModalService} from '../../shared';
import {StateStorageService} from '../../shared/auth/state-storage.service';
// import {SocialService} from '../../shared/social/social.service';
import {Router} from '@angular/router';

@Component({
    selector: 'jhi-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, AfterViewInit {
    authenticationError: boolean;
    password: string;
    rememberMe: boolean;
    username: string;
    credentials: any;

    constructor(private eventManager: JhiEventManager,
                private loginService: LoginService,
                private stateStorageService: StateStorageService,
                private elementRef: ElementRef,
                private renderer: Renderer,
                // private socialService: SocialService,
                private router: Router) {
        this.credentials = {};
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#username'), 'focus', []);
    }

    cancel() {
        this.credentials = {
            username: null,
            password: null,
            rememberMe: true
        };
        this.authenticationError = false;
        // this.activeModal.dismiss('cancel');
    }

    login() {
        this.loginService.login({
            username: this.username,
            password: this.password,
            rememberMe: this.rememberMe
        }).then(() => {
            this.authenticationError = false;
            // this.activeModal.dismiss('login success');
            if (this.router.url === '/register' || (/^\/activate\//.test(this.router.url)) ||
                (/^\/reset\//.test(this.router.url))) {
                this.router.navigate(['']).then();
            }

            this.eventManager.broadcast({
                name: 'authenticationSuccess',
                content: 'Sending Authentication Success'
            });

            // previousState was set in the authExpiredInterceptor before being redirected to login modal.
            // since login is successful, go to stored previousState and clear previousState
            const redirect = this.stateStorageService.getUrl();
            if (redirect) {
                this.stateStorageService.storeUrl(null);
                this.router.navigate([redirect]).then();
            }
            this.router.navigate(['/']).then();
        }).catch(() => {
            this.authenticationError = true;
        });
    }

    register() {
        // this.activeModal.dismiss('to state register');
        this.router.navigate(['/register']).then();
    }

    requestResetPassword() {
        // this.activeModal.dismiss('to state requestReset');
        this.router.navigate(['/reset', 'request']).then();
    }
}
