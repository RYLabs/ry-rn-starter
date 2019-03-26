import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./APIProblem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./APIConfig"
import { Account } from "../../data"
import * as Types from "./types"
import { save, clear, saveString } from "../../utils/storage";
import { StoragesKeys, KeychainConstants } from "../../utils/constants";
import { setPassword, deletePassword } from "../../utils/keychain";
import { decodeAccount } from "../../data/decoder";

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

  async updateAccessToken(username: string, json: any): Promise<boolean> {
    const token: string = json.token
    if(!token) return false

    await setPassword(username, token, { service: KeychainConstants.ServiceName })
    return true
  }

  async updateDoneTutorial(json: any): Promise<void> {
    const doneTutorial = json.completed_onboarding
    if(!doneTutorial) return;

    await save(StoragesKeys.DoneTutorial, doneTutorial)

    return;
  }

  async login(email: string, password: string): Promise<Types.GetAccoutResult> {
    const params = {
      [TokenParamName.Email]: email,
      [TokenParamName.Password]: password,
    }
 
    const response: ApiResponse<any>  = await this.apisauce.post(Resource.Token, params)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const json = response.data

      // await this.updateDoneTutorial(json)
      // await saveString(StoragesKeys.Email, email)
      // await this.updateAccessToken(email, json)

      return { kind: 'ok', account: decodeAccount(json) }
    } catch {
      return { kind: "bad-data" }
    }
    
  }

  async logout() {
    await deletePassword({ service: KeychainConstants.ServiceName })
    await clear()
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
      const json = response.data

      return { kind: "ok", account: decodeAccount(json) }
    } catch {
      return { kind: "bad-data" }
    }
  }
}
