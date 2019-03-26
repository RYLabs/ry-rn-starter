import { observable, action } from 'mobx';
import { ErrorMessageConfig } from '../../utils/message';
import { Api } from '../../services/api';

export class AuthStore {
    api = new Api();

    @observable inProgress = false;
    @observable errors: Array<ErrorMessageConfig> = [];
    @observable values = {
        email: '',
        password: '',
    };

    constructor() {
        this.api.setup()
    }

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
        const result = await this.api.login(this.values.email, this.values.password)
        // this.errors = undefined;

        return Promise.resolve()
    }

    @action logout() {
        return Promise.resolve()
    }
}