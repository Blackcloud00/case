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
  const ellipseLeftRed = createSprite("EllipseRed", { x: 400, y: 728, scale: 1.1 });


  bootleLeft.addChild(bottleLeftBack);
  bootleLeft.addChild(ellipseLeftRed);
  bootleLeft.addChild(waterLeftBody);
  bootleLeft.addChild(bottleLeftFront);

  const bottleRightFront = createSprite("Bottle_Front", { x: 635, y: 600, scale: 1 });
  const bottleRightBack = createSprite("Bottle_Back", { x: 635, y: 590, scale: 1 });
  const waterRightBody = createSprite("water_body", { x: 635, y: 796, scale: 1.1, tint: 0xe71c1c });
  const ellipseRightRed = createSprite("EllipseRed", { x: 635, y: 728, scale: 1.1 });
  const rightFlowLineHead = createSprite("flow_line_head", { x: 585, y: 340, scale: .5, tint: 0xe71c1c });
  const rightFlowLine = createSprite("flow_line", { x: 400, y: 330, scale: .4, tint: 0xe71c1c });


  bootleRight.addChild(bottleRightBack);
  bootleRight.addChild(ellipseRightRed);
  bootleRight.addChild(waterRightBody);
  bootleRight.addChild(rightFlowLineHead);
  bootleRight.addChild(rightFlowLine);
  bootleRight.addChild(bottleRightFront);

  rightFlowLineHead.alpha = 0;
  rightFlowLine.alpha = 0;

  rightFlowLine.rotation = 55;

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
        x: bootleRight.x - 80,
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
        alpha: 1,
        duration: .3,
        ease: "sine.out",
      }, 0.60)


      tl.to(bootleRight, {
        y: bootleRight.y + 130,
        x: bootleRight.x,
        rotation: bootleRight.rotation - (0 * Math.PI / 180),
        duration: .3,
        ease: "sine.out",
      }, 1)
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

  };


  // Pixi update loop
  app.ticker.add((ticker: Ticker) => {
    //bootleRight.rotation += 0.1 * ticker.deltaTime;
  });
})();
