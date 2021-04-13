// Button.stories.js
import React from 'react';
import Button from './Button';
import '../../colors.css'
import '../../index.css' 

//The default export metadata controls how Storybook lists your stories and provides information used by addons.
export default {
    title: 'Components/Button',
    component: Button,
    args: {
        disabled: '',
        isActive: '',
        label: "Button – click me for TypeError",
        size: 'full',
        type: ''
    },
    argTypes: {
        "label": { control: 'text' },
        onClick: { action: 'clicked' },
        variant: {
            control: {
                type: 'radio',
                options: ['primary', 'secondary', 'secondary-outlined', 'danger']
            }
        }
    }
}

//👇 We create a “template” of how args map to rendering
const Template = args => <Button {...args} />

//👇 Each story then reuses that template
export const PrimaryArgs = Template.bind({})
PrimaryArgs.args = {
    variant: 'primary',
    size: 'full'
}

export const SecondaryArgs = Template.bind({})
SecondaryArgs.args = {
    variant: 'secondary',
    label: 'This is a secondary button'
}