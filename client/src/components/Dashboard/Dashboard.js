import { React } from "react";
import FeedbackList from "../../features/feedbackList/FeedbackList";
import FeedbackRequestForm from "../../features/feedbackRequest/FeedbackRequestForm";

const Dashboard = () => {
  return (
    <div>
      <FeedbackRequestForm buttonText='Submit' />
      <FeedbackList />
    </div>
  );
};

export default Dashboard;
