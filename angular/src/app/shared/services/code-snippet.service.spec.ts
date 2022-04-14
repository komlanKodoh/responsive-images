import { TestBed } from '@angular/core/testing';

import { CodeSnippetService } from './code-snippet.service';

describe('CodeSnippetService', () => {
  let service: CodeSnippetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeSnippetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
