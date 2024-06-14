import { TeamMember } from '@root/modules/aboutUsPage/interfaces';
import footerImage from '@assets/images/rss-logo.jpg';
import mentorPhoto from '@assets/images/pasha.jpg';
import { Modal } from '@root/shared/utils/modal';
import * as style from './style.module.scss';

class AboutUsPageUI {
  public elem: HTMLElement;

  private modal: Modal;

  constructor(teamMembers: TeamMember[]) {
    this.modal = new Modal();

    const section = this.createSectionWithHeader('Final Task Team');

    const descriptionDiv = this.createDescriptionDiv();
    section.appendChild(descriptionDiv);

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

  createDescriptionDiv(): HTMLElement {
    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = style.descriptionDiv;

    const handWrittenText = document.createElement('p');
    handWrittenText.textContent = `Meet Our Dev Dream Team and the Secrets to Our Non-Stop Success and read everything attentively if you want to know the secret of our success!`;
    handWrittenText.classList.add(style.handwrittenText);

    const hiddenTextDiv = this.createHiddenTextDiv();
    descriptionDiv.appendChild(handWrittenText);
    descriptionDiv.appendChild(hiddenTextDiv);

    const showLessLink = this.createToggleLink('Show Less', style.showLessLink);
    const showMoreLink = this.createToggleLink('Show More', style.showMoreLink);

    showMoreLink.addEventListener('click', (e) => {
      e.preventDefault();
      hiddenTextDiv.style.display = 'block';
      showMoreLink.style.display = 'none';
      showLessLink.style.display = 'inline';
    });

    showLessLink.addEventListener('click', (e) => {
      e.preventDefault();
      hiddenTextDiv.style.display = 'none';
      showLessLink.style.display = 'none';
      showMoreLink.style.display = 'inline';
    });

    descriptionDiv.appendChild(showLessLink);
    descriptionDiv.appendChild(showMoreLink);

    return descriptionDiv;
  }

  createHiddenTextDiv(): HTMLElement {
    const hiddenTextDiv = document.createElement('div');
    hiddenTextDiv.className = style.hiddenText;

    const hiddenText = document.createElement('p');
    hiddenText.innerHTML = `
        Introducing the dynamic trio behind our stellar project: Arina Talanova from Kurgan, Ruslan Trybukhouski (our fearless team lead) from Minsk, Dmitry Nikolayev from Houston. Detailed information about each team member is presented below.
        Thanks to the magic of different time zones, our project never slept! As one coder signed off, another jumped in, making sure our code was always evolving.
        Let's not forget <a href="#" class="${style.mentorLink}">Pasha</a>, our mentor. Despite his desperate attempts to teach us the ways of OOP, he eventually gave up, got married, and broke free to Cuba. But even from afar, he kept an eye on our progress, cheering us on.
        Together, this eclectic mix of talent and time zones created a seamless workflow, ensuring that our project was always in motion. We laughed, we coded, and we made magic happen!
    `;

    hiddenTextDiv.appendChild(hiddenText);

    const mentorLink = hiddenTextDiv.querySelector(`.${style.mentorLink}`) as HTMLElement;
    mentorLink.addEventListener('click', (e) => {
      e.preventDefault();
      this.openMentorModal();
    });

    return hiddenTextDiv;
  }

  createToggleLink(text: string, className: string): HTMLAnchorElement {
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = text;
    link.className = className;
    return link;
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

  private openMentorModal(): void {
    const modalContent = document.createElement('div');
    const mentorImg = document.createElement('img');
    mentorImg.src = mentorPhoto;
    mentorImg.alt = 'Pasha, our mentor';
    mentorImg.className = style.mentorImage;
    modalContent.appendChild(mentorImg);

    this.modal.setContent(modalContent);
    this.modal.openModal();
  }
}

export { AboutUsPageUI };
