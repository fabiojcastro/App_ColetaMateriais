import { Route, BrowserRouter, Routes} from 'react-router-dom';
import React from 'react';

import Home from './pages/Home'
import CreatePoint from './pages/CreatePoint';

const Rounting = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path = "/" element={<Home />}/>
            </Routes>
        </BrowserRouter>
    );
}
export default Rounting;