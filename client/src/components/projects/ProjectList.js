import Project from './Project';

export default function ProjectList(props) {
  const { items: projects } = props;

  return (
      <ul>
          {projects.map((project) => (
            <Project key={project._id} project={project} />
          ))}
      </ul>
  );
}
