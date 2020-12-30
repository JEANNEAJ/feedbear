import { React } from "react";
import FeedbackList from "../feedbackList/FeedbackList";
import FeedbackRequestForm from "../forms/FeedbackRequestForm";

const Dashboard = () => {
  return (
    <div>
      <FeedbackRequestForm buttonText="Submit" />

      {/* //       <FeedbackRequestForm buttonText='Submit' /> */}

      <FeedbackList />
    </div>
  );
};

export default Dashboard;
