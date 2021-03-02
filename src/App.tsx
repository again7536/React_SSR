import React from 'react';
import {Switch, Route} from 'react-router-dom'
import loadable from '@loadable/component';

const IntroPage = loadable(() => import('./pages/introPage'));
const MainPage = loadable(() => import('./pages/mainPage'));

export default function App () {
    return (
        <>
            <Switch>
                <Route path="/intro">
                    <IntroPage/>
                </Route>
                <Route path="/">
                    <MainPage/>
                </Route>
            </Switch>

        </>
    );
}