let myCircles = [];// Array to store circle
let numOfCircles = 33;// Number of circles
let bgImages = []; // Background image
let bottomX = 111; // X position of the semicircles at bottom most(1-5)
let bottomY = 494;  // Y position of semicircles at the bottom most(1-5)
let diameter1 = 34; // Diameter of the semicircles at bottom most(1-5)+bottom big(2&3)
let diameter2 = 25; // Diameter of the semicircles at bottom (2&3)
let spacing1 = 37;  // Spacing between the bottom most semicircles (1-5)
let spacing2 = 105; // Spacing for bottom big semicircles(1&4)
let spacing3 = 43;  // Spacing for bottom small semicircles(2&3)
let topX1 = 148;  // X position for bottom big semicircles(1&4)
let topX2 = 180; // X position for bottom small semicircles(2&3) 
let topY = 445; // Y position for bottom big+small semicircles(1-4)
let currentBgIndex = 3;  // 初始背景为冬天
let seasonText = "Winter"; // 当前季节文字
let music = []; // 用于存储每个季节的音乐
let currentMusic = null; // 当前播放的音乐
let musicChanged = false;
let isMusicStarted = false; // 标记音乐是否已开始播放

function preload() {
   // Preload background image
   bgImages[0] = loadImage('assets/spring.jpg');
   bgImages[1] = loadImage('assets/summer.jpg');
   bgImages[2] = loadImage('assets/autumn.jpg');
   bgImages[3] = loadImage('assets/winter_background.jpg');

    // 预加载音乐
    music[0] = loadSound('assets/spring.mp3');
    music[1] = loadSound('assets/summer.mp3');
    music[2] = loadSound('assets/autumn.mp3');
    music[3] = loadSound('assets/winter.mp3');
}

// Positions and sizes for circles
let circlePositions = [
    [85,40],[85,85],[90,120],[114,130],[122,153],[120,183],[125,224],[150,248],[175,252],[198,247],
    [222,253],[247,250],[272,248],[280,218],[285,190],[289,158],[285,125],[300,120],[325,125],[350,134],[358,115],
    [180,165],[170,185],[190,183],[210,204],[230,185],[241,170],[210,230],
    [210,289],[200,340],[202,385],[208,410],[200,432]
];
let circleDiameters = [50, 43, 29, 27, 23, 40, 53, 28, 26, 20, 
    31, 22, 33, 35, 25, 44, 20, 15, 33, 22, 20, 
    16, 16, 26, 35, 22, 16, 20, 
    47, 61, 30, 23, 23];

function setup() {
   createCanvas(400, 600);
   textSize(48); // 设置季节文字大小

   // Initialize circles with positions and sizes
   for(let i = 0; i < numOfCircles; i++){
     myCircles.push(new MyCircleClass(circlePositions[i][0], circlePositions[i][1], circleDiameters[i]));

    }

   // 播放初始背景音乐（冬季）
   playMusic();
}
  
class MyCircleClass {

   constructor(x, y, size) {
     this.x = x; // X position of circle
     this.y = y; // Y position of circle
     this.originalColor1 = color(228, 102, 103);
     this.originalColor2 = color(142, 171, 126);
     this.stroke = 0; // Stroke weight for circle outline
     this.color1 = this.originalColor1; // First color for half of circle (green)
     this.color2 = this.originalColor2; // Second color for half of circle (red)
     this.isHovered = false; // 是否悬停
     this.isClicked = false; // 是否已被点击
     this.originalSize = size; // 初始直径
     this.sizeOffset = 0; // 大小偏移量，用于调整大小
    }

    // 检测鼠标是否在圆内
    isMouseHovering() {
        let d = dist(mouseX, mouseY, this.x, this.y);
        return d < (this.originalSize + this.sizeOffset) / 2;
    }

    draw() {
        let currentSize = this.originalSize + this.sizeOffset; // 当前大小

        if (this.isClicked) {
            // 如果已点击，保持点击时的随机颜色
            // 保持 color1 和 color2 不变
        } else if (this.isMouseHovering()) {
            if (!this.isHovered) {
                colorMode(HSB, 255); // 设置颜色模式为 HSB
                // 首次悬停时生成随机颜色
                this.color1 = color(random(255), 60, random(180, 255));
                this.color2 = color(random(255), 60, random(180, 255));
                this.isHovered = true;
                colorMode(RGB, 255); // 设置颜色模式为 HSB
            }
        } else {
            // 鼠标移开时恢复原始颜色
            this.color1 = this.originalColor1;
            this.color2 = this.originalColor2;
            this.isHovered = false;
        }

        // 绘制圆形的两半，分别填充颜色
        fill(this.color1);
        stroke(this.stroke);
        arc(this.x, this.y, currentSize, currentSize, HALF_PI, -HALF_PI, PIE);

        fill(this.color2);
        arc(this.x, this.y, currentSize, currentSize, -HALF_PI, HALF_PI, PIE);
    }

    // 检测鼠标点击
    checkClick() {
        if (this.isMouseHovering()) {
            // 如果点击在圆上，保留当前随机颜色
            this.isClicked = true;
        }
    }

    // 调整大小
    adjustSize(amount) {
        this.sizeOffset += amount;
        this.sizeOffset = constrain(this.sizeOffset, -20, 20); // 限制大小变化范围为 ±20
    }
}
  
