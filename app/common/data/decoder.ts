import { Account } from "./Account";

export function decodeAccount(json: any): Account {
    return {
        firstName: json.first_name,
        lastName: json.last_name,
        email: json.email,
        stripeConnected: json.stripeConnected || false,
        completedOnboarding: json.completedOnboarding || false
    } 
}

// account_status: "account_valid"
// account_status_message: null
// admin_role: false
// approved_brands: null
// brand_id: null
// brand_payment_mode_id: null
// completed_onboarding: true
// created_at: "2018-04-25T18:58:56.680Z"
// date_of_birth: "2000-04-25T00:00:00.000Z"
// email: "reviewer@apple.com"
// first_name: "Apple"
// id: 1005
// last_name: "Reviewer"
// max_opps: 1
// rating: null
// stripe_account: null
// stripe_connect_state: "zaxj5318nt"
// token: "cd779458cb664eca96a476c57014bce5"
// updated_at: "2019-03-19T03:04:15.784Z"