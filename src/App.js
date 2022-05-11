import React, { Suspense } from "react";
import { Link, Route, Switch } from "react-router-dom";
import "./App.css";
import { ErrorBoundry, Spinner } from "./components";
import { Home, Vacancies } from "./pages";

function App() {
  return (
    <div>
      <ErrorBoundry>
        {/* <Header />
        <ScrollTopArrow /> */}
        <Link to="/vacancies">Vacancies</Link>
        <Link to="/">Home</Link>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/vacancies" component={Vacancies} />

            <Route
              render={() => (
                <div className="mistake-page">
                  <img
                    src="https://blog.thomasnet.com/hs-fs/hubfs/shutterstock_774749455.jpg?width=600&name=shutterstock_774749455.jpg"
                    alt="404"
                  />{" "}
                </div>
              )}
            />
          </Switch>
        </Suspense>
      </ErrorBoundry>
    </div>
  );
}

export default App;
