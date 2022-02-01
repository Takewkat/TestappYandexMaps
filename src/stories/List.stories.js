import React from 'react';

import List from '../components/List/List';
import data from './data';

export default {
    title: 'List',
    component: List,
    argTypes: { deletePoint: { action: 'deleted' } }
};

export const ExampleList = (args) => {

    return (   
        <>
            <List
            points={data}
            deletePoint = {deletePoint}
            {...args}
            />
        </>
    )
};

export const deletePoint = ExampleList.bind({});
deletePoint.args = {
    data: {},
};
