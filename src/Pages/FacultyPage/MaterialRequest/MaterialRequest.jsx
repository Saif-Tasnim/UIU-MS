import React from 'react';
import UserCommonHeader from '../../../Components/UserCommonHeader/UserCommonHeader';
import img from '../../../assets/Common/animation_lllyi0vi_small.gif'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Classroom from './Classroom/Classroom';
import Officeroom from './Officeroom/Officeroom';
import useFacultyCheck from '../../../hooks/useFacultyCheck';

const MaterialRequest = () => {
    const [faculty] = useFacultyCheck();

    return (
        <div>
            <UserCommonHeader></UserCommonHeader>

            <div className='card max-w-full my-4 px-6 py-3 flex-row items-center justify-center gap-8'>
                <img src={img} className='w-20 rounded-xl' alt="" />
                <h1 className='text-lg font-bold'> Materials Request </h1>
            </div>

            <div className="mt-6 mx-1">
                <Tabs>
                    <TabList className="custom-tab-list mx-2">
                        <Tab className="custom-tab rounded-lg" selectedClassName="active-tab"> For Class Room </Tab>
                        <Tab className="custom-tab rounded-lg" selectedClassName="active-tab"> For Office Room </Tab>
                       
                    </TabList>

                    <TabPanel>
                       <Classroom faculty={faculty}></Classroom>
                    </TabPanel>
                    
                    <TabPanel>
                        <Officeroom faculty={faculty}></Officeroom>
                    </TabPanel>
                  
                </Tabs>
            </div>



        </div>
    );
};

export default MaterialRequest;