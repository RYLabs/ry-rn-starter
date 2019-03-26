import { GeneralApiProblem } from "./APIProblem"
import { Account } from "../../data"

export type LoginResult = { kind: "ok"; } | GeneralApiProblem
export type GetAccoutResult = { kind: "ok"; account: Account } | GeneralApiProblem
