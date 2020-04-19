namespace :setup do
  desc "Upload .env file to shared folder"
  task :env do
    on roles(:app) do
      # Get all the env file paths and upload them inside $ENV_FILE_PATH
      upload! fetch(:env_file_path), [shared_path, fetch(:env_file_path)].join('/')
    end
  end

  namespace :check do
    desc "Task Description"
    task :lined_files => fetch(:env_file_path)
  end
end
