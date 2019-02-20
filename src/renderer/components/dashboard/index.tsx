import * as React from 'react';
import { DashboardContainer, SidebarContainer, MainContentContainer } from '../ui-elements/Dashboard';
import { Sidebar } from './Sidebar';
// import { Route, Switch } from 'react-router';
// import { dashboardRoutes } from "../../routes/appRoutes";
import Container from '../ui-elements/Container';
import MyLinks from '../../containers/dashboard/MyLinks';

export default 
    () =>
    <>
    <DashboardContainer>
        <SidebarContainer>
            <Sidebar />
        </SidebarContainer>
        <MainContentContainer>
            <Container margin="8em 10em 5em 20em" height="100%" minWidth="50%">
            <MyLinks />
         {/* <Switch>
             {(Object.keys(dashboardRoutes) as Array<keyof typeof dashboardRoutes>)
                    .map((key, idx) =>
                         <Route key={idx} exact path={dashboardRoutes[key].path} component={dashboardRoutes[key].component} />
                     )}
         </Switch>  */}
         </Container>
        </MainContentContainer>
    </DashboardContainer>
    </>


