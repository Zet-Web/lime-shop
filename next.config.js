const withPlugins = require('next-compose-plugins')
const withTMFactory = require('next-transpile-modules')
const plugins = [withTMFactory(['@consta/uikit', '@consta/charts'])]


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true
  }
}

module.exports = withPlugins(plugins, nextConfig)

