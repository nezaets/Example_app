import { TextEllipsisPipe } from './text-ellipsis.pipe';

describe('TextEllipsisPipe', () => {

  it('should ellipsis text to he provided length and add dots', () => {
    const pipe = new TextEllipsisPipe();
    const longString = 'I\'m very long text, which should be ellipse';
    const expectedString = 'I\'m very long text...';

    expect(pipe.transform(longString, 18))
      .toEqual(expectedString);
  });
});
