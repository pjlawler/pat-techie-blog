const { format_date, timeSince, commentCount, postCount } = require('../utils/helpers');

test('format_date() returns a short-date string 3/27', () => {
    const date = new Date('2022-03-24 16:00:00')
    expect(format_date(date)).toBe('3/24');
});
test('timeSince returns a text description since a date/time', () => {
    const now = new Date();
    const date_lessthanaMinute = new Date(now.getTime() - 30000);
    const date_fiveMinutes = new Date(now.getTime() - 300000);
    const date_twoHours = new Date(now.getTime() - 3600000);
    const date_fiveDays = new Date(now.getTime() - 432000000);
    const date_tenWeeks = new Date(now.getTime() - 6048000000);
    const date_oneYear =  new Date(now.getTime() - 31536000000);

    expect(timeSince(date_lessthanaMinute)).toBe('less than a minute ago');
    expect(timeSince(date_fiveMinutes)).toBe('5 minutes ago');
    expect(timeSince(date_twoHours)).toBe('1 hour ago');
    expect(timeSince(date_fiveDays)).toBe('5 days ago');
    expect(timeSince(date_tenWeeks)).toBe('10 weeks ago');
    expect(timeSince(date_oneYear)).toBe('1 year ago');
});
test('commentCount() returns a text description of the number of comments in an array', () => {
    const array_0 = [];
    const array_1 = [{}];
    const array_2 = [{}, {}];

    expect(commentCount(array_0)).toBe('No comments yet');
    expect(commentCount(array_1)).toBe('1 comment');
    expect(commentCount(array_2)).toBe('2 comments');
});
test('postCount() returns a text description of the number of posts in an array', () => {
    const array_0 = [];
    const array_1 = [{}];
    const array_2 = [{}, {}];

    expect(postCount(array_0)).toBe('no posts');
    expect(postCount(array_1)).toBe('1 post');
    expect(postCount(array_2)).toBe('2 posts');
});