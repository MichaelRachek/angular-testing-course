import { CoursesService } from './courses.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { COURSES, findLessonsForCourse } from '../../../../server/db-data';

describe('CoursesService', () => {
  let service: CoursesService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService]
    });

    service = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should retrieve all courses', () => {
    service.findAllCourses().subscribe(resp => {
      expect(resp).withContext('No Courses returned');
      expect(resp.length).withContext('incorrect number of courses').toEqual(12);
      const course = resp.find(item => item.id === 12);
      expect(course.titles.description).toBe('Angular Testing Course');
    });

    const req = httpTestingController.expectOne('/api/courses');
    expect(req.request.method).toEqual('GET');
    req.flush({payload: Object.values(COURSES)});
    httpTestingController.verify();
  });

  it('should find course by id', () => {
    const courseId = 10;
    service.findCourseById(courseId).subscribe(resp => {
      expect(resp).withContext('No course returned');
      expect(resp).toBeTruthy();
      expect(resp.id).toBe(10);
      expect(resp.titles.description).toBe('Rxjs and Reactive Patterns Angular Architecture Course');
    });
    const req = httpTestingController.expectOne(`/api/courses/${courseId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(COURSES[courseId]);
    httpTestingController.verify();
  });

  it('should save course', () => {
    const courseId = 5;
    const changes = {titles: {description: 'New Description'}};
    service.saveCourse(courseId, changes).subscribe(resp => {
      expect(resp).withContext('No course returned');
      expect(resp).toBeTruthy();
      expect(resp.id).toBe(courseId);
      expect(resp.titles.description).toBe('New Description');
    });
    const req = httpTestingController.expectOne(`/api/courses/${courseId}`);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(changes);
    req.flush({...COURSES[courseId], ...changes});
    httpTestingController.verify();
  });

  it('should give an error if save course fails', () => {
    const changes = {titles: {description: 'Testing Course'}};
    service.saveCourse(12, changes)
      .subscribe(
        () => fail('the save course operation should have failed'),
        error => {
          expect(error.status).toBe(500);
        }
      );
    const req = httpTestingController.expectOne('/api/courses/12');
    expect(req.request.method).toEqual('PUT');
    req.flush('Save course failed', {
      status: 500,
      statusText: 'Internal Server Error'
    });
    httpTestingController.verify();
  });

  it('should find a list of lessons', () => {
    service.findLessons(12).subscribe(resp => {
      expect(resp).toBeTruthy();
      expect(resp.length).toBeGreaterThan(0);
      expect(resp.length).toBe(3);
    });

    const req = httpTestingController.expectOne(req =>
      req.url == '/api/lessons');

    expect(req.request.method).toEqual('GET')
    expect(req.request.params.get('courseId')).toEqual('12');
    expect(req.request.params.get('filter')).toEqual('');
    expect(req.request.params.get('sortOrder')).toEqual('asc');
    expect(req.request.params.get('pageNumber')).toEqual('0');
    expect(req.request.params.get('pageSize')).toEqual('3');
    req.flush({payload: findLessonsForCourse(12).slice(0, 3)});
  });
});















