import { readBoolean, readString } from './helpers'

export interface TerminalConfig {
  enabled: boolean
  displayStr: string
}

export const loadTerminalConfig = (): TerminalConfig => {
  return {
    enabled: readBoolean('TERMINAL_ENABLED', false),
    displayStr: readString('TERMINAL_DISPLAY', 'playground')
  }
}
