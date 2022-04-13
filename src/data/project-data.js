import RedBullShowCase from "../images/redbull-showcase.webm"
import RedBullShowCaseModal from "../images/redbull-showcase1.png"
import RikaShowCase from "../images/rika-showcase.webm"
import RikaShowCaseModal from "../images/rika-showcase-modal.png"
import NeohShowCase from "../images/neoh-showcase.webm"
import NeohShowCaseModal from "../images/neoh-showcase-modal.png"
import SarahShowcase from "../images/sarah-portfolio-showcase.webm"
import SarahShowcaseModal from "../images/sarah-showcase-modal.png"
import HiShareThatShowcase from "../images/hisharethat-showcase.png"
import HiShareThatModalShowcase from "../images/hisharethat-modal-showcase1.png"
import HiShareThatModalImage from "../images/hisharethat-modal-image.png"
import ClassNinjas from "../images/classninjas-showcase-1.png"
import ClassNinjasModal from "../images/classninjas-showcase-modal.png"
import ClassNinjasModalMobile from "../images/classninjas-showcase-modal-mobile.jpeg"
import GooglePlayImage from "../images/google-play.svg"
import AppleStoreImage from "../images/app-store.svg"
import IntelligentGridLibrary from "../images/intelligent-grid-library.jpeg"
import ExternalLinkIcon from "../images/icons/external-link.svg"
import React, { Fragment } from "react"

