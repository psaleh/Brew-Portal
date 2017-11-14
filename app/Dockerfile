FROM node:8.8.1

#MAINTAINER Stephen Pope, spope@projectricochet.com

RUN mkdir /home/meteorapp

WORKDIR /home/meteorapp

ADD . /home/meteorapp

# Do basic updates
RUN apt-get update -q && apt-get clean

# Get curl in order to download curl
RUN apt-get install curl -y \

  # Install Meteor
  && (curl https://install.meteor.com/ | sh) \

  # Build the Meteor app
  && cd /home/meteorapp \
  && npm install \
  && meteor build ../build --architecture os.linux.x86_64 --directory --allow-superuser \

  # Build the NPM packages needed for build
  && cd /home/build/bundle/programs/server \
  && npm install --verbose \

  # Get rid of Meteor. We're done with it.
  && rm /usr/local/bin/meteor \
  && rm -rf ~/.meteor \

  #no longer need curl
  && apt-get --purge autoremove curl -y

RUN npm install -g forever

EXPOSE 80
ENV PORT 80

CMD ["forever", "--minUptime", "1000", "--spinSleepTime", "1000", "/home/build/bundle/main.js"]