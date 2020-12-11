import { DatePipe } from './date.pipe';

describe('DatePipe', () => {
  it('create an instance', () => {
    const pipe = new DatePipe(null);
    expect(pipe).toBeTruthy();
  });
});
