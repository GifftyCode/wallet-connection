// import {
//     PropsWithChildren,
//     createContext,
//     useCallback,
//     useEffect,
//     useState,
//     useContext
//   } from "react"
  
//   // EIP-1193 Provider interface
//   interface EIP1193Provider {
//     request(args: { method: string; params?: unknown[] }): Promise<unknown>
//     on(eventName: string, listener: (args: unknown) => void): void
//     removeListener(eventName: string, listener: (args: unknown) => void): void
//   }
  
//   // Wallet interface extending EIP1193Provider
//   interface Wallet extends EIP1193Provider {
//     name: string
//     icon?: string
//   }
  
//   // Type alias for a record where the keys are wallet identifiers and the values are account addresses or null
// //   type SelectedAccountByWallet = Record<string, string | null>
  
//   // Context interface for the EIP-1193 provider
//   interface WalletProviderContext {
//     wallets: Record<string, Wallet> // A list of wallets
//     selectedWallet: Wallet | null // The selected wallet
//     selectedAccount: string | null // The selected account address
//     errorMessage: string | null // An error message
//     connectWallet: (walletId: string) => Promise<void> // Function to connect wallets
//     disconnectWallet: () => void // Function to disconnect wallets
//     clearError: () => void // Function to clear errors
//   }
  
//   // Create the context
//   const WalletContext = createContext<WalletProviderContext | undefined>(undefined)
  
//   // WalletProvider component
//   export const WalletProvider: React.FC<PropsWithChildren> = ({ children }) => {
//     // const [wallets, setWallets] = useState<Record<string, Wallet>>({})
//     const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null)
//     const [selectedAccount, setSelectedAccount] = useState<string | null>(null)
//     const [errorMessage, setErrorMessage] = useState<string | null>(null)
  
//     const connectWallet = useCallback(async (walletId: string) => {
//       const wallet = wallets[walletId]
//       if (!wallet) {
//         setErrorMessage("Wallet not found")
//         return
//       }
  
//       try {
//         const accounts = await wallet.request({ method: 'eth_requestAccounts' }) as string[]
//         if (accounts && accounts.length > 0) {
//           setSelectedWallet(wallet)
//           setSelectedAccount(accounts[0])
//         } else {
//           setErrorMessage("No accounts found")
//         }
//       } catch (error) {
//         setErrorMessage((error as Error).message || "Failed to connect wallet")
//       }
//     }, [wallets])
  
//     const disconnectWallet = useCallback(() => {
//       setSelectedWallet(null)
//       setSelectedAccount(null)
//     }, [])
  
//     const clearError = useCallback(() => {
//       setErrorMessage(null)
//     }, [])
  
//     useEffect(() => {
//       // Here you would implement the logic to detect and add available EIP-1193 providers
//       // This is a placeholder and should be replaced with actual provider detection logic
//       const detectProviders = () => {
//         // Example: 
//         // if (window.ethereum) {
//         //   setWallets(prevWallets => ({
//         //     ...prevWallets,
//         //     'metamask': {
//         //       name: 'MetaMask',
//         //       ...window.ethereum
//         //     }
//         //   }))
//         // }
//       }
  
//       detectProviders()
//     }, [])
  
//     const contextValue: WalletProviderContext = {
//       wallets,
//       selectedWallet,
//       selectedAccount,
//       errorMessage,
//       connectWallet,
//       disconnectWallet,
//       clearError,
//     }
  
//     return (
//       <WalletContext.Provider value={contextValue}>
//         {children}
//       </WalletContext.Provider>
//     )
//   }
  
//   export const useWallet = () => {
//     const context = useContext(WalletContext)
//     if (context === undefined) {
//       throw new Error('useWallet must be used within a WalletProvider')
//     }
//     return context
//   }