function draw() {
    background(bgImages[currentBgIndex]);// 绘制当前背景图

    // 自定义文字的颜色
    if (seasonText === "Winter") {
        fill(173, 216, 230);
    } else if (seasonText === "Spring") {
        fill(85, 170, 85);
    } else if (seasonText === "Summer") {
        fill(121, 89, 149);
    } else if (seasonText === "Autumn") {
        fill(105, 56, 20);
    }

    noStroke();//不要字体描边
    text(seasonText, 200, 70);//设置字体位置

    // Draw each circle in the array
    for (let i = 0; i < numOfCircles; i++) {
      myCircles[i].draw();
    }

    stroke(0);
    strokeWeight(2);

    // Bottom green rectangle
    fill(142, 171, 126);
    rect(27, 450, 345, 55);

    // Left and right vertical lines
    line(65, 450, 65, 505);
    line(340, 450, 340, 505);

    // Bottom larger yellow rectangle
    fill(217, 194, 125);
    rect(92, 444, 204, 52);

    // Bottom smaller red rectangle
    stroke(217, 194, 125);
    fill(228, 102, 103);
    rect(130, 446, 35, 48);

    // Bottom smaller green rectangles
    fill(142, 171, 126);
    rect(165, 446, 37, 48);
    rect(237, 446, 35, 48);

    // Rightmost small green semicircle 6
    arc(285, 494, 19, 28, PI, 0, fill(142, 171, 126));

    // Semicircles bottom big 1&4
    for (let i = 0; i < 2; i++) {
      fill(i % 2 === 0 ? color(142, 171, 126) : color(228, 102, 103));
      arc(topX1 + i * spacing2, topY, diameter1, diameter1, 0, PI);
    }

    // Semicircles bottom small 2&3
    for (let i = 0; i < 2; i++) {
      fill(i % 2 === 0 ? color(228, 102, 103) : color(142, 171, 126));
      arc(topX2 + i * spacing3, topY, diameter2, diameter2, 0, PI);
  }

    // Semicircles bottom most 1&2&3
    for (let i = 0; i < 3; i++) {
        fill(i % 3 === 0 ? color(142, 171, 126) : (i % 3 === 1 ? color(217, 194, 125) : color(228, 102, 103)));
        arc(bottomX + i * spacing1, bottomY, diameter1, diameter1, PI, 0);
    }

    // Semicircles bottom most 4&5
    for (let i = 0; i < 2; i++) {
        fill(i % 2 === 0 ? color(228, 102, 103) : color(217, 194, 125));
        arc(bottomX + i * spacing1 + 110, bottomY, diameter1, diameter1, PI, 0);
    }     

    // Add black strokes and draw semicircles bottom 1&4
    stroke(0);
    strokeWeight(2);
    for (let i = 0; i < 2; i++) {
        fill(i % 2 === 0 ? color(228, 102, 103) : color(142, 171, 126));
        arc(topX1 + i * spacing2, topY, diameter1, diameter1, PI, 0);
    }
    // Add black strokes and draw semicircles bottom 2&3
    for (let i = 0; i < 2; i++) {
        fill(i % 2 === 0 ? color(142, 171, 126) : color(228, 102, 103));
        arc(topX2 + i * spacing3, topY, diameter2, diameter2, PI, 0);
    }

    // Yellow stroke for the bottom rectangle line
    stroke(217, 194, 125);
    line(130, 446, 270, 446);
}

function playMusic() {
    // 如果当前有音乐在播放，先停止
    if (currentMusic && currentMusic.isPlaying()) {
        currentMusic.stop();
    }

    // 设置并播放新的背景音乐
    currentMusic = music[currentBgIndex];
    currentMusic.loop(); // 设置循环播放
}

// 用户首次点击鼠标时开始播放音乐
function mousePressed() {
    if (!isMusicStarted) {
        isMusicStarted = true; // 标记音乐已开始播放
        playMusic(); // 开始播放音乐
    }

    // 在主程序的 mousePressed 函数中调用 checkClick
    myCircles.forEach(circle => {
        circle.checkClick();
    });
}

function keyPressed() {
    // 切换背景和文字的按键控制
    if (key === '1') {
        currentBgIndex = 3;
        seasonText = "Winter";
        musicChanged = true;
    } else if (key === '2') {
        currentBgIndex = 0;
        seasonText = "Spring";
        musicChanged = true;
    } else if (key === '3') {
        currentBgIndex = 1;
        seasonText = "Summer";
        musicChanged = true;
    } else if (key === '4') {
        currentBgIndex = 2;
        seasonText = "Autumn";
        musicChanged = true;
    }

    if (keyCode === LEFT_ARROW) {
        myCircles.forEach(circle => {
            circle.adjustSize(-2); // 按下左箭头减小圆的直径
        });
    } else if (keyCode === RIGHT_ARROW) {
        myCircles.forEach(circle => {
            circle.adjustSize(2); // 按下右箭头增大圆的直径
        });
    }

    // 如果背景改变，播放对应的音乐
    if (musicChanged) {
        playMusic();
    }

    if (key === ' ') {
        // 恢复每个苹果的原始颜色
        myCircles.forEach(circle => {
            circle.color1 = color(228, 102, 103); // 原始颜色1
            circle.color2 = color(142, 171, 126); // 原始颜色2
        });
    }
} 

