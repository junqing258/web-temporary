import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import loadable from '@loadable/component';

// import BasicLayout from '@/components/BasicLayout';

const Home = dynamicImport('@/pages/home');
const Apply = dynamicImport('@/pages/apply');
const Bonus = dynamicImport('@/pages/bonus');

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/apply" exact component={Apply} />
      <Route path="/bonus" exact component={Bonus} />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default Routes;