const projectData = [
  {
    image: RedBullShowCase,
    modalImage: RedBullShowCaseModal,
    background: '#F9EDED',
    header: "Red Bull Sound Supply",
    tag: "video",
    text: "Having fun with music and music licensing",
    detail_html: 
    <Fragment>
      <h3>The brief</h3>
      <p>Red Bull has a great number of signed artists and a plethora of hit songs, as part of the drink company's foray into the music industry. Our task was to create a platform to allow content creators to buy a license to a song, so that they can use it in their own media.</p>
      <br />
      <h3>My contribution to the project</h3>
      <p>There were two areas in this project which I contributed to: a)  back-end feature to automatically approve claimed Youtube videos using the Youtube Content API b) front-end web development for the main app, as well as the yet-to-be-released Artists app. I like to talk about this back-end feature, as this was such an interesting project from a personal development point of view. I learnt how to decouple my code, make my feature/service scaleable for foreseeable future plans, write in a readable way, and navigate the messiness of dealing with third-party APIs!</p>
      <p>The challenges of developing the main web app were that the code was unfamiliar, and editing the style proved unforgiving! With the Artists app, I enjoyed being given the full responsibility for developing the React app, and I used my past architectural know-how and component development to create something that I was proud to be able to hand over to the team as a fully-functioning, but yet-unconnected-to-the-API front-end app.</p>
      <h3>Have a look for yourself</h3>
      <a className="icon-flex icon-flex__website" href="https://www.redbullsoundsupply.com">
      View the Red Bull Sound Supply App
        <img src={ExternalLinkIcon} />
      </a>
    </Fragment>
  },
  {
    image: ClassNinjas,
    modalImage: ClassNinjasModal,
    background: '#E0ECFF',
    header: "ClassNinjas",
    tag: "img",
    text: "Learning math with shurikens and time-travel",
    detail_html: 
      <Fragment>
        <h3>The brief</h3>
        <p>ClassNinjas came to us with the plan of creating a math learning app on web and mobile, with interesting math exercises and some gamification elements, to make it more accessible to the target audience (ages 11-17). In more recent times, their business has pivoted towards math tutoring.</p>
        <br />
        <h3>My contribution to the project</h3>
        <p>The team brought me in to the project at the stage where the first versions of the mobile app had already been built, but they wanted to add a few more features that would make it appealing to the users; a Progress tab that tracks how many exercises you have completed in the last week, that comes with a graph and the ability to share your progress; and a Challenge tab, (which I think I enjoyed working on the most) for the children to battle each other at a quick-fire quiz to see who would get more correct answers, together with a leaderboard and challenge profile. </p>
        <img src={ClassNinjasModalMobile} className="project-modal__image" />
        <p>Other smaller features I worked on include the ability for the ClassNinjas team to write exercises and hints using rich text, a re-design of the navigation and a modal for users to pick their username before </p>
        <p>I also spearheaded the development process for their new website, which integrated CraftCMS and Shopify, while keeping things relatively simple on the front-end with good old vanilla Javascript.</p>
        <h3>Have a look for yourself</h3>

        <div className="icon-flex__container">
          <a className="icon-flex icon-flex__store" href="https://apps.apple.com/app/classninjas-mathe-lernen/id1488922442">
            <img src={AppleStoreImage} />
            </a>
            <a className="icon-flex icon-flex__store" href="https://play.google.com/store/apps/details?id=com.classninjas">
              <img src={GooglePlayImage} />
          </a>
        </div>
        <a className="icon-flex icon-flex__website icon-flex__website--cn" href="https://www.classninjas.com/app">
            View ClassNinja's Home (in German!)
              <img src={ExternalLinkIcon} />
        </a>
      </Fragment>
  },
  {
    image: NeohShowCase,
    modalImage: NeohShowCaseModal,
    background: '#FFDEDE',
    header: "NEOH",
    tag: "video",
    text: "Full-snack development",
    detail_html: 
    <Fragment>
      <h3>The brief</h3>
      <p>NEOH contacted okaybueno as a growing start-up, looking to create a flashy new website and e-commerce experience. The guys at okaybueno were all very excited to work on this project, not only because of the massive boxes of snacks that were being sent our way, but also because it was an opportunity to expand our skillset to a developing animation- and 3D-based UX experiences We actually built two version of the website for NEOH, one with a 3D bar that would swap with bars of other flavours and change position depending on whether you were on the home page or the bar detail page; and another with more focus on performance, speed, usability and SEO.</p>
      <br />
      <h3>My contribution to the project</h3>
      <p>For the more 3D-driven version of NEOH's website, I spent some time learning how to code with Three.js and understanding how 3D models work, and together with Alex, managed to make the homepage with the 3D bar work fluidly. There were definitely a couple of issues that cropped up across devices, and due to the nature of our vanilla JS spaghetti code, things got complex quite fast. Doing the website the second time (together with the rebranding of NEOH), I decided to stick with vanilla JS for performance reasons, but architect the code differently to make it much easier/readable to work with when we came back to it. This definitely made a massive difference when onboarding new members of the team to the project. Making an external site that relied on Shopify was also a challenge, and I was proud with our final solution:
      </p>
      <br />
      <ul>
        <li>•After speaking with the NEOH team, they wanted to have an easy process for creating a Shopify then having it appear in the external website. We therefore decided that using Shopify's Storefront API would enable us to develop a solution where: when a user creates a product in Shopify, it is automatically assigned a url in the main website (the url depends on the Shopify product's handle and what collection it belongs to), without any further input from the user.</li>
        <li>•Implementing the shopping experience (designed by Milan) was something I enjoyed too. It's a multi-featured shopping cart that has product recommendations, a quick-view panel (when you add to cart), allows users to enter coupons, and then let's Shopify handle the actual payment so that the NEOH team can easily have data for orders and products in one place.</li>
        <li>•We also tried our hardest to provide features that work around Shopify's limitations, by using features in Shopify somewhat creatively or by using the Prismic CMS to create a coupled system. To reduce confusion, we also wrote a short-but-concise documentation for the NEOH team to follow.</li>
      
        </ul>
      <h3>Have a look for yourself</h3>
      <a className="icon-flex icon-flex__website icon-flex__website--neoh" href="https://www.neoh.com/de-de">
      View NEOH's website
        <img src={ExternalLinkIcon} />
      </a>
    </Fragment>
  },
  {
    image: HiShareThatShowcase,
    modalImage: HiShareThatModalShowcase,
    background: "#F2DAFF",
    header: "hi!share.that",
    tag: "img",
    text: "Clicks and conversions: performance-based influencer marketing",
    detail_html: 
    <Fragment>
      <h3>The brief</h3>
      <p>hi!share.that looked to okaybueno to help them create several web apps that revolved around their business of connecting influencers and brands using contracts where the influencer gets paid X per click and X per conversion. This was the first large project I was introduced to as a junior web dev, and my main role in this was building the front-end for these apps. Later on, they also contracted okaybueno to build a mobile app (using React Native). This again was a learning experience, as I hadn't developed an app with React Native before.</p>
      <br />
      <h3>Challenges and contributions to the project</h3>
      <img src={HiShareThatModalImage} className="project-modal__image" />
      <p>I contributed to building the initial versions of the influencer and admin apps with Vue. The difficulty here was trying to show all the data that we had available in a neat and readable format. We ended up building a platform (web and native) for influencers that showed all the metrics of their ad performance, with smooth front-end logic to enable users to sort and filter through campaigns and tracking links, as well as well-considered components for graphs showing data for clicks and conversions. The highlight was definitely getting to develop the native app from scratch with Jésus and using Alex's awesome designs.</p>
      <h3>Have a look for yourself</h3>
      <p>
        <a className="icon-flex icon-flex__website" href="https://www.hisharethat.com">
            View hi!share.that's website
              <img src={ExternalLinkIcon} />
        </a>
        (unfortunately access to the influencer app is restricted to those with a following of 3000 or above)
      </p>
    </Fragment>
  },
  {
    image: SarahShowcase,
    modalImage: SarahShowcaseModal,
    background: "#EAE1D6",
    header: "Sarah Houben Portfolio",
    tag: "video",
    text: "Photography portfolio built with an experimental framework",
    detail_html: 
    <Fragment>
      <h3>The brief</h3>
      <p>A good friend of mine needed a website to showcase her photography and science communication background. I offered a bit of help, and voila!</p>
      <br />
      <h3>My contribution to the project</h3>
      <p>I was quite new to front-end libraries/frameworks at the time, and wanted to see if I could create my own simplified page transition library using vanilla Javascript, and then apply this to the project. The result was a small library that I called SPA-ONE (github.com/clw8/SPA-ONE). While I'm sure MANY things could be improved about the library, it worked for this particular use case.</p>
      <p>Equally experimental, but something I took great joy in, was using to arrange my friend's photos in a row. It might not sound like much, but the problem was that you can't have images of different  width:height ratios all conforming to the same height WHILE also expecting the total width of all the images spans to 100% of the containing div. The solution was a very aesthetically pleasing one. The code for the library wasn't particularly well-written, but it works well, and it solves a problem that no-one else was solving at the time. I still have yet to make this into a library.. Here's how it looks:</p>
      <img src={IntelligentGridLibrary} className="project-modal__image" />
      <h3>Have a look for yourself</h3>
      <a className="icon-flex icon-flex__website" href="https://www.sarahhouben.com">
          View Sarah's awesome website
            <img src={ExternalLinkIcon} />
      </a>
    </Fragment>
  },
  {
    image: RikaShowCase,
    modalImage: RikaShowCaseModal,
    background: "#EAE1D6",
    header: "Soseisoudou Online Store",
    tag: "video",
    text: "Beautiful felt-wool clothing made in Hokkaido (Japan)",
    detail_html: 
    <Fragment>
      <h3>The brief</h3>
      <p></p>
      <br />
      <h3>What I did</h3>
      <p></p>
      <h3>Have a look for yourself</h3>
      <p></p>
    </Fragment>
  },
]

export default projectData;