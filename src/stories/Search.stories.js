import React from 'react';

import Search from '../components/Search/Search';
import data from './data';

export default {
    title: 'Search',
    component: Search,
    argTypes: { addPoint: { action: 'added' } }
};

export const ExampleSearch = (args) => {

    return (   
        <>
            <Search
            points={data}
            ymaps={data}
            addPoint = {addPoint}
            {...args}
            />
        </>
    )
};

export const addPoint = ExampleSearch.bind({});
addPoint.args = {
    data: {},
};
