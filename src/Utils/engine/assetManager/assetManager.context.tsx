import React, { createContext, MutableRefObject, ReactNode, useContext } from 'react';

import { Asset } from './models/asset';
import { useAssets } from './useAssets';

export interface AssetManagerContextObject {
    assets: Asset[];
    assetsMap: MutableRefObject<Map<string, Asset>>;
    addAsset: (file: File) => Promise<void>;
    getAsset: (assetId: string) => Promise<Asset>;
}

export const AssetManagerContext = createContext<AssetManagerContextObject>({} as AssetManagerContextObject);

export function useAssetManagerContext(): AssetManagerContextObject {
    return useContext(AssetManagerContext);
}

interface AssetManagerContextProviderProps {
    children: ReactNode | ReactNode[];
}

export function AssetManagerContextProvider({children}: AssetManagerContextProviderProps) {
    const {assets, assetsMap, addAsset, getAsset} = useAssets();

    const inputContextObject: AssetManagerContextObject = {
        assets,
        assetsMap,
        addAsset,
        getAsset,
    }

    return (
        <AssetManagerContext.Provider value={inputContextObject}>
            {children}
        </AssetManagerContext.Provider>
    )
}