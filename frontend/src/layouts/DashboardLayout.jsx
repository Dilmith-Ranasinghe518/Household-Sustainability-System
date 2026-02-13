import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const DashboardLayout = ({ isAdmin = false }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex flex-col min-h-[calc(100vh-88px)] bg-off-white">
            <Sidebar
                isAdmin={isAdmin}
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
            />
            {/* 
                Content Wrapper
                - Moves with sidebar width changes
                - Flex col to push footer to bottom 
            */}
            <div
                className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'md:ml-[260px]' : 'md:ml-[80px]'
                    } ml-[70px]`}
            >
                <main className="flex-grow p-6 md:p-10">
                    <Outlet context={{ isSidebarOpen }} />
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default DashboardLayout;
