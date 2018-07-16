# Default Sinatra to "production" mode (surpress errors) unless
# otherwise specified by the `RACK_ENV` environmental variable.
# Must be done prior to requiring Sinatra, or we'll get a LoadError
# as it looks for sinatra/cross-origin, which is development only
ENV["RACK_ENV"] = "production" if ENV["RACK_ENV"].to_s.empty?

require "json"
require "jekyll"
require "base64"
require "webrick"
require "sinatra"
require "fileutils"
require "sinatra/base"
require "sinatra/json"
require "addressable/uri"
require "sinatra/reloader"
require "sinatra/namespace"

module ExStatic
  autoload :APIable,          "ex-static/monkeys/apiable"
  autoload :Directory,        "ex-static/objects/directory"
  autoload :FileHelper,       "ex-static/helpers/file_helper"
  autoload :PathHelper,       "ex-static/helpers/path_helper"
  autoload :Server,           "ex-static/server"
  autoload :StaticServer,     "ex-static/static_server"
  autoload :URLable,          "ex-static/monkeys/urlable"
  autoload :Version,          "ex-static/version"

  def self.site
    @site ||= begin
      site = Jekyll.sites.first
      site.future = true
      site
    end
  end
end

# Monkey Patches
require_relative "./jekyll/commands/serve"

[Jekyll::Page, Jekyll::Document, Jekyll::StaticFile, Jekyll::Collection].each do |klass|
# [Jekyll::Document, Jekyll::Collection].each do |klass|
  klass.include ExStatic::APIable
  klass.include ExStatic::URLable
end
