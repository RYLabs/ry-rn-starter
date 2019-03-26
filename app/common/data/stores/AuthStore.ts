import { observable, action } from 'mobx'
import moment from 'moment'
import { Api } from '../../services/api'
import { GenericApiErrorResponse, GenericApiError } from '../../services/api/APIProblem'
import { Account } from '../Account'

const defaultDob: Date | void = undefined

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
        firstName: '',
        lastName: '',
        dob: defaultDob,
    }

    constructor() {
        this.api.setup()
    }

    @action setEmail(email: string): void {
        this.values.email = email
    }

    @action setPassword(password: string): void {
        this.values.password = password
    }

    @action setFirstName(firstName: string): void {
        this.values.firstName = firstName
    }

    @action setLastName(lastName: string): void {
        this.values.lastName = lastName
    }

    @action setDob(dob: Date | void): void {
        this.values.dob = dob
    }

    @action reset() : void {
        this.values.email = ''
        this.values.password = ''
        this.values.firstName = ''
        this.values.lastName = ''
        this.values.dob = undefined
    }

    @action async signUp() {
        // TODO: Validation
        this.inProgress = true
        const { firstName, lastName, email, dob } = this.values
        const accountData: Account = {
            firstName,
            lastName,
            email,
            dob,
        }
        const response = await this.api.register(accountData)
        this.inProgress = false

        let errorTitle = 'Registeration Failed'
        let errorMessage = ''

       if(response.kind === 'ok') {
           return;
       } else {
           errorMessage = 'Unexpected error'
       }
       
       throw new GenericApiError(errorTitle, errorMessage)
    }
    
    @action async login() {
        // TODO: Validation
        this.inProgress = true
        const response = await this.api.login(this.values.email, this.values.password)
        this.inProgress = false

        let errorTitle = 'Login Failed'
        let errorMessage = ''

        if (response.kind === 'ok') {
            return response.account
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

    @action async logout() {
        try {
            this.inProgress = true
            await this.api.logout()
            this.inProgress = false
            return;
        } catch(e) {
            throw new GenericApiError('Logout Failed', 'Unexpected error')
        }
    }
}