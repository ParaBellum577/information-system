import React from "react"
import { Router } from "@reach/router"
// import requireAuthorized from '../components/common/conteiner/requireAuthorized';
import '../i18next';
import IndexComponenet from "../components/homePage/index";
import SignUp from "../components/main/authentication/signUp";
import StakeHolderApp from '../components/main/authentication/stakeholderApplication/index';
import StakeHolders from '../components/main/stakeholders/index';
import Main from '../components/main/stakeholders/main';
import Equipment from '../components/equipment/index';
import StakeholdersRequests from '../components/stakeholdersRequests/index';
import Messenger from '../components/common/customMessanger/Messenger/index';
import EmailConfirm from "../components/main/authentication/emailConfirm";
import ProfileSettings from "../components/main/authentication/profileSettings/index";
import DevelopPage from "../components/main/developPage";
import UserCabinet from '../components/main/userCabinet/index';
import Projects from '../components/main/userCabinet/projects/index';
import ProjectSettings from '../components/main/userCabinet/projects/projectSettings';
import AboutTheProject from '../components/main/userCabinet/projects/aboutTheProject';
import ProjectTasks from '../components/main/userCabinet/projects/projectTasks/index';
import ActiveSprint from '../components/main/userCabinet/projects/activeSprint/index';
import TeamWork from '../components/main/userCabinet/teamWork/index';
import Laboratory from '../components/main/userCabinet/laboratory/laboratory';
import LaboratoryIndex from '../components/main/userCabinet/laboratory/index';
import UserConfirmation from '../components/main/userCabinet/userConfirmation/index';
import AppConfirmation from '../components/main/userCabinet/stakeholderAppConfirmation/index';
import Competence from '../components/main/userCabinet/competences/index';
import EquipmentTab from '../components/main/userCabinet/equipment/index';
// import DashboardPrivateRoute from '../components/common/dashboardPrivateRoute';
// import StakeholderPrivateRoute from '../components/common/stakeholderPrivateRoute';
import ErrorPage from '../components/404'

const App = () => {
  return (
    <Router>
      <IndexComponenet path="/" />
      <SignUp path="/sign-up" />
      <Equipment path="/equipment" />
      <StakeholdersRequests path="/stakeholders-requests"/>
      <StakeHolderApp path="/stakeholder-form/" />
      <EmailConfirm path="/email-confirm/:id/:secretCode" />
      <DevelopPage path="/develop-page/" />
      <ErrorPage path="/404/" />

      <StakeHolders path="/stakeholders/">
        <ProfileSettings path="/profile-settings/" />
        <Main path="/" />
      </StakeHolders>

      <UserCabinet path="/dashboard/">
        <ProfileSettings path="/profile-settings/" />
        <Messenger path="/messenger/" />
        <Projects path="/projects/" />
        <TeamWork path="/teams/"/>
        <UserConfirmation path="/approve-users/"/>
        <AppConfirmation path="/approve-app/"/>

        <ProjectSettings path="projects/:projectId/">
          <AboutTheProject path="/about/" />
          <ProjectTasks path="/tasks/" />
          <ActiveSprint path="/active-sprint/" />
        </ProjectSettings>

        <LaboratoryIndex path="/laboratory/" >
          <Laboratory path="/" />
          <Competence path="/competences/" />
          <EquipmentTab path="/equipment/" />
        </LaboratoryIndex>
        
      </UserCabinet> 
    </Router>
  )
}

export default App;