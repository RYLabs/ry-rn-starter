import { observable, action } from 'mobx';
import { ErrorMessageConfig } from '../../utils/message';
import { Api } from '../../services/api';
import { GenericApiErrorResponse, GenericApiError } from '../../services/api/APIProblem'
import { ErrorMessages } from '../../utils/constants';

enum AccountStatus {
    AccountLocked = 40101,
    AccountBanned = 40102,
}

export class AuthStore {
    api = new Api();

    @observable inProgress = false;
    @observable errors = [];
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
        const response = await this.api.login(this.values.email, this.values.password)
        let errorTitle = 'Login Failed'
        let errorMessage = ''

        if (response.kind === 'ok') {
            return Promise.resolve()
        } else if(response.kind === 'unauthorized') {
            const { user = false, code = -1 } = response.data as GenericApiErrorResponse

            if (code === AccountStatus.AccountLocked) {
                errorMessage = 'Your account is locked'
            } else if (code == AccountStatus.AccountBanned) {
                errorMessage = 'You’ve been banned'
            } else if(user) {
                errorMessage = 'Incorrect email or password'
            } else if(!user) {
                errorMessage = 'Account does not exist'
            } else {
                errorMessage = 'Unexpected error'
            }
        } else {
            errorMessage = 'Unexpected error'
        }

        throw new GenericApiError(errorTitle, errorMessage)
    }

    @action logout() {
        return Promise.resolve()
    }
}