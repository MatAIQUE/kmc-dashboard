import MainContainer from "../../components/ui/main-container";
import Nav from "../../components/ui/nav";
import React, { PureComponent } from "react";

const Dashboard = () => {
  return (
    <>
      {/* <div classNameName="flex flex-col md:flex-row md:mx-0">
        <Nav/>
        <MainContainer/>
    </div> */}
      <Nav />

      <MainContainer />
    </>
  );
};
export default Dashboard;
