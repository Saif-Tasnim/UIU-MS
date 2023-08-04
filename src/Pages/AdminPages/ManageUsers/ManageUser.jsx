import React from 'react';
import AdminHeader from '../../../Components/AdminHeader/AdminHeader';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Import the default react-tabs styles
import './ManageUser.css';
import StudentInfo from './StudentInfo/StudentInfo';
import FacultyInfo from './FacultyInfo/FacultyInfo';
import StaffInfo from './StaffInfo/StaffInfo';

const ManageUser = () => {
    return (
        <div>
            <AdminHeader></AdminHeader>

            <div className="mt-6 mx-1">
                <Tabs>
                    <TabList className="custom-tab-list mx-2">
                        <Tab className="custom-tab rounded-lg" selectedClassName="active-tab"> Student Info </Tab>
                        <Tab className="custom-tab rounded-lg" selectedClassName="active-tab"> Faculty Info </Tab>
                        <Tab className="custom-tab rounded-lg" selectedClassName="active-tab"> Staff Info </Tab>
                    </TabList>

                    <TabPanel>
                        <StudentInfo></StudentInfo>
                    </TabPanel>
                    <TabPanel>
                        <FacultyInfo></FacultyInfo>
                    </TabPanel>
                    <TabPanel>
                        <StaffInfo></StaffInfo>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default ManageUser;
