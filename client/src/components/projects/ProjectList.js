import Project from './Project';
import ProjectOptions from './ProjectOptions';
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/userSlice";

export default function ProjectList(props) {
  const { items, deleteAction } = props;
  const loggedInUser = useSelector(selectUser);

  return (
    <ul>
      {items.map((project) => (
        <Project key={project._id} project={project}>
          {loggedInUser._id === project.userId && (
            <ProjectOptions
              userId={loggedInUser._id}
              projectId={project._id}
              projectTitle={project.projectTitle}
              deleteAction={deleteAction}
            />
          )}  
        </Project>
      ))}
    </ul>
  );
}
