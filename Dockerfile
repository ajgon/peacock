FROM debian:jessie

# Install node and yarn and necessary libraries
RUN apt-get update && \
    apt-get install --yes --no-install-recommends apt-transport-https ca-certificates curl && \
    printf "deb https://deb.nodesource.com/node_6.x jessie main" > /etc/apt/sources.list.d/nodesource.list && \
    printf "deb https://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list && \
    curl -sS https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add - && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    apt-get update && \
    apt-get install --yes --no-install-recommends nodejs=6.* yarn libpng12-dev && \
    apt-get remove --yes --purge apt-transport-https ca-certificates curl && \
    apt-get autoremove --yes --purge && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    rm -rf /etc/apt/sources.list.d/*.list

# Install necessary global packages
RUN yarn global add --non-interactive --no-progress \
    jest nodemon webpack standard webpack-dev-server

# Set files and directories
ENV APP_HOME /app
# Always use root dir, babel resolvers are too stupid to find it otherwise
WORKDIR $APP_HOME
COPY entrypoint.sh /

