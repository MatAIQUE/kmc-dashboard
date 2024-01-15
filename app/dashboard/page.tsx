import MainContainer from "../../components/ui/main-container"
import Nav from "../../components/ui/nav"

const Dashboard = () => {
 return (
    <>
    <div className="flex flex-col md:flex-row md:mx-0">
        <Nav/>
        <MainContainer/>
    </div>
    </>
 )   
}
export default Dashboard