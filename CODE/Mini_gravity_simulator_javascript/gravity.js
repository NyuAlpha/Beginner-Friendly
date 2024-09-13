//Get the canvas to draw on
canvas = document.getElementById("field").getContext("2d");

//Draw each particle
draw = (x,y,c,s)=>{
    canvas.fillStyle=c
    canvas.fillRect(x,y,s,s);
}

//Create a single particle and return it
particle=(x,y,z,c,m,r)=>{
    let vx = (Math.random()*2-1) * 10;
    let vy = (Math.random()*2-1) * 10;
    let vz = (Math.random()*2-1) * 10;
    return{"x":x,"y":y,"z":z,"vx":vx,"vy":vy,"vz":vz,"color":c,"mass":m,"radius":r};
}

//Get a random number between 0 and 240000  for x
randomX=()=>{
    return Math.random()*240000;
}

//Get a random number between 0 and 240000  for y
randomY=()=>{
    return Math.random()*240000;
}

//Create a group of particles and add it to the main group
create=(number,color,mass,radius)=>{

    for(let i=0; i<number; i++){
        particles.push(particle(randomX(),randomY(),randomX(),color,mass,radius));
    }
    return particles;
}


//gravity function for each particle
gravity = (g)=>{

        for(let i = 0 ; i < particles.length; i++){

            let fx = 0;
            let fy = 0;
            let fz = 0;
            let a = particles[i];
            for(let j = 0 ; j < particles.length; j++){

                if (i == j) continue;
                let b = particles[j];

                let dx = b.x -a.x;
                let dy = b.y -a.y;
                let dz = b.z -a.z;
                let d = Math.sqrt(dx*dx + dy*dy + dz*dz);

                if(d > (a.radius + b.radius) *400){
                    let F = g* (a.mass * b.mass) / (d*d*d) / a.mass;
                    fx += F * dx;
                    fy += F * dy;
                    fz += F * dz;
                }
            }

            a.vx += fx;
            a.vy += fy;
            a.vz += fz;

            a.vx *= 0.992;
            a.vy *= 0.992;
            a.vz *= 0.992;

            a.x += a.vx;
            a.y += a.vy;
            a.z += a.vz;
        }
    }

//Update function to draw everything
update=()=>{
    gravity(10000);
    canvas.clearRect(0,0,600,600);
    draw(0,0,"black",600);
    for(i=0; i<particles.length; i++){
        draw(particles[i].x/400,particles[i].y/400,particles[i].color,0.8);
    }
    requestAnimationFrame(update);
}


//Array to store all the particles of the simulator
particles=[];

//Create all the particles
blue = create(1000,"blue",100,3);
yellow = create(1000,"yellow",100,3);
green = create(1000,"green",100,3);
purple = create(1000,"purple",100,3);
red = create(1000,"red",100,3);
white = create(1000,"white",100,3);
//Ten black holes?
black = create(10,"black",200000,10);


//Start the simulator
update();