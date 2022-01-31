import React from "react";
import loadable from "@loadable/component";
import {Switch, Route, Redirect} from  'react-router-dom';
const LogIn =loadable(()=> import('@pages/LogIn'));
const SignUp =loadable(()=> import( '@pages/SignUp'));

const App=()=>{

    return (
        <Switch> //세개 중에 하나의 컴포넌트만 보이게 됨.
            <Redirect exact path="/" to="/login"/>
            <Route path="/login" component={LogIn} />
            <Route path="/signup" component={SignUp} />
        </Switch>
    );
};

export default App;