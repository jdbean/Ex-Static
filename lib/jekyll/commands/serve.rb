# require 'byebug'

module Jekyll
  module Commands
    class Serve < Command
      class << self
        ### NEW start_up_webrick definition from new ruby
        def start_up_webrick(opts, destination)


          @server = WEBrick::HTTPServer.new(webrick_opts(opts)).tap { |o| o.unmount("") }
          @server.mount(opts["baseurl"].to_s, Servlet, destination, file_handler_opts)

          #  monkey-patched code
          ex_static_monkey_patch(@server)

          if opts["livereload"]
            @reload_reactor.start(opts)
          end

          Jekyll.logger.info "Server address:", server_address(@server, opts)
          launch_browser @server, opts if opts["open_url"]
          boot_or_detach @server, opts


        end

        def ex_static_monkey_patch(server)
          server.mount "/admin", Rack::Handler::WEBrick, ExStatic::StaticServer
          server.mount "/_api",  Rack::Handler::WEBrick, ExStatic::Server
          Jekyll.logger.info "ExStatic mode:", ENV["RACK_ENV"] || "production"
        end
      end
    end
  end
end
