/// <reference types="vite/client" />

// Core EIP-1193 Provider interface
interface EIP1193Provider {
    request(args: RequestArguments): Promise<unknown>
    on(eventName: string, listener: (args: unknown) => void): void
    removeListener(eventName: string, listener: (args: unknown) => void): void
  }
  
  // Structure for the request method arguments
  interface RequestArguments {
    method: string
    params?: unknown[] | object
  }
  
  // Legacy methods that might be present in some implementations
  interface LegacyProviderMethods {
    send?: (
      request: { method: string; params?: Array<unknown> },
      callback: (error: Error | null, response: unknown) => void
    ) => void
    sendAsync?: (
      request: { method: string; params?: Array<unknown> },
      callback: (error: Error | null, response: unknown) => void
    ) => void
  }
  
  // Additional properties that might be present in some wallet implementations
  interface WalletSpecificProperties {
    isStatus?: boolean
    host?: string
    path?: string
  }
  
  // Combine all interfaces for a complete EIP-1193 provider
  type CompleteEIP1193Provider = EIP1193Provider & 
    Partial<LegacyProviderMethods> & 
    Partial<WalletSpecificProperties>
  
  // An error object with optional properties, commonly encountered when handling eth_requestAccounts errors
  interface EIP1193Error extends Error {
    code: number
    data?: unknown
  }