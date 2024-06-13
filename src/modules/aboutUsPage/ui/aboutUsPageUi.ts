import { TeamMember } from '@root/modules/aboutUsPage/interfaces';
import footerImage from '@assets/images/rss-logo.jpg';
import * as style from './style.module.scss';

class AboutUsPageUI {
  public elem: HTMLElement;

  constructor(teamMembers: TeamMember[]) {
    const section = this.createSectionWithHeader('Final Task Team');

    const cardsContainer = document.createElement('div');
    cardsContainer.className = style.cardsContainer;
    teamMembers.forEach((member) => this.addMemberCard(member, cardsContainer));
    section.appendChild(cardsContainer);

    const footer = this.createFooter();
    section.appendChild(footer);

    this.elem = section;
  }

  createSectionWithHeader(title: string): HTMLElement {
    const section = document.createElement('section');
    section.className = style.aboutUsSection;
    const header = this.createHeader(title);
    section.appendChild(header);
    return section;
  }

  createHeader(title: string): HTMLElement {
    const header = document.createElement('h1');
    header.textContent = title;
    header.style.textAlign = 'center';
    header.className = style.title;
    return header;
  }

  addMemberCard(member: TeamMember, container: HTMLElement): void {
    const memberContainer = document.createElement('div');
    memberContainer.className = style.memberContainer;

    memberContainer.appendChild(this.createPhotoDiv(member));
    memberContainer.appendChild(this.createInfoDiv(member));

    container.appendChild(memberContainer);
  }

  createPhotoDiv(member: TeamMember): HTMLElement {
    const photoDiv = document.createElement('div');
    const image = document.createElement('img');
    image.src = member.photo;
    image.alt = `Photo of ${member.name}`;
    image.className = style.memberPhoto;
    photoDiv.appendChild(image);
    return photoDiv;
  }

  createInfoDiv(member: TeamMember): HTMLElement {
    const infoDiv = document.createElement('div');
    const nameTitle = document.createElement('h2');
    nameTitle.textContent = `${member.name} - ${member.role}`;
    const bio = document.createElement('p');
    bio.textContent = member.bio;
    const contribution = document.createElement('p');
    contribution.innerHTML = `<strong>Contribution:</strong> ${member.contribution}`;
    const githubLink = document.createElement('a');
    githubLink.href = member.github;
    githubLink.textContent = 'GitHub Profile';
    githubLink.target = '_blank';
    githubLink.className = 'githubLink';

    githubLink.style.textDecoration = 'none';
    githubLink.style.color = 'var(--orange-300)';
    githubLink.style.fontWeight = 'bold';

    githubLink.addEventListener('mouseover', () => {
      githubLink.style.textDecoration = 'underline';
      githubLink.style.color = 'var(--orange-500)';
    });

    githubLink.addEventListener('mouseout', () => {
      githubLink.style.textDecoration = 'none';
      githubLink.style.color = 'var(--orange-400)';
    });

    infoDiv.append(nameTitle, bio, contribution, githubLink);
    return infoDiv;
  }

  createFooter(): HTMLElement {
    const footer = document.createElement('footer');
    footer.className = style.footer;

    const footerLink = document.createElement('a');
    footerLink.href = 'https://rs.school/';
    footerLink.target = '_blank';

    const footerImg = document.createElement('img');
    footerImg.src = <string>(<unknown>footerImage);
    footerImg.alt = 'RSSchool logo';
    footerImg.className = style.footerImage;

    footerLink.appendChild(footerImg);

    footer.appendChild(footerLink);

    return footer;
  }
}

export { AboutUsPageUI };
