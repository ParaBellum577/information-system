exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions
    if (page.path.match(/^\/app/)) {
      page.matchPath = "/*"
      createPage(page)
    }
  }