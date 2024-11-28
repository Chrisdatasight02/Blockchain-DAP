import {useLocalStorage} from "@solana/wallet-adapter-react";
import {createContext, FC, ReactNode, useContext} from "react";

export interface NetworkConfigurationstate{
    networkConfiguration: String;
    setNetworkConfiguration(networkConfiguration: string): void;

}

export const NetworkConfigurationContext = createContext<NetworkConfigurationstate>({} as 
    NetworkConfigurationstate);
    export function useNetworkConfiguration(): NetworkConfigurationstate {
        return useContext(NetworkConfigurationContext);

    }


    export const NetworkConfigurationProvider: FC<{children: ReactNode}> = ({
        children,

    }) => {
        const [networkConfiguration, setNetworkConfiguration] = useLocalStorage(
            "network",
            "devnet"
        );
        return (
            <NetworkConfigurationContext.Provider value={{networkConfiguration, setNetworkConfiguration}}>
                {children}
            </NetworkConfigurationContext.Provider>
        );
    };