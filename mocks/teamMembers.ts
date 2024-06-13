import man1 from '@assets/images/man1.png';
import girl from '@assets/images/girl.png';
import man2 from '@assets/images/man2.png';
import { TeamMember } from '../src/modules/aboutUsPage/interfaces';

const teamMembers: TeamMember[] = [
  {
    name: "Ruslan Trybukhouski",
    role: "Team Lead",
    contribution: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non risus maximus, cursus justo ut, porta erat. Nunc accumsan ante vitae felis fermentum, vel rutrum nisi cursus. Proin hendrerit, massa tincidunt pellentesque blandit, nunc ex dictum ipsum, nec elementum.",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non risus maximus, cursus justo ut, porta erat. Nunc accumsan ante vitae felis fermentum, vel rutrum nisi cursus. Proin hendrerit, massa tincidunt pellentesque blandit, nunc ex dictum ipsum, nec elementum.",
    github: "https://github.com/trybukhouski",
    photo: man2
  },
  {
    name: "Arina Talanova",
    role: "Developer",
    contribution: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non risus maximus, cursus justo ut, porta erat. Nunc accumsan ante vitae felis fermentum, vel rutrum nisi cursus. Proin hendrerit, massa tincidunt pellentesque blandit, nunc ex dictum ipsum, nec elementum.",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non risus maximus, cursus justo ut, porta erat. Nunc accumsan ante vitae felis fermentum, vel rutrum nisi cursus. Proin hendrerit, massa tincidunt pellentesque blandit, nunc ex dictum ipsum, nec elementum.",
    github: "https://github.com/arishasupernyasha",
    photo: girl
  },
  {
    name: "Dmitry Nikolayev",
    role: "Developer",
    contribution: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non risus maximus, cursus justo ut, porta erat. Nunc accumsan ante vitae felis fermentum, vel rutrum nisi cursus. Proin hendrerit, massa tincidunt pellentesque blandit, nunc ex dictum ipsum, nec elementum.",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non risus maximus, cursus justo ut, porta erat. Nunc accumsan ante vitae felis fermentum, vel rutrum nisi cursus. Proin hendrerit, massa tincidunt pellentesque blandit, nunc ex dictum ipsum, nec elementum.",
    github: "https://github.com/grammeri",
    photo: man1
  }
];

export { teamMembers };
