import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Slidbar/Slidbar";

const DashboardLayout = () => {
    return (
        <div className="relative min-h-screen md:flex">
            <div>
                <Sidebar></Sidebar>
            </div>
            <div className="flex-1 md:ml-64">
                <div className="p-5">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;