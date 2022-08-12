import { Dispatch, SetStateAction } from 'react'
import type { Status } from 'types/status'

export type SetErrors = Dispatch<SetStateAction<string[]>>
export type SetStatus = Dispatch<SetStateAction<Status>>
