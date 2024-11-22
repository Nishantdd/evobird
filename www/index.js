import * as sim from "lib-simulation-wasm";

const simulation = new sim.Simulation();
const world = simulation.world();

const generationCount = document.getElementById("generation-count");
const bestScore = document.getElementById("best-fitness");
const avgScore = document.getElementById("avg-fitness");

document.getElementById("train").onclick = function () {
    const res = simulation.train();
    const scores = res.split(" ");
    bestScore.innerHTML = scores[1].split("=")[1]
    avgScore.innerHTML = scores[2].split("=")[1]
    generationCount.innerHTML = Number(generationCount.innerHTML) + 10;
};

const viewport = document.getElementById("viewport");

const viewportWidth = viewport.width;
const viewportHeight = viewport.height;
const viewportScale = window.devicePixelRatio || 1;
viewport.width = viewportWidth * viewportScale;
viewport.height = viewportHeight * viewportScale;
viewport.style.width = viewportWidth + "px";
viewport.style.height = viewportHeight + "px";

const ctxt = viewport.getContext("2d");
ctxt.scale(viewportScale, viewportScale);

// ctxt.fillStyle = 'rgb(0, 0, 0)';

CanvasRenderingContext2D.prototype.drawTriangle = function (
    x,
    y,
    size,
    rotation,
) {
    this.beginPath();

    this.moveTo(
        x - Math.sin(rotation) * size * 1.5,
        y + Math.cos(rotation) * size * 1.5,
    );

    this.lineTo(
        x - Math.sin(rotation + (2.0 / 3.0) * Math.PI) * size,
        y + Math.cos(rotation + (2.0 / 3.0) * Math.PI) * size,
    );

    this.lineTo(
        x - Math.sin(rotation + (4.0 / 3.0) * Math.PI) * size,
        y + Math.cos(rotation + (4.0 / 3.0) * Math.PI) * size,
    );

    this.lineTo(
        x - Math.sin(rotation) * size * 1.5,
        y + Math.cos(rotation) * size * 1.5,
    );
    this.fillStyle = "#FF596B";
    this.fill();
    // this.strokeStyle = '#FF596B';
    // this.stroke();
};

CanvasRenderingContext2D.prototype.drawCircle = function (x, y, radius) {
    this.beginPath();

    // ---
    // | Circle's center.
    // ----- v -v
    this.arc(x, y, radius, 0, 2.0 * Math.PI);
    // ------------------- ^ -^-----------^
    // | Range at which the circle starts and ends, in radians.
    // |
    // | By manipulating these two parameters you can e.g. draw
    // | only half of a circle, Pac-Man style.
    // ---

    // this.fillStyle = '#ffe0e8';
    this.fillStyle = "#98971a";
    // this.fillStyle = '#FF596B';
    this.fill();
};

for (const animal of simulation.world().animals) {
    ctxt.drawTriangle(
        animal.x * viewportWidth,
        animal.y * viewportHeight,
        0.01 * viewportWidth,
        animal.rotation,
    );
}

function redraw() {
    ctxt.clearRect(0, 0, viewportWidth, viewportHeight);

    let result = simulation.step();
    if (result != "") {
        generationCount.innerHTML = Number(generationCount.innerHTML) + 1;
    }

    const world = simulation.world();

    for (const food of world.foods) {
        ctxt.drawCircle(
            food.x * viewportWidth,
            food.y * viewportHeight,
            (0.01 / 2.0) * viewportWidth,
        );
    }

    for (const animal of world.animals) {
        ctxt.drawTriangle(
            animal.x * viewportWidth,
            animal.y * viewportHeight,
            0.01 * viewportWidth,
            animal.rotation,
        );
    }

    // requestAnimationFrame() schedules code only for the next frame.
    //
    // Because we want for our simulation to continuwe forever, we've
    // gotta keep re-scheduling our function:
    requestAnimationFrame(redraw);
}

redraw();
