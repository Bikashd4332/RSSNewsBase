FROM phusion/passenger-ruby23:latest
MAINTAINER Bikash  Das "bikashd@mindfiresolutions.com"

# Set correct environment variables.
ENV HOME /root

# Update for security reason
RUN apt-get update && apt-get upgrade -y -o Dpkg::Options::="--force-confold"

# Installing Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install --no-install-recommends yarn tzdata

# Try to update nodejs environment
# get install script and pass it to execute: 
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash
# and install node 
RUN apt-get install --no-install-recommends -y nodejs

# Gem caching
WORKDIR /tmp
ADD Gemfile /tmp/
ADD Gemfile.lock /tmp/
RUN bundle install --jobs 20 --retry 5

# js modules caching
ADD package.json /tmp/
ADD yarn.lock /tmp/
RUN yarn install -g

# Use baseimage-docker's init process.
CMD ["/sbin/my_init"]

# Expose Nginx HTTP service
EXPOSE 80

# Start Nginx / Passenger
RUN rm -f /etc/service/nginx/down

# Remove the default site
RUN rm /etc/nginx/sites-enabled/default

# Nginx App setup
ADD docker/staging/app.nginx.conf /etc/nginx/sites-enabled/app.nginx.conf
ADD docker/staging/mysql-env.conf /etc/nginx/main.d/mysql-env.conf
ADD docker/staging/rails-env.conf /etc/nginx/main.d/rails-env.conf
ADD docker/staging/app-env.conf /etc/nginx/conf.d/00_app_env.conf

# App setup
#
# This is your application setup steps, you should also do what you need to do here to make your 
# application working for production environment.
#
WORKDIR /home/app/RSSNewsBase
COPY --chown=app:app . /home/app/RSSNewsBase
RUN rm -f config/database.yml
RUN mv config/database.yml.sample config/database.yml
RUN rake assets:precompile RAILS_ENV=production

# After assets compilation it cre
RUN chown -R app:app tmp

# Clean up APT when done.
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

