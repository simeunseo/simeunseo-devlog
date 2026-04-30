const path = require('path')

const mermaidDir = path.dirname(require.resolve('mermaid/package.json'))
const cytoscapeEsm = path.join(
  mermaidDir,
  '../cytoscape/dist/cytoscape.esm.mjs'
)

module.exports = {
  images: {
    domains: ['www.notion.so', 'lh5.googleusercontent.com', 's3-us-west-2.amazonaws.com'],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'cytoscape/dist/cytoscape.umd.js$': cytoscapeEsm,
      canvas: false,
    }

    config.resolve.fallback = {
      ...config.resolve.fallback,
      canvas: false,
    }

    return config
  },
}
