import { JSXElementConstructor, ReactElement } from 'react';

export interface Route {
    path: string;
    component: ReactElement<any, string | JSXElementConstructor<any>>;
}