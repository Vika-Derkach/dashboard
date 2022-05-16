import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import { ErrorBoundry, Header, Spinner } from "./components";
import {
  Home,
  StockPage,
  UserPage,
  Users,
  Vacancies,
  Vacancy,
  VacancyUpdate,
} from "./pages";

function App() {
  return (
    <div>
      <ErrorBoundry>
        <Header />
        {/* <Header />
        <ScrollTopArrow /> */}

        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/users/:id" children={<UserPage />} />
            <Route path="/users" component={Users} />
            <Route path="/vacancies" component={Vacancies} />
            <Route path="/vacancy/:id" children={<VacancyUpdate />} />
            <Route path="/vacancy" component={Vacancy} />
            <Route path="/stocks" component={StockPage} />
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
