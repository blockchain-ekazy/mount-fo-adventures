import React from "react";
import "./Home.css";
import Img1 from "./Imgs/1.webp";
import Img2 from "./Imgs/2.webp";
import Img3 from "./Imgs/3.webp";
import Img4 from "./Imgs/4.webp";
import Img5 from "./Imgs/5.webp";
import Img6 from "./Imgs/6.png";
import bg1 from "./Imgs/bg1.png";
import Mintbtn from "./mintbtn";
import os from "./Imgs/os.png";

export default function Home() {
  return (
    <div className="font">
      <div className="container-fluid home ">
        <div className="  imgb">
          <div className="overlay d-flex flex-column justify-content-center">
            <div className="text-center">
              <img className="imghead w-100 mt-5" src={bg1}></img>
              <div className="container text-center py-2 text-white mt-5  ">
                <p>
                  <i className="fab fa-discord Footer px-1 mt-2"></i>

                  <i className=" px-1 Footer fab fa-twitter mt-2"></i>

                  <img src={os} className="px-2" style={{ width: "50px" }} />
                </p>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <h2 className="gen text-white text-center">
                      8000 generative on-chain Mounts for adventurers in the
                      Lootverse
                    </h2>
                    <p className="mount  text-center mt-5">
                      Mounts is a randomly generated, on-chain, Lootverse
                      ‘lego’. Mounts are creatures upon which Adventures ride to
                      explore the realms. Adventures will need a way to move
                      quickly between realms, towns, crypts, caverns, and
                      dungeons. And of course, Adventurers will need a way to
                      haul all the Loot which they plunder from said dungeons
                      and monsters! Each mount has a set of unique stats and
                      attributes which can be used and interpreted as desired by
                      game designers.
                    </p>
                  </div>
                </div>
              </div>
              <div className="container mm mt-5">
                <div className="row">
                  <div className="col-1"></div>
                  <div className="col-5">
                    <img className="imghead w-100" src={Img1}></img>
                  </div>
                  <div className="col-5">
                    <img className="imghead w-100" src={Img2}></img>
                  </div>
                  <div className="col-1"></div>
                </div>
                <p className="mount  text-center mt-5">
                  There are 8,000 Mounts on the Ethereum blockchain, of which
                  100 are reserved for promotions, giveaways, and key
                  contributors.
                </p>
              </div>
              <div className="container mm mt-5">
                <div className="row">
                  <div className="col-3"></div>
                  <div className="col-3">
                    <p className="mount  text-center mt-5">
                      Minted: n,nnn\7,900
                    </p>
                  </div>
                  <div className="col-3">
                    <p className="mount  text-center mt-5">Remaining: n,nnn</p>
                  </div>
                  <div className="col-3"></div>
                </div>
              </div>
              <div className="container mm mt-5">
                <div className="row">
                  <div className="col-4">
                    <img className="imghead w-100" src={Img3}></img>
                  </div>
                  <div className="col-4">
                    <img className="imghead w-100" src={Img4}></img>
                  </div>
                  <div className="col-4">
                    {" "}
                    <img className="imghead w-100" src={Img5}></img>
                  </div>
                </div>
              </div>
              <div className="container mm mt-5">
                <div className="row">
                  <div className="col-4"></div>
                  <div className="col-4">
                    <img className="imghead w-100" src={Img6}></img>
                  </div>
                  <div className="col-4"></div>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <h2 className="gen text-white text-center">
                      About Loot Mounts
                    </h2>
                    <p className="mount  text-center mt-5">
                      Loot Mounts are 8000 unique randomized on chain Mounts.
                      Each mount has a basic set of stats and properties that
                      can be used and interpreted as desired. Each mount
                      consists of a Type, a combination of random Name
                      Modifiers, 2 Attributes, and 4 randomly generated Stats.
                    </p>
                    <h2 className="gen text-white tex t-center">Type</h2>
                    <p className="mount  text-center mt-5">
                      There are many types of mounts which range from creatures
                      like humble ponies to mighty dragons and everything in
                      between.
                    </p>
                    <h2 className="gen text-white tex t-center">
                      Name Modifiers
                    </h2>
                    <p className="mount  text-center mt-5">
                      Rarely a mount will get a [Prefix] added to its name.
                      <br></br>
                      <br></br> Very rarely a mount will get a [Suffix] added to
                      its name.<br></br>
                      <br></br> In the very rarest cases mounts will get both a
                      [Suffix and a Prefix].
                    </p>
                    <h2 className="gen text-white tex t-center">Attributes</h2>
                    <p className="mount  text-center mt-5">
                      The basic Attributes are [Color] and [Gender] <br></br>
                      <br></br>
                      Both are pretty self explanatory, but Gender will come in
                      to play later for<br></br>
                      breeding.
                    </p>
                    <h2 className="gen text-white tex t-center">Stats</h2>
                    <p className="mount  text-center mt-5">
                      Mounts have 4 randomly generated stats (Speed, Stamina,
                      Strength, Endurance)<br></br> which have possible values
                      between 1 – 100.
                    </p>
                    <h2 className="gen text-white tex t-center">
                      Stats can be used by game developers in any way they wish
                      but here are some ideas:
                    </h2>
                    <p className="mounti mt-5">
                      <b className="text-white"> [Speed]:</b> Modify the
                      Adventurers travel speed between point A and point B
                      (moving between dungeons, or realms for example).<br></br>
                      <br></br> <b className="text-white">[Stamina]:</b> The
                      length of time the mount can travel before needing to
                      rest.<br></br>
                      <br></br>
                      <b className="text-white"> [Strength]:</b> boosts the
                      amount of loot that an adventurer can carry, those bags of
                      gold and loot you just plundered from that dungeon are
                      heavy after all !<br></br> <br></br>
                      <b className="text-white"> [Endurance]:</b> The amount of
                      damage that a mount can sustain before it needs to rest
                      and heal – all those traps and monsters you just ran
                      through are pokey and bitey ouch !!
                    </p>
                    <h2 className="gen text-white tex t-center">RoadMap</h2>
                    <p className="mount  text-center mt-5">
                      Q1 2022 : Launch<br></br>Q2 2022: Breeding and Journey to
                      StarkNet<br></br>
                      Q3 2022 and beyond: Hopefully lots of awesome game
                      integrations!
                    </p>
                    <h2 className="gen text-white tex t-center">Contact Us</h2>
                    <p className="mount  text-center mt-5">
                      Join us on Discord <br></br>
                      <br></br>Follow us on Twitter<br></br>
                      <br></br> Check us out on OpenSea
                    </p>
                  </div>
                </div>
              </div>

              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
