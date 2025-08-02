FROM node:23.11.1-slim AS base
LABEL Name="IEF-Front" Version="0.0.1"

# Set up local environnment variables
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV CI=true

COPY . /opt/ief-front/
WORKDIR /opt/ief-front/

RUN corepack enable
RUN pnpm install -g corepack@latest

# Multistage build
# Install build dependencies
FROM base AS prod-deps

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile 

# Copy dependencies then build
FROM base
COPY --from=prod-deps /opt/ief-front/node_modules /opt/ief-front/node_modules
ENTRYPOINT [ "sh","/opt/ief-front/docker-entrypoint.sh"]
