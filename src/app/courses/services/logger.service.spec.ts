import { LoggerService } from './logger.service';
import { TestBed } from '@angular/core/testing';

describe('LoggerService', () =>{
  let service: LoggerService;
  let logSpy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggerService]
    });
    service = TestBed.inject(LoggerService);
    logSpy = spyOn(service, 'log');
  });

  it('should call log method with the correct message', () => {
    const message = 'Test message';
    service.log(message);
    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(message);
  });
});
