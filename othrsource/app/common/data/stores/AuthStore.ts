import { observable, action } from 'mobx';

export class AuthStore {
    @observable inProgress = false;
    @observable errors = undefined;

    @observable values = {
        email: '',
        password: '',
    };

    @action setEmail(email) {
        this.values.email = email;
    }

    @action setPassword(password) {
        this.values.password = password;
    }

    @action reset() {
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