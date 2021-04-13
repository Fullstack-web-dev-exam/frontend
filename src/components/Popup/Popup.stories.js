// Popup.stories.js
import React from 'react';
import Popup from './Popup';
import '../../colors.css'
import '../../index.css'

//The default export metadata controls how Storybook lists your stories and provides information used by addons.
export default {
    title: 'Components/Popup',
    component: Popup,
    parameters: {
        controls: {
            sort: 'alpha'
        }
    },

    //👇 We can specify which controls get used by declaring a custom argType
    argTypes: {

    }
}

//👇 We create a “template” of how args map to rendering (default props if they exist)
const Template = args => <Popup {...args} />

//👇 Each story then reuses that template
export const EditUnpopulated = Template.bind({})
export const EditPopulated = Template.bind({})
export const DeletePopulated = Template.bind({})
export const DeleteUnpopulated = Template.bind({})

EditUnpopulated.args = {
    popupVariant: 'edit',
    user: {
        email: '',
        name: '',
        role: '',
        surname: ''
    }
}

EditPopulated.args = {
    popupVariant: 'edit',
    user: {
        email: 'johnsmith@example.com',
        name: 'John',
        role: 'gardener',
        surname: 'Smith'
    }
}

DeletePopulated.args = {
    popupVariant: 'delete',
    user: {
        email: 'johnsmith@example.com',
        name: 'John',
        role: 'gardener',
        surname: 'Smith'
    }
}

DeleteUnpopulated.args = {
    popupVariant: 'delete',
    user: {
        email: '',
        name: '',
        role: '',
        surname: ''
    }
}