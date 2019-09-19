const path = require('path')
const _ = require('lodash')
const fs = require('fs')
const siteConfig = require('./data/SiteConfig')
const {
  createPaginationPages,
  createLinkedPages
} = require('gatsby-pagination')

exports.onCreateNode = ({
  node,
  actions,
  getNode
}) => {
  const {
    createNodeField
  } = actions
  let value
  if (node.internal.type === 'Mdx') {
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')
    )
      value = `/${_.kebabCase(node.frontmatter.slug)}`
    else if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'title')
    )
      value = `/${_.kebabCase(node.frontmatter.title)}`
    else if (parsedFilePath.name !== 'index' && parsedFilePath.dir !== '')
      value = `/${parsedFilePath.dir}/${parsedFilePath.name}/`
    else if (parsedFilePath.dir === '')
      value = `/${parsedFilePath.name}/`
    else
      value = `/${parsedFilePath.dir}/`

    createNodeField({
      name: 'slug',
      node,
      value
    })
  }
}

exports.createPages = ({
  graphql,
  actions
}) => {
  const {
    createPage
  } = actions

  return new Promise((resolve, reject) => {
    const indexPage = path.resolve('src/templates/index.jsx')
    const postPage = path.resolve('src/templates/post.jsx')
    const tagPage = path.resolve('src/templates/tag.jsx')
    const categoryPage = path.resolve('src/templates/category.jsx')
    const authorPage = path.resolve('src/templates/author.jsx')

    if (
      !fs.existsSync(
        path.resolve(`content/${siteConfig.blogAuthorDir}`)
      )
    )
      reject(new Error('The \'blogAuthorDir\' folder is missing.'))

    resolve(
      graphql(
        `
          {
            allMdx(
              limit: 1000
              sort: { fields: [frontmatter___date], order: DESC }
            ) {
              totalCount
              edges {
                node {
                  frontmatter {
                    title
                    tags
                    cover
                    date
                    category
                    author
                  }
                  fields {
                    slug
                  }
                  excerpt
                  timeToRead
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          /* eslint no-console: "off" */
          console.log(result.errors)
          reject(result.errors)
        }

        // Creates Index page
        createPaginationPages({
          createPage,
          edges: result.data.allMdx.edges,
          component: indexPage,
          limit: siteConfig.sitePaginationLimit
        })

        // Creates Posts
        createLinkedPages({
          createPage,
          edges: result.data.allMdx.edges,
          component: postPage,
          edgeParser: edge => ({
            path: edge.node.fields.slug,
            context: {
              slug: edge.node.fields.slug
            }
          }),
          circular: true
        })

        const tagSet = new Set()
        const tagMap = new Map()
        const categorySet = new Set()
        const authorSet = new Set()
        authorSet.add(siteConfig.blogAuthorId)

        result.data.allMdx.edges.forEach(edge => {
          if (edge.node.frontmatter.tags)
            edge.node.frontmatter.tags.forEach(tag => {
              tagSet.add(tag)

              const array = tagMap.has(tag) ? tagMap.get(tag) : []
              array.push(edge)
              tagMap.set(tag, array)
            })

          if (edge.node.frontmatter.category)
            categorySet.add(edge.node.frontmatter.category)

          if (edge.node.frontmatter.author)
            authorSet.add(edge.node.frontmatter.author)
        })

        const tagFormatter = tag => route =>
          `/tags/${_.kebabCase(tag)}/${route !== 1 ? route : ''}`
        const tagList = Array.from(tagSet)
        tagList.forEach(tag => {
          // Creates tag pages
          createPaginationPages({
            createPage,
            edges: tagMap.get(tag),
            component: tagPage,
            pathFormatter: tagFormatter(tag),
            limit: siteConfig.sitePaginationLimit,
            context: {
              tag
            }
          })
        })

        const categoryList = Array.from(categorySet)
        categoryList.forEach(category => {
          createPage({
            path: `/categories/${_.kebabCase(category)}/`,
            component: categoryPage,
            context: {
              category
            }
          })
        })

        const authorList = Array.from(authorSet)
        authorList.forEach(author => {
          createPage({
            path: `/author/${_.kebabCase(author)}/`,
            component: authorPage,
            context: {
              author
            }
          })
        })
      })
    )
  })
}
