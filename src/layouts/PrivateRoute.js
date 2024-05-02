import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./LoginPage";
import PrivateRoute from "./PrivateRoute";
import ScheduleForm from "../components/forms/ScheduleForm";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Use Firebase or your authentication logic to determine if the user is authenticated
    // Update the authenticated state accordingly
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/LoginPage" component={LoginPage} />
        {/* <PrivateRoute
          path="/ScheduleForm"
          component={ScheduleForm}
          authenticated={authenticated}
        /> */}
      </Switch>
    </Router>
  );
}

export default App;