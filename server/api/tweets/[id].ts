export default defineEventHandler((event) => {
    return {
        data: {
            id: getRouterParam(event, 'id'),
            title: 'title',
            content: 'xxx'
          }
    }
  })
  