// UserListItem.stories.js
import React from 'react';
import '../../colors.css'
import '../../index.css'
import UserListItem from './UserListItem';



//The default export metadata controls how Storybook lists your stories and provides information used by addons.
export default {
    title: 'Components/UserListItem',
    component: UserListItem,
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
const Template = args => <UserListItem {...args} />

//👇 Each story then reuses that template
export const Unpopulated = Template.bind({})
export const Populated = Template.bind({})


Unpopulated.args = {
    user: {
        email: '',
        name: '',
        role: '',
        surname: ''
    },
}

Populated.args = {
    user: {
        email: 'johnsmith@example.com',
        name: 'John',
        role: 'gardener',
        surname: 'Smith'
    },
}