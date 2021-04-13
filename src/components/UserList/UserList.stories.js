// UserList.stories.js
import React from 'react';
import UserList from './UserList';
import '../../colors.css'
import '../../index.css'

//The default export metadata controls how Storybook lists your stories and provides information used by addons.
export default {
    title: 'Components/UserList',
    component: UserList,
    parameters: {
        controls: {
            sort: 'alpha'
        }
    },

    //👇 We can specify which controls get used by declaring a custom argType
    argTypes: {
        
    }
}

//👇 We create a “template” of how args map to rendering
const Template = args => <UserList {...args} />

//👇 Each story then reuses that template
export const Primary = Template.bind({})


Primary.args = {
    users:[{
        email: 'johnsmith@example.com',
        name: 'John',
        role: 'manager',
        surname: 'Smith'
    },
    {
        email: 'Janesmith@example.com',
        name: 'Jane',
        role: 'gardener',
        surname: 'Smith'
    }]
}

