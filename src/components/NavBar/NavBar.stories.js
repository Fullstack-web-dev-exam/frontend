// NavBar.stories.js
import React from 'react';
import NavBar from './NavBar';
import '../../colors.css'
import '../../index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../helpers/Auth'

//The default export metadata controls how Storybook lists your stories and provides information used by addons.
export default {
    title: 'Components/NavBar',
    component: NavBar,
    parameters: {
        controls: {
            sort: 'alpha'
        }
    },
    decorators: [story =>
        <AuthProvider>
            <Router>
                {story()}
            </Router>
        </AuthProvider>],

    //👇 We can specify which controls get used by declaring a custom argType
    argTypes: {
       /*  onClick: { action: 'clicked' } */
    }
}

//👇 We create a “template” of how args map to rendering
const Template = args => <NavBar {...args} />

//👇 Each story then reuses that template
export const Primary = Template.bind({})


Primary.args = {}