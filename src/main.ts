import * as PIXI from "pixi.js";
import { Application, Assets, Sprite, Ticker, Texture, Container } from "pixi.js";
import { PixiPlugin } from "gsap/PixiPlugin";
import gsap from "gsap";
import Background from "./Background";

(async () => {
  const app = new Application();
  await app.init({ background: "#ffffff", resizeTo: window });
  document.getElementById("pixi-container")!.appendChild(app.canvas);

  gsap.registerPlugin(PixiPlugin);
  PixiPlugin.registerPIXI(PIXI);

  const assetList = [
    { alias: "Bottle_Front", src: "/assets/Bottle_Front.png" },
    { alias: "Bottle_Back", src: "/assets/Bottle_Back.png" },
    { alias: "Bottle_Mask", src: "/assets/Bottle_Mask.png" },
    { alias: "EllipseRed", src: "/assets/EllipseRed.png" },
    { alias: "water_body", src: "/assets/water_body.png" },
    { alias: "flow_line_head", src: "/assets/flow_line_head.png" },
    { alias: "flow_line", src: "/assets/flow_line.png" },
    { alias: "RippleRed", src: "/assets/RippleRed.png" },
    { alias: "particle1_Red", src: "/assets/particle1_Red.png" },
  ];

  assetList.forEach((asset) => {
    Assets.add({ alias: asset.alias, src: asset.src });
  });

  // Load assets
  await Promise.all(assetList.map((asset) => Assets.load(asset.alias)));

  const background = new Background(Texture.WHITE);
  background.resize(app.screen.width, app.screen.height);
  app.stage.addChild(background);

  // Sample Pixi Sprite object
  /*
  const bottleFront = Sprite.from("Bottle_Front");
  bottleFront.anchor.set(0.5);
  bottleFront.scale.set(1);
  bottleFront.position.set(app.screen.width * 0.5, app.screen.height * 0.5);
  */

  const bootleLeft = new Container();
  const bootleRight = new Container();

  function createSprite(
    textureName: string,
    options: {
      anchor?: number;
      scale?: number;
      x?: number;
      y?: number;
      tint?: number;
    } = {}
  ) {
    const sprite = Sprite.from(textureName);

    sprite.anchor.set(options.anchor ?? 0.5);
    sprite.scale.set(options.scale ?? 1);

    if (options.tint !== undefined) {
      sprite.tint = options.tint;
    }

    sprite.position.set(options.x ?? 0, options.y ?? 0);

    return sprite;
  }

  const bottleLeftFront = createSprite("Bottle_Front", { x: 400, y: 600, scale: 1 });
  const bottleLeftBack = createSprite("Bottle_Back", { x: 400, y: 590, scale: 1 });
  const waterLeftBody = createSprite("water_body", { x: 400, y: 796, scale: 1.1, tint: 0xe71c1c });
  const waterLeftBody2 = createSprite("water_body", { x: 400, y: 796, scale: 1.1, tint: 0xe71c1c });
  const ellipseLeftRed = createSprite("EllipseRed", { x: 400, y: 728, scale: 1.1 });
  const rippleLeftRed = createSprite("RippleRed", { x: 405, y: 720, scale: .2 });
  const particleDown = createSprite("particle1_Red", { x: 400, y: 100, scale: .55, tint: 0xe71c1c });

  const particle1 = createSprite("particle1_Red", { x: 408, y: 701, scale: .5 });
  const particle2 = createSprite("particle1_Red", { x: 408, y: 709, scale: .5 });

  const particle3 = createSprite("particle1_Red", { x: 398, y: 701, scale: .5 });
  const particle4 = createSprite("particle1_Red", { x: 398, y: 709, scale: .5 });


  bootleLeft.addChild(bottleLeftBack);
  bootleLeft.addChild(ellipseLeftRed);
  bootleLeft.addChild(waterLeftBody);
  bootleLeft.addChild(waterLeftBody2);
  bootleLeft.addChild(rippleLeftRed);
  bootleLeft.addChild(particleDown);

  bootleLeft.addChild(particle1);
  bootleLeft.addChild(particle2);
  bootleLeft.addChild(particle3);
  bootleLeft.addChild(particle4);

  bootleLeft.addChild(bottleLeftFront);

  bootleLeft.zIndex = 10;

  particle1.rotation = 8;
  particle2.rotation = 8;

  const bottleRightFront = createSprite("Bottle_Front", { x: 635, y: 600, scale: 1 });
  const bottleRightBack = createSprite("Bottle_Back", { x: 635, y: 590, scale: 1 });
  const waterRightBody = createSprite("water_body", { x: 635, y: 796, scale: 1.1, tint: 0xe71c1c });
  const ellipseRightRed = createSprite("EllipseRed", { x: 635, y: 728, scale: 1.1 });
  const rightFlowLineHead = createSprite("flow_line_head", { x: 585, y: 340, scale: .55, tint: 0xe71c1c });
  const rightFlowLine = createSprite("flow_line", { x: 520, y: 336, scale: .2, tint: 0xe71c1c });
  const rightFlowLine2 = createSprite("flow_line", { x: 520, y: 336, scale: .2, tint: 0xe71c1c });

  bootleRight.addChild(bottleRightBack);
  bootleRight.addChild(ellipseRightRed);
  bootleRight.addChild(waterRightBody);
  bootleRight.addChild(rightFlowLineHead);
  bootleRight.addChild(rightFlowLine2);
  bootleRight.addChild(rightFlowLine);
  bootleRight.addChild(bottleRightFront);

  bootleRight.zIndex = 1;

  rightFlowLineHead.alpha = 0;
  rightFlowLine.alpha = 0;
  rightFlowLine2.alpha = 0;
  particle1.alpha = 0;
  particle2.alpha = 0;
  particle3.alpha = 0;
  particle4.alpha = 0;
  rippleLeftRed.alpha = 0;
  particleDown.alpha = 0;

  rightFlowLine.rotation = -55;
  rightFlowLine.scale.set(.2, 0.1);

  rightFlowLine2.rotation = -55;
  rightFlowLine2.scale.set(.2, 0.1);


  bootleRight.position.x = app.screen.width / 2;
  bootleRight.position.y = app.screen.height / 2;
  bootleRight.pivot.x = 630;
  bootleRight.pivot.y = 480;

  bootleLeft.position.x = app.screen.width / 2;
  bootleLeft.position.y = app.screen.height / 2;
  bootleLeft.pivot.x = 630;
  bootleLeft.pivot.y = 480;

  app.stage.interactive = true;

  app.stage.on('pointerdown', (event) => {
    const pos = event.data.global; // {x, y} şeklinde
    console.log("Tıklanan pozisyon:", pos.x, pos.y);
  });



  app.stage.addChild(bootleLeft);
  app.stage.addChild(bootleRight);

  // Can use GSAP for animations
  const animBubble = gsap.to(bootleRight, {
    pixi: {
      scale: 1.05,
    },
    duration: 0.5,
    ease: "none",
    repeat: -1,
    yoyo: true,
  });
  // container'ı clickable yap


  bootleRight.eventMode = "static";
  bootleRight.cursor = "pointer";


  const tl = gsap.timeline();

  let movedLeft = true;
  bootleLeft.onclick = () => {
    if (lastClicked == bootleRight) {
      bootleLeft.cursor = "default";
      bootleLeft.eventMode = "none";
      bootleRight.cursor = "default";
      bootleRight.eventMode = "none";

      tl.to(bootleRight, {
        y: bootleRight.y - 50,
        x: bootleRight.x + 60,
        rotation: bootleRight.rotation - (45 * Math.PI / 180),
        duration: .3,
        ease: "sine.out",
      }, 0)

      tl.to(bootleRight, {
        y: bootleRight.y - 135,
        x: bootleRight.x - 100,
        rotation: bootleRight.rotation - (85 * Math.PI / 180),
        duration: .5,
        ease: "sine.out",
      }, 0.25)


      tl.to(bootleRight, {
        rotation: bootleRight.rotation - (100 * Math.PI / 180),
        duration: .4,
        ease: "sine.out",
      }, 0.50)

      tl.to(rightFlowLineHead, {
        alpha: 1,
        duration: .3,
        ease: "sine.out",
      }, 0.50)

      tl.to(rightFlowLineHead, {
        alpha: 1,
        duration: .3,
        ease: "sine.out",
      }, 0.50)

      tl.to(rightFlowLine, {
        pixi: {
          scale: .28,
        },
        rotation: rightFlowLine.rotation + (10 * Math.PI / 180),
        x: rightFlowLine.x - 50,
        y: rightFlowLine.y - 20,
        alpha: 1,
        duration: .4,
        ease: "sine.out",
      }, 0.60)

      tl.to(rightFlowLine2, {
        pixi: {
          scale: .25,
        },
        x: rightFlowLine.x - 50,
        y: rightFlowLine.y - 20,
        rotation: rightFlowLine2.rotation + (10 * Math.PI / 180),
        alpha: 1,
        duration: .2,
        ease: "sine.out",
      }, 0.60)

      tl.to(rightFlowLine2, {
        x: rightFlowLine2.x + -270,
        y: rightFlowLine.y - 55,
        duration: .25,
        ease: "sine.out",
      }, 0.70)

      tl.to(particleDown, {
        x: particleDown.x + 50,
        y: particleDown.y + 520,
        duration: .7,
        ease: "sine.out",
      }, 0.50)

      tl.to(particleDown, {
        alpha: 0,
        duration: .3,
        ease: "sine.out",
      }, 1)

      tl.to(waterLeftBody2, {
        y: waterLeftBody2.y - 100,
        duration: .3,
        ease: "sine.out",
      }, 0.80)

      tl.to(rippleLeftRed.scale, {
        x: rippleLeftRed.scale.x + .2,
        duration: 0.3,
        ease: "sine.out",
      }, 0.80);

      tl.to(rippleLeftRed, {
        alpha: 0,
        duration: 0.3,
        ease: "sine.out",
      }, 1.0);


      tl.to([rippleLeftRed, ellipseLeftRed, particle1, particle2, particle3, particle4, particleDown], {
        alpha: 1,
        duration: 0.05,
        ease: "sine.out",
      }, 0.80);

      tl.to([rippleLeftRed, ellipseLeftRed, particle1, particle2, particle3, particle4], {
        y: "+=-100",
        duration: 0.3,
        ease: "sine.out",
      }, 0.80);

      tl.to([particle1, particle2], {
        x: "+= 10",
        duration: 0.1,
        ease: "sine.out",
      }, 0.90);

      tl.to([particle2, particle4], {
        y: "+= -10",
        x: "+= -10",
        duration: 0.1,
        ease: "sine.out",
      }, 0.75);

      tl.to([particle1, particle2, particle3, particle4], {
        y: "+= -50",
        duration: 0.3,
        ease: "sine.out",
      }, 1.0);

      tl.to([particle1, particle2, particle3, particle4], {
        y: "+= +50",
        alpha: 0,
        duration: 0.4,
        ease: "sine.out",
      }, 1.3);

      tl.to([particle2, particle2, particle3, particle4], {
        x: "+= -10",
        duration: 0.1,
        ease: "sine.out",
      }, 1.0);

      tl.to(rightFlowLineHead, {
        pixi: {
          scale: .5,
        },
        alpha: 0,
        duration: 0.2,
        ease: "sine.out",
      }, 0.85);












      tl.to(ellipseRightRed.scale, {
        x: ellipseRightRed.scale.x - .7,
         y: ellipseRightRed.scale.y + 1.2,
        duration: 0.3,
        ease: "sine.out",
      }, 0.5);

      tl.to(waterRightBody.scale, {
        x: waterRightBody.scale.x - .7,
        y: waterRightBody.scale.y + 1.2,
        duration: 0.3,
        ease: "sine.out",
      }, 0.5);

      tl.to(ellipseRightRed, {
        x: ellipseRightRed.x - 50,
        y: ellipseRightRed.y - 275,
        duration: 0.3,
        ease: "sine.out",
      }, 0.5);

      tl.to(waterRightBody, {
        x: waterRightBody.x - 50,
        y: waterRightBody.y - 200,
        duration: 0.3,
        ease: "sine.out",
      }, 0.5);

      tl.to(ellipseRightRed.scale, {
        x: ellipseRightRed.scale.x - 1.1,
        duration: 0.3,
        ease: "sine.out",
      }, 0.8);

      tl.to(waterRightBody.scale, {
        x: waterRightBody.scale.x - 1.1,
        duration: 0.3,
        ease: "sine.out",
      }, 0.8);

      tl.to(rightFlowLine.scale, {
        x: rightFlowLine.scale.x - .2,
        duration: 0.2,
        ease: "sine.out",
      }, 1.0);

      tl.to(rightFlowLine2.scale, {
        x: rightFlowLine2.scale.x - .2,
        duration: 0.2,
        ease: "sine.out",
      }, 1.0);

      tl.to(bootleRight, {
        y: bootleRight.y + 130,
        x: bootleRight.x,
        rotation: bootleRight.rotation - (0 * Math.PI / 180),
        duration: .3,
        ease: "sine.out",
      }, 1.2)

      tl.to(ellipseLeftRed.scale, {
        y: ellipseLeftRed.scale.y + .4,
        duration: 0.3,
        ease: "sine.out",
        onComplete() {
          gsap.to(ellipseLeftRed.scale, {
            y: ellipseLeftRed.scale.y - .4,
            duration: 0.4
          });
        }
      }, 1);

      tl.to(ellipseLeftRed.scale, {
        y: ellipseLeftRed.scale.y + .4,
        duration: 0.3,
        ease: "sine.out",
        onComplete() {
          gsap.to(ellipseLeftRed.scale, {
            y: ellipseLeftRed.scale.y - .4,
            duration: 0.4
          });
        }
      }, 1.3);
    }

    if (lastClicked == null)
      lastClicked = bootleLeft;

    if (movedLeft || movedRight) return;
    movedLeft = true;

    gsap.to(bootleLeft, {
      y: bootleLeft.y - 130,
      duration: 0.4,
      ease: "power2.out"
    });
  };


  let lastClicked: Container | null = null;


  let movedRight = false;
  bootleRight.onclick = () => {
    bootleLeft.eventMode = "static";
    bootleLeft.cursor = "pointer";
    animBubble.kill();

    if (lastClicked == null)
      lastClicked = bootleRight;

    if (movedRight) return;
    movedRight = true;

    gsap.to(bootleRight, {
      pixi: {
        scale: 1,
      },
      y: bootleRight.y - 130,
      duration: 0.4,
      ease: "power2.out"
    });


    gsap.to(ellipseRightRed.scale, {
      y: ellipseRightRed.scale.y + .4,
      duration: 0.3,
      ease: "sine.out",
      onComplete() {
        gsap.to(ellipseRightRed.scale, {
          y: ellipseRightRed.scale.y - .4,
          duration: 0.4
        });
      }
    });


  };


  // Pixi update loop
  app.ticker.add((ticker: Ticker) => {
    //bootleRight.rotation += 0.1 * ticker.deltaTime;
  });
})();
