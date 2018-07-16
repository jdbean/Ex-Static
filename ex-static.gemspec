# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'ex-static/version'

Gem::Specification.new do |spec|
  spec.name          = "ex-static"
  spec.version       = ExStatic::VERSION
  spec.authors       = ["J.D. Bean"]
  spec.email         = ["jonathandbean@gmail.com"]

  spec.summary       = %q{CMS Admin Panel for Jekyll Sites}
  spec.description   = %q{Ex-Static is a drop in administrative framework for Jekyll sites.}
  spec.homepage      = "https://github.com/jdbean/Ex-Static"
  spec.license       = "AGPL-3.0"

  # Prevent pushing this gem to RubyGems.org. To allow pushes either set the 'allowed_push_host'
  # to allow pushing to a single host or delete this section to allow pushing to any host.
  if spec.respond_to?(:metadata)
    # spec.metadata['allowed_push_host'] = "https://rubygems.org"
  else
    raise "RubyGems 2.0 or newer is required to protect against public gem pushes."
  end

  spec.files         = Dir.glob("lib/**/*").concat(%w(LICENSE README.md))
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_dependency "jekyll", "~> 3.8"
  spec.add_dependency "sinatra", "~> 2.0"
  spec.add_dependency "sinatra-contrib", "~> 2.0"
  spec.add_dependency "addressable", "~> 2.4"



  spec.add_development_dependency "bundler", "~> 1.7"
  spec.add_development_dependency "rake", "~> 10.0"
  spec.add_development_dependency "rspec", "~> 3.4"
  spec.add_development_dependency "sinatra-cross_origin", "~> 0.4"
  spec.add_development_dependency "gem-release", "~> 0.7"
end
