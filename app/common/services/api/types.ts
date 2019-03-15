import { GeneralApiProblem } from "./APIProblem"
import { Account } from "../../data"

export type GetAccoutResult = { kind: "ok"; account: Account } | GeneralApiProblem
