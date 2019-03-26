import { GeneralApiProblem, LoginApiProblem } from "./APIProblem"
import { Account } from "../../data"

export type LoginResult = { kind: "ok"; } | LoginApiProblem
export type GetAccoutResult = { kind: "ok"; account: Account } | GeneralApiProblem
