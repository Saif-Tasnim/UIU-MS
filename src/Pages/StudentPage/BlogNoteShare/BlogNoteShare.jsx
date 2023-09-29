import React from 'react';
import UserCommonHeader from '../../../Components/UserCommonHeader/UserCommonHeader';
import blogImg from '../../../assets/Common/blog.gif'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Blog from './Blog/Blog';
import Note from './Note/Note';

const BlogNoteShare = () => {
    return (
        <div>
            <UserCommonHeader> </UserCommonHeader>

            <div className='card max-w-full my-4 px-6 py-3 flex-row items-center justify-center gap-8'>
                <img src={blogImg} className='w-20 rounded-xl' alt="" />
                <h1 className='text-lg font-bold'> Blog & Note Share </h1>
            </div>

            <div className="mt-6 mx-1">
                <Tabs>
                    <TabList className="custom-tab-list mx-2">
                        <Tab className="custom-tab rounded-lg" selectedClassName="active-tab"> Blog Section </Tab>
                        <Tab className="custom-tab rounded-lg" selectedClassName="active-tab"> Notes Section </Tab>

                    </TabList>

                    <TabPanel>
                       <Blog></Blog>
                    </TabPanel>

                    <TabPanel>
                        <Note></Note>
                    </TabPanel>

                </Tabs>
            </div>

        </div>
    );
};

export default BlogNoteShare;