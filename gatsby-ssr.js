const React = require("react")
const Layout = require("./src/layouts/main-layout.js").default
require("./src/sass/app.scss")
// Wraps every page in a component
exports.wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}