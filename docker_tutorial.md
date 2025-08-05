##### 📦🛠️ **Build the Docker Image**

To create a Docker image from your project, use the following command:

docker build -t express-docker-image .

- docker build: Tells Docker to create a new image.

- -t express-docker-image: Tags the image with the name express-docker-image.

- .: Tells Docker to use the Dockerfile in the current directory

1. ##### **Run a Container**

docker run --name express-docker-container -d -p 4000:4000 express-docker-image

**Explaination command :**

- -d → Run in background (detached mode)

- -p 4000:4000 → Map host port 4000 → container port 4000

- --name my-app → Give container a name (easier to manage)

##### **2. Stop a Running Container**

docker stop my-app

##### **3.Delete a Container**

docker rm my-app

**force remove (if stuck)**
docker rm -f my-app

**4. Delete a Docker Image**
docker rmi express-docker-app

**Command** ----> **What It Does**

docker ps ----> List running containers

docker ps -a ----> List all containers (including stopped)

docker images ----> List all images

docker logs my-container ----> View container logs

======================================================

#### **HOT RE-LOAD**

**two way binding ( Two-Way Sync (Local ↔ Container) )**
docker run -d -p 4000:4000 --name myapp-container
-v "path of project":/app
my-node-image

or:

docker run -d -p 4000:4000 --name myapp-container
-v ${pwd}:/app
my-node-image

- async local files with files in container

- Changes in local files auto-update in the container.

- No need to rebuild/restart

**one way binding ( One-Way Sync (Read-Only) )**
docker run -d -p 4000:4000 --name myapp-container
-v "path of project":/app:ro
my-node-image

- ro: read only, container can’t modify local files

#### I want folders do not change in the container even though I change them locally (Exclude Folders from Sync).

docker run -d -p 4000:4000 --name myapp-container
-v "path of project":/app:ro -v /app/node_modules
my-node-image

result : Keeps node_modules intact (ignores local changes).

**test: delete folder , pause container , run it again, folder will be returned again**

last command : docker run --name express-container -v ${pwd}/src:/app/src:ro -d -p 4000:4000 my-node-image

just read the modification inside src folder(delete, update...etc)

==================================================

#### **OPEN TERMINAL IN CONTAINER** :

docker exec -it my-app-container sh

==================================================

##### make the command is short !!

build : docker-compose.yml
run : docker-compose up -d
-d : for prevent bringing terminal of container to local terminal

docker-compose up --build # Rebuilds images before running
docker-compose down # Stops and removes containers

====================================================

#### **Environment varibles**

1- inside docker file write :

    ENV PORT=4000

    EXPOSE $PORT

2- with the command in terminal :

    docker run --name express-container -v ${pwd}/src:/app/src:ro --env PORT=4000 --env NODE_env=development -d -p 4000:4000 my-node-image

**Test**

    run command using second method

    open terminal in container

    run to see environment varibles :

    printenv

3- inside .env file :

    docker run --name express-container -v ${pwd}/src:/app/src:ro --env-file ./.env -d -p 4000:4000 my-node-image

4-inside docker-compose.yml file

=======================================================

#### **Managing Docker Across Environments**

**Solution**: Create separate docker-compose files for each environment (development, staging, production).

**Why?**
Each environment has unique requirements:

Different configurations (ports, volumes)

Environment-specific dependencies

Separate security rules and scaling needs

Example :
**_Development vs Production Volumes :_**
docker-compose-dev.yml (Development)
volumes:

- ./src:/app/src # Live code updates (edit locally → auto-updates in container)

docker-compose-prod.yml (Production)
No volumes → Code stays static in container (better security & stability)

**Why?**
Development: You need instant code changes → volumes sync your local files

Production: Code shouldn't change after deployment → no volumes = safer/faster

**▶️To run with a specific Compose file**
docker-compose -f docker-compose.dev.yml up -d
docker-compose -f docker-compose.dev.yml down

Use -f to choose the desired file.

====================================================

#### 🧼 **Clean Docker Compose Setup**

📁  
docker-compose.yml – Contains common configuration for all environments.

docker-compose.dev.yml – Contains development-specific overrides.

docker-compose.prod.yml – Contains production-specific overrides.

=====================================================================

#### 🎯 Installing Environment-Specific Dependencies & Avoiding Nodemon in Production

---

##### 🚧 1. Run the Project in Development Mode

To run the project **without Nodemon** (pure Node.js), add the following line under the relevant service in your `docker-compose.dev.yml`:

```yaml
command: npm run start-dev
```

#### 🚧 2. Install Dependencies Based on Environment

Add the following to your configuration files:

###### 🐳 Dockerfile

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "production" ]; then \
 npm install --only=production; \
 else \
 npm install; \
 fi

###### 🧪 docker-compose.dev.yml

```
build:
context: .
args: - NODE_ENV=development
```

###### 🚀 docker-compose.prod.yml

```
build:
context: .
args: - NODE_ENV=production
```

✅ What This Setup Does:

🛠️ In development, it installs all dependencies (including dev ones).

🚀 In production, it installs only production dependencies.

🔁 Helps avoid using Nodemon in environments where it’s not needed.
