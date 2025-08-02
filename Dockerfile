FROM node:23.11.1-slim

# Set up pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /opt/ief-front

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source code and build
COPY . .
RUN pnpm run build

# Install static file server
RUN pnpm add -g serve

EXPOSE 4173

CMD ["serve", "-s", "dist", "-l", "4173"]
