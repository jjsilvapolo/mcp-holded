FROM node:20-alpine

WORKDIR /app

# Install the package globally
RUN npm install -g @iamsamuelfraga/mcp-holded

# Set the entrypoint
ENTRYPOINT ["mcp-holded"]
