import React from 'react';
import UserCommonHeader from '../../../Components/UserCommonHeader/UserCommonHeader';
import busImg from '../../../assets/Common/bus-3.gif';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import StudentShuttle from './StudentShuttle/StudentShuttle';
import FacultyShuttle from '../FacultyShuttle/FacultyShuttle';

const UpdateShuttle = () => {
    return (
        <div>
            <UserCommonHeader> </UserCommonHeader>

            <div className='card max-w-full my-4 px-6 py-3 flex-row items-center justify-center gap-8'>
                <img src={busImg} className='w-20 rounded-xl' alt="" />
                <h1 className='text-lg font-bold'> Shuttle Update </h1>
            </div>

            <div className="mt-6 mx-1">
                <Tabs>
                    <TabList className="custom-tab-list mx-2">
                        <Tab className="custom-tab rounded-lg" selectedClassName="active-tab"> Update Student Shuttle </Tab>
                        <Tab className="custom-tab rounded-lg" selectedClassName="active-tab"> Update Faculty Shuttle </Tab>

                    </TabList>

                    <TabPanel>
                        <StudentShuttle></StudentShuttle>
                    </TabPanel>

                    <TabPanel>
                        <FacultyShuttle></FacultyShuttle>
                    </TabPanel>

                </Tabs>
            </div>
        </div>
    );
};

export default UpdateShuttle;