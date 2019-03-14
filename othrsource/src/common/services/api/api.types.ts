import { GeneralApiProblem } from "./api-problem"
import { Account } from "../../data"

export type GetAccoutResult = { kind: "ok"; account: Account } | GeneralApiProblem
