import * as ReactNativeKeychain from "react-native-keychain"

/**
 * Saves some credentials securely.
 *
 * @param username The username
 * @param password The password
 * @param options The credentials options
 * @param server The server these creds are for.
 */
export async function setPassword(username: string, password: string, options?: { service?: string }, server?: string) {
  if (server) {
    await ReactNativeKeychain.setInternetCredentials(server, username, password)
    return true
  } else {
    return ReactNativeKeychain.setGenericPassword(username, password, options)
  }
}

/**
 * Loads credentials that were already saved.
 *
 * @param options The credentials options
 * @param server The server that these creds are for
 */
export async function getPassword(options?: { service?: string }, server?: string) {
  if (server) {
    const creds = await ReactNativeKeychain.getInternetCredentials(server)
    return {
      username: creds.username,
      password: creds.password,
      server,
    }
  } else {
    const creds = await ReactNativeKeychain.getGenericPassword(options)
    if (typeof creds === "object") {
      return {
        username: creds.username,
        password: creds.password,
        server: null,
      }
    } else {
      return {
        username: null,
        password: null,
        server: null,
      }
    }
  }
}

/**
 * Resets any existing credentials for the given server.
 *
 * @param options The credentials options
 * @param server The server which has these creds
 */
export async function deletePassword(options?: { service?: string }, server?: string) {
  if (server) {
    await ReactNativeKeychain.resetInternetCredentials(server)
    return true
  } else {
    const result = await ReactNativeKeychain.resetGenericPassword(options)
    return result
  }
}
