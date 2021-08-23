// Environment Vars - Errors
export const throwEnvVariableRequiredError = (varName: string, value?: string): void => {
  if (!value) {
    throw new Error(`Environment Variable is missing: ${varName}`)
  }
}

// Environment Vars - Helper
export const hasEnvVar = (envVarName: string, required: boolean): boolean => {
  const isDeclared = process.env[envVarName] === undefined ? false : true
  if (required && !isDeclared) {
    throw Error(`config: EnvVar "${envVarName}" is required`)
  }
  return isDeclared
}

export const readString = (envVarName: string, defaultValue?: string): string => {
  const declaredValue = process.env[envVarName]
  if (typeof declaredValue === 'string') {
    return declaredValue
  }
  if (typeof defaultValue === 'string') {
    return defaultValue
  }
  throw TypeError(`config: EnvVar "${envVarName}" should be a string`)
}

export const readBoolean = (envVarName: string, defaultValue?: boolean): boolean => {
  if (!hasEnvVar(envVarName, typeof defaultValue !== 'boolean')) {
    return defaultValue as boolean
  }
  const declaredValue = readString(envVarName).toLowerCase()
  if (declaredValue === 'true') {
    return true
  }
  if (declaredValue === 'false') {
    return false
  }
  throw Error(`config: EnvVar "${envVarName}:${declaredValue}" should be "TRUE" or "FALSE"`)
}

export const readInteger = (envVarName: string, defaultValue?: number): number => {
  if (!hasEnvVar(envVarName, typeof defaultValue !== 'number')) {
    return defaultValue as number
  }
  let declaredValue
  try {
    declaredValue = Number(readString(envVarName))
    if (!Number.isSafeInteger(declaredValue)) {
      throw Error(`config: EnvVar "${envVarName}:${declaredValue}" should be an integer`)
    }
    return declaredValue
  } catch (_err) {
    throw Error(`config: EnvVar "${envVarName}:${declaredValue}" should be a integer`)
  }
}
