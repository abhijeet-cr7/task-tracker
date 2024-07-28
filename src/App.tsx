import React, { useState } from "react";
import {Route, Routes} from "react-router-dom";
import DragAndDropDashboard from "./views/DragAndDropDashboard/DragAndDropDashboard";

const App = () => {
return <>
<Routes>
<Route path='/' element={<></>} />
<Route path='/dragDashbaord' element={<DragAndDropDashboard/>} />
</Routes>
</>
}

export default App;
