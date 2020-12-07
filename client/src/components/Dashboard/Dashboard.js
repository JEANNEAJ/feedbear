import { React } from "react";
import FeedbackList from "../../features/feedbackList/FeedbackList";
import FeedbackRequestForm from "../../features/feedbackRequest/FeedbackRequestForm";

import Form from '../form/Form';

const Dashboard = () => {
  return (
    <div>
      <Form type="FeedbackRequestForm" />
      <FeedbackList />
    </div>
  );
};

export default Dashboard;
