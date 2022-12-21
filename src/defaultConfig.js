export default {
  padding: 0,
  gap: '8px',
  breakpoints: [
    {
      name: 'mobile',
      mq: '(max-width: 767px)',
      columns: 1,
    },
    {
      name: 'tablet',
      mq: '(min-width: 768px) and (max-width: 1023px)',
      columns: 2,
    },
    {
      name: 'desktop',
      mq: '(min-width: 1024px)',
      columns: 3,
    },
  ],
}
