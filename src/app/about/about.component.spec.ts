import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  // Positive Scenarios
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a div with class "container"', () => {
    const divElement = element.querySelector('.container');
    expect(divElement).toBeDefined();
  });

  it('should have an h1 with text "Welcome"', () => {
    const h1Element = element.querySelector('h1');
    const text = 'Welcome!';
    expect(h1Element.textContent).toBe(text);
  });

  it('should have a p tag with some text', () => {
    const text = 'Welcome to the Angular Testing Course';
    const pElement = element.querySelector('p');
    expect(pElement.textContent).toBe(text);
  });

  it('should have an img tag', () => {
    const imgElement = element.querySelector('img');
    const src = 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-testing-small.png';
    expect(imgElement.src).toBe(src);
    expect(imgElement.alt).toBe('');
  });

  // Negative Scenarios
  it('should not have a div with class "not-container"', () => {
    const divElement = element.querySelector('.not-container');
    expect(divElement).toBeNull();
  });

  it('should not have an h1 with text "Goodbye"', () => {
    const h1Elements = element.querySelectorAll('h1');
    let isGoodbyePresent = false;
    h1Elements.forEach(elem => { if ( elem.textContent === 'Goodbye' ) isGoodbyePresent = true; });
    expect(isGoodbyePresent).toBeFalse();
  });

  it('should not have a p tag with text "This text does not exist"', () => {
    const pElements = element.querySelectorAll('p');
    let isTextPresent = false;
    pElements.forEach(elem => { if ( elem.textContent === 'This text does not exist' ) isTextPresent = true; });
    expect(isTextPresent).toBeFalse();
  });

  it('should not have an span tag', () => {
    const spanElement = element.querySelector('span');
    expect(spanElement).not.toBeTruthy();
  });
});
