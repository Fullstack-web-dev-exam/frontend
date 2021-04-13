// Button.stories.js
import React from 'react';
import UserFeedbackCard from './UserFeedbackCard';
import '../../colors.css'
import '../../index.css'

export default {
  title: 'Components/UserFeedbackCard',
  component: UserFeedbackCard,
}

export const Success = () => <UserFeedbackCard variant="success" feedbackText="This is Success feedback"/>

export const Error = () => <UserFeedbackCard variant="error" feedbackText="This is error feedback"/>