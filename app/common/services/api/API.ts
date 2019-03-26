import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./APIProblem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./APIConfig"
import { Account } from "../../data"
import * as Types from "./types"

enum Resource {
  Opportunities = 'opportunities',
  Useropportunities = 'user_opportunities',
  Stores = 'stores',
  Token = 'token',
  Account = 'account',
}

enum TokenParamName {
  Email = 'email',
  Password = 'password',
}

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  // @ts-ignore
  apisauce: ApisauceInstance
  
  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

//   private func updateAccessToken(with json: Any) -> Bool {
//   guard let jsonDict: [String: Any] = json as ?[String: Any], let token: String = jsonDict["token"] as ?String else { return false }

//   NetworkManager.manager.adapter = AccessTokenAdapter(accessToken: token)
//   NetworkManager.manager.retrier = AuthChecker()

//   SAMKeychain.setPassword(token, forService: KeychainConstants.serviceName, account: KeychainConstants.accountName)

//   return true
// }
    
//     private func updateDoneTutorial(with json: Any) {
//   guard let jsonDict: [String: Any] = json as ?[String: Any], let doneTutorial: Bool = jsonDict["completed_onboarding"] as ?Bool else { return }
//   Defaults[.doneTutorial] = doneTutorial
//   return
// }

  async login(email: string, password: string): Promise<Types.LoginResult> {
    const params = {
      [TokenParamName.Email]: email,
      [TokenParamName.Password]: password,
    }
 
    const response: ApiResponse<any>  = await this.apisauce.post(Resource.Token, params)
    console.log(response)
    if (!response.ok) {
      const problem = getLoginApiProblem(response)
      if (problem) return problem
    }

    const json = response.data

    return json
  }

  /**
   * Gets a single user by ID
   */

  async getAccount(email: string): Promise<Types.GetAccoutResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/account/${email}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const result: Account = {
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        stripeConnected: response.data.stripeConnected || false,
        completedOnboarding: response.data.completedOnboarding || false
      }
      return { kind: "ok", account: result }
    } catch {
      return { kind: "bad-data" }
    }
  }
}
