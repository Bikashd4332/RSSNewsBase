##
# For building and up container image
namespace :composing do
  desc "Build application container images"
  task :build do
    on roles(:app) do
      within current_path do
        ##
        # Build a container image 
        execute(:sudo, "docker-compose",
               "--project-name=#{fetch(:application)}_#{fetch(:stage)}",
               "-f", "docker-compose.#{fetch(:stage)}.yml",
               "build", "webapp"
               )
        ##
        # Create an instance of those build images
        execute(:sudo, "docker-compose",
               "--project-name=#{fetch(:application)}_#{fetch(:stage)}",
               "-f", "docker-compose.#{fetch(:stage)}.yml",
               "up", "-d", "--no-deps" "webapp"
               )
      end
    end
  end

##
# Action for  Database container
  namespace :database do
    desc "Up database and make sure it's ready"
    task :up do
      on roles(:app) do
        within current_path do
          execute(:sudo, "docker-compose",
                 "--project-name=#{fetch(:application)}_#{fetch(:stage)}",
                 "-f", "docker-compose.#{fetch(:stage)}.yml",
                 "up", "-d", "--no-deps", "mysql"
                 )
        end
      end
      sleep 5
    end

    ##
    # Create database structures
    desc "Setup initial database"
    task :up do
      on roles(:app) do
        within current_path do
          execute(:sudo, "docker-compose",
                 "--project-name=#{fetch(:application)}_#{fetch(:stage)}",
                 "-f", "docker-compose.#{fetch(:stage)}.yml",
                 "run", "--rm", "webapp", "rake db:create"
                 )
        end
      end
    end

    ##
    # Run Migrations
    desc "Run pending migrations"
    task :migrate do
      on roles(:app) do
        within current_path do
          execute(:sudo, "docker-compose",
                 "--project-name=#{fetch(:application)}_#{fetch(:stage)}",
                 "-f", "docker-compose.#{fetch(:stage)}.yml",
                 "run", "--rm", "webapp", "rake db:migrate"
                 )
        end
      end
    end

    ##
    # Database initial setup ( run create, migrate and seed together).
    task :setup do
      on roles(:app) do
        within current_path do
          execute(:sudo, "docker-compose",
                 "--project-name=#{fetch(:application)}_#{fetch(:stage)}",
                 "-f", "docker-compose.#{fetch(:stage)}.yml",
                 "run", "--rm", "webapp", "rake db:setup"
                 )
        end
      end
    end
  end
end

