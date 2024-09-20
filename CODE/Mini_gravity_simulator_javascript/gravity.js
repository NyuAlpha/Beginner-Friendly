    //Draw a filled rectangle
    //X and y are the origin, c is the color, w and h are the size (width and height from origin)
    draw = (x,y,c,w,h)=>{
        context.fillStyle = c
        context.fillRect(x,y,w,h);
    }

    //Draw a filled circle
    //X and y are the origin, c is the color, r is the radius
    draw_circle = (x,y,c,r)=>{
        context.fillStyle = c
        context.beginPath();
        context.arc(x, y, r,0 , 2 * Math.PI);
        context.fill();
    }

    //Create a single particle and return it
    particle = (x,y,c,m,r)=>{

        //random velocities
        let vx = (Math.random()*2-1) * 5;
        let vy = (Math.random()*2-1) * 5;

        return{"x":x,"y":y,"vx":vx,"vy":vy,"color":c,"mass":m,"radius":r};
    }

    //Get a random number between 0 and 240000  for x
    randomX=()=>{
        return Math.random() * WIDTH;
    }

    //Get a random number between 0 and 240000  for y
    randomY=()=>{
        return Math.random() * HEIGHT;
    }

    //Create a group of particles and add it to the main group
    create=(number,color,mass,radius)=>{

        for(let i=0; i<number; i++){
            //Create a particle in a random location
            particles.push(particle(randomX(),randomY(),color,mass,radius));
        }
        return particles;
    }


    //gravity function for each particle
    gravity = ()=>{

        

        for(let i = 0 ; i < particles.length; i++){

            let fx = 0;
            let fy = 0;
            let a = particles[i];
            for(let j = 0 ; j < particles.length; j++){

                let b = particles[j];

                let dx = b.x -a.x;
                let dy = b.y -a.y;
                let d = Math.sqrt(dx*dx + dy*dy)+0.1;

                let dis;
                let g;

                if(d < 25){

                    g = 0.000001;
                    dis = d*d;

                }
                else if(d < 50){
                    g = 0.1;
                    dis = d*d*d;
                }
                else{
                    g = 50;
                    dis = d*d*d*d;
                }
                
                //To simplify calculations g is 1, so it is omitted in  g * (a.mass * b.mass) / (d*d) / a.mass;
                //also, the mass of 'a' cancels out in the equation.
                let F = g * (b.mass / dis);
                fx += F * dx;
                fy += F * dy;
                
            }

            //add the force and subtract a small part of speed
            a.vx = (a.vx + fx) * 0.992;
            a.vy = (a.vy + fy) * 0.992;

            //Update position
            a.x += a.vx;
            a.y += a.vy;
        }
    }



    //Update function to draw everything
    update=()=>{

        //Clear the area before drawing particles
        draw(0,0,"black",WIDTH,HEIGHT);
        
        gravity();
        
        for(i=0; i<particles.length; i++){

            let p = particles[i];
            draw_circle(p.x , p.y, p.color, p.radius);
        }
        requestAnimationFrame(update);
    }


    //Get the canvas to draw on
    canvas = document.getElementById("field");
    context = canvas.getContext("2d");

    //Width and height of map
    const WIDTH = 1400;
    const HEIGHT = 700;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    //Array to store all the particles of the simulator
    particles=[];

    //Create all the particles
    red = create(700,"red",1,1.5);
    red = create(700,"#6bf",2,1.5);
    yellow = create(700,"yellow",3,1.5);
    white = create(700,"white",4,1.5);
    giant_blue = create(400,"#9df",10,1.5);
    //black_holes = create(5,"#102",1000000,10);

    //Start the simulator
    update();