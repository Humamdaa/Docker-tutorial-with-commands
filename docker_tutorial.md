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
docker rm express-docker-app

**Command** ----> **What It Does**

docker ps ----> List running containers

docker ps -a ----> List all containers (including stopped)

docker images ----> List all images

docker logs my-container ----> View container logs

======================================================

#### **HOT RE-LOAD**

**two way binding:**
docker run -d -p 4000:4000 --name myapp-container
-v "path of project":/app
my-node-image

or:
docker run -d -p 4000:4000 --name myapp-container
-v ${pwd}:/app
my-node-image

- async local files with files in container

- Changes you make in your code instantly appear in the running Docker container

- No need to rebuild the Docker image or restart the container manually

**one way binding:**
docker run -d -p 4000:4000 --name myapp-container
-v "path of project":/app:ro
my-node-image

- ro: read only

#### I want folders do not change in the container even though I change them locally.

docker run -d -p 4000:4000 --name myapp-container
-v "path of project":/app:ro -v /app/node_modules
my-node-image

**test: delete folder , pause container , run it again, folder will be returned again**

last command : docker run --name express-container -v ${pwd}/src:/app/src:ro -d -p 4000:4000 my-node-image

just read the modification inside src folder(delete, update...etc)

==================================================

#### **OPEN TERMINAL INSIDE CONTAINER** :

docker exec -it my-app-container sh

==================================================

##### make the command is short !!

build : docker-compose.yml
run : docker-compose up -d :
-d : for prevent bringing terminal of container to local terminal

docker-compose up --build

docker-composer down : shut down the container

====================================================

#### **methods to pass environment varible**

1- inside docker file write :

    ENV PORT=4000

    EXPOSE $PORT

2- with the command in terminal :

    docker run --name express-container -v ${pwd}/src:/app/src:ro --env PORT=4000 --env NODE_env=development -d -p 4000:4000 my-node-image

--- test ---:

    run command using second method

    open terminal in container

    run to see environment varibles :

    printenv
