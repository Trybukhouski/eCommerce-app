import man1 from '@assets/images/man1.png';
import girl from '@assets/images/girl.png';
import man2 from '@assets/images/man2.png';
import { TeamMember } from '../src/modules/aboutUsPage/interfaces';

const teamMembers: TeamMember[] = [
  {
    name: "Ruslan Trybukhouski",
    role: "Team Lead",
    contribution: "Our tech wizard and fearless leader, tackled the toughest parts of the project with ease, including but not limited to routing and the catalog page with tricky filtering. We suspect Ruslan worked 24/7 and never slept, otherwise how could he complete his complex and intricate tasks and on top of that, do the design in Figma for the project?",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non risus maximus, cursus justo ut, porta erat. Nunc accumsan ante vitae felis fermentum, vel rutrum nisi cursus. Proin hendrerit, massa tincidunt pellentesque blandit, nunc ex dictum ipsum, nec elementum.",
    github: "https://github.com/trybukhouski",
    photo: man2
  },
  {
    name: "Arina Talanova",
    role: "Developer",
    contribution: "The power behind the throne meticulously reviewed every task, making critical adjustments and pushing the team forward with her keen eye for detail. She successfully implemented login and registration forms, including validation, billing, and residential addresses with editing capabilities, and the cart page. She also helped others in every aspect of the project.",
    bio: "Born in Kurgan, Russia, where I continue to reside. During my school years, I followed Tvardovsky's sentiment: “No, mates, I am not proud, and comparing the world's best rewards, I will simply say aloud: a medal's better than the Victoria Cross.” And so, I graduated high school with a gold medal. Before embarking on my journey in frontend development, I created a couple of games for jams, gaining valuable experience. No medals this time, but worry not—they are all ahead, as I'm seriously determined to bring creativity and innovation to the digital world as a frontend developer.",
    github: "https://github.com/arishasupernyasha",
    photo: girl
  },
  {
    name: "Dmitry Nikolayev",
    role: "Developer",
    contribution: "Our adventurous coder, wasn't afraid to get his hands dirty with monotonous routine tasks. Often, he received assignments not fully understanding what was expected of him, but somehow, miraculously, he managed to complete them, often surprising himself with how everything turned into a functional application. He was responsible for login and registration methods and detailed product page and about us page.",
    bio: "Born in Penza, spent school years in Severodvinsk. Developed oil fields for many years in the northern regions of the Arkhangelsk region, Siberia, and Kazakhstan, and ended up at one of the world's largest oil companies, Exxon, in Houston, Texas. Sacrificed a career in oil field development for the greener pastures of frontend development.",
    github: "https://github.com/grammeri",
    photo: man1
  }
];

export { teamMembers };
