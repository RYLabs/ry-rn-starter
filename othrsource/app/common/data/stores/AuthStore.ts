import { observable, action } from 'mobx';

export class AuthStore {
    @observable inProgress = false;
    @observable errors = undefined;

    @observable values = {
        email: '',
        password: '',
    };

    @action setEmail(email: string): void {
        this.values.email = email;
    }

    @action setPassword(password: string): void {
        this.values.password = password;
    }

    @action reset() : void {
        this.values.email = '';
        this.values.password = '';
    }

    @action async login() {
        this.inProgress = true;
        this.errors = undefined;

        return Promise.resolve()
    }

    @action logout() {
        return Promise.resolve()
    }
}