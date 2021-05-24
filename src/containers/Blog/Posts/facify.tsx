import style from "./Post.module.scss";

import themeImg from "../../../assets/facify/img/theme.png";
import renderTreeImg from "../../../assets/facify/img/render-tree.png";
import corsSuccess from "../../../assets/facify/img/cors-success.png";
import corsError from "../../../assets/facify/img/cors-error.png";
import corsServerSuccess from "../../../assets/facify/img/cors-server-success.png";
import buttonsComparisonImg from "../../../assets/facify/img/buttons-comparison.png";
import alwaysInViewImg from "../../../assets/facify/img/alwaysInView.png";
import uploadVid from "../../../assets/facify/video/upload.mp4";
import notificationsComparisonsVid from "../../../assets/facify/video/notifications-comparisions.mp4";
import { Heading2, Heading3, HyperLink, ImgContainer, Video } from "./Post";
import { useContext } from "solid-js";
import { GlobalContext } from "../../../context/context";
import {
  MainTableOfContents,
  TTableOfContentsInput,
} from "../TableOfContents/TableOfContents";

const PostFacify = () => {
  const [_, { setTableOfContents }] = useContext(GlobalContext);

  const tableOfContents: TTableOfContentsInput[] = [
    { title: "How to Use" },
    { title: "Design" },
    {
      title: "Tech Stack",
      children: [
        {
          title: "Frontend",
        },
        { title: "Backend" },
        { title: "API Services" },
      ],
    },
    {
      title: "Highlights",
      children: [
        { title: "Fixed Table Header" },
        { title: "URL Text Input" },
        { title: "Scroll Shadows" },
      ],
    },
  ];

  setTableOfContents({ contents: tableOfContents, anchorId: "how-to-use" });

  return (
    <div class={style["blog-post"]}>
      <MainTableOfContents />
      <Heading2>How to Use</Heading2>
      <p>
        By scanning photos, the app can detect faces and also estimates the
        person’s age, gender and multicultural appearance.{" "}
      </p>
      <p>
        To upload the photo, you can paste an image URL text in the URL input
        box, or select the Upload button to choose images from your file system,
        or if you’re using the app on a desktop device, select the Webcam button
        to capture a photo using a webcam.
      </p>
      <p>
        After the app displays the image result, it contains two main areas.{" "}
      </p>
      <ol>
        <li>The main image has faces highlighted with blue boxes. </li>
        <li>
          A Table that contains the cropped faces accompanied by their age,
          gender and multicultural appearance.{" "}
        </li>
      </ol>
      <p>
        To find a specific face data in the Table, simply select the face blue
        box in the main Image and the Table will scroll to the face’s row.
      </p>

      <Heading2>Design</Heading2>

      <p>
        The theme is sharp corners and angles, everything is encapsulated in
        rectangles or squares, even the icons don’t have rounded edges.{" "}
      </p>
      <ImgContainer
        src={themeImg}
        alt={"screenshot of facify website"}
      ></ImgContainer>
      <p>
        This design choice did pose some challenges. One such example was
        recognizing buttons. Usually users are used to seeing buttons that have
        rounded edges. Due to the theme, the buttons would be rectangular
        without any rounded edges. This is no problem, sharp rectangle buttons
        do exist on the web and are usable. However in certain areas in the UI,
        such as nested boxes, I had trouble identifying which was an interactive
        button or a graphic.
      </p>
      <ImgContainer
        src={buttonsComparisonImg}
        alt={"comparison of bad button vs clarity button"}
      ></ImgContainer>
      <p>
        The simple solution was adding extra padding on the width, and it is
        more easily identifiable as a button.
      </p>
      <p>
        When uploading images you need to notify the user when the image
        results. Because the main area is reserved for existing image results, I
        placed the loader in the same area as the inputs.
      </p>
      <Video src={uploadVid}></Video>
      <p>
        The result not only displays a success message, but offers a jumping
        functionality, when tapping on the name you jump to the location of the
        result image. Similar to that when a notification on your smartphone
        pops up, if you select it, it opens the app which it was delivered by.
      </p>
      <p>
        I avoided alert push type notification because it will clutter the
        screen especially on mobile view. Even if the alert has a close button
        you would have to manually click every single one.
      </p>
      <Video src={notificationsComparisonsVid}></Video>
      <p>
        The solution was showing the results in the loading area, one at a time.
        The success result lasts about 5 seconds and then passes to the next
        queuing image. This might be annoying if you uploaded 5 images, and they
        successfully finished immediately, you would have to wait 25 seconds for
        the loader to go away. There’s a setting to turn off the countdown
        notification and the result only sticks around for a second instead.
      </p>
      <p>
        When scrolling through data or detailed information in mobile, it can be
        annoying because the necessary information will be already scrolled past
        due to limited screen size. I made sure set 3 components can show
        important information or utility were always in were.
      </p>
      <ol>
        <li>Upload form</li>
        <li>Image Result</li>
        <li>Table Header</li>
      </ol>
      <ImgContainer
        src={alwaysInViewImg}
        alt={
          "three UI components always in view when scrolling, the Upload form, Image Result, and Table Header"
        }
      ></ImgContainer>
      <p>
        This eliminates the need to scroll up in order to upload more photos,
        it’s not abstracted away in a generic menu, it’s there in front of you.
        When scrolling through the Table data, the header is always in view,
        even in mobile view! Many sites that are centric around Tables tend to
        be unusable in mobile view because the header is not sticky so the user
        ends up forgetting what the values in the cells relate to. I go more in
        depth related to that topic in
        <HyperLink
          text={" Fixed Table Header "}
          anchorId={"Fixed Table Header"}
        ></HyperLink>
        section.
      </p>
      <Heading2>Tech Stack</Heading2>
      <Heading3>Frontend</Heading3>
      <p>
        I choose React for two reasons. One because it’s fun, I love working
        with JavaScript and React is a framework that completely embraces
        control with everything with JavaScript. Where other frameworks such as
        Angular or Svelte have separation of concerns, with React you get to
        write the content, state and logic all in one file thanks to the awesome
        JSX syntax. Second reason is the large ecosystem and community it has,
        so I have plenty of resources to utilize any time I’m stuck.
      </p>
      <p>
        React does have some pitfalls, you have to be careful not to cause
        unnecessary rerenders. The solution is that you have to make sure the
        state lives as close to it’s relevant descendants as possible.
      </p>
      <ImgContainer src={renderTreeImg} alt={"render tree"}></ImgContainer>
      <p>
        I use Redux for state management. React can get unproductive quickly if
        the app is using root level state, because you end up writing children
        properties everywhere, or what’s known in the React community,
        <HyperLink
          text={" prop drilling"}
          href={"https://kentcdodds.com/blog/prop-drilling"}
        ></HyperLink>
        . React has it’s solution to grab global state properties without
        manually writing props and it’s ‘useContext’. However Context is not
        meant to be a global root level state, since even if one property in
        it’s large state updates, all of its descendants rerenders. That’s why
        Redux is popular in React apps, because it can make state management
        productive while keeping decent performance.
      </p>
      <p>
        Redux is famous for its large boilerplate setup, writing files of
        reducers, actions, and dispatches, even for a simple counter app. Well
        not anymore, the team released an opinionated, lighter, batteries
        included alternative, Redux Toolkit. Redux Toolkit makes it easier for
        my mental model to think of state as slices. Writing the actions and
        dispatches is really fun and productive compared to classic Redux where
        you had to write more imperative code.
      </p>
      <p>
        For CSS, I used ‘styled-jsx’. This library lets you write style
        declarations within your components, inject Javascript and it also
        scopes styles the component, which prevents css clashes due to its
        global cascading nature.
      </p>
      <p>
        This boosted productivity tremendously, which global style sheets I
        would have to manage the namespacing myself. Unlike CSS modules or
        CSS-in-JS(ie styled-components), I can just write classes as is, without
        resorting to abstractions. I am aware that CSS modules is the better CSS
        modular choice for performance, but I choose to be productive for
        writing styles and allow easier maintenance, since everything is in one
        file.
      </p>
      <Heading3>Backend</Heading3>
      <p>
        Since I’m using the NextJS framework, it was easy to create API
        endpoints for backend functionality, and since the backend runs on
        NodeJS, I can quickly write logic without needing to switch to a
        different programming language.
      </p>
      <p>
        This is where I placed the functionality to parse images and perform
        Exif orientation.{" "}
      </p>
      <p>
        Since one of the inputs is image URL string, it needs to be converted to
        base64 and compressed if needed. Converting to base64 could be done
        client side by using canvas or fetch, but that depends on whether the
        image follows
        <HyperLink
          text={" CORS (Cross Origin Resource Sharing Policy) "}
          href={"https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS"}
        ></HyperLink>
        guidelines. In a gist, CORS is a specific security framework baked into
        the networking layer of the browser. Since the browser executes code
        dynamically from websites, it needs this layer of protection.
      </p>
      <ImgContainer src={corsSuccess} alt="CORS success"></ImgContainer>
      <p>
        In this example a user uses an image from a popular site Imgur, the
        image response that is sent from Imgur’s servers has important
        information attached to it, such as ‘access-control-allow-origin’. It’s
        access origin value is a wildcard ‘*’, and it means any site can access
        it. Facify site allowed by the CORS ruleset, can convert the image to
        base64. The same cannot be said if the image had a restrictive origin or
        no origin value present.
      </p>
      <ImgContainer src={corsError} alt="CORS error"></ImgContainer>
      <p>
        In this example a user grabs an image from a site Pinterest. That image
        doesn’t have ‘access-control-allow-origin’ present. So when there’s an
        attempt to get base64 from the image on the client side, CORS kicks in
        and prevents the site from converting the image to base64.
      </p>
      <p>
        The solution was moving logic of the image conversion from client to the
        server. Unlike browsers, which are tightly controlled sandboxes, servers
        don’t have to follow CORS policies.
      </p>
      <ImgContainer
        src={corsServerSuccess}
        alt="CORS server success"
      ></ImgContainer>
      <p>
        The client communicates to the Facify server to fetch the image from
        pinterest and convert it to base64. Then the base64 data is sent to the
        client.
      </p>
      <Heading3>API Services</Heading3>
      <p>
        Face detection as well as demographic estimation, was made possible by
        using a service called Clarifai. Clarifai is an object detection in
        image service, by using machine learning AI. Face detection is one of
        the many models that Clarifai provides, and in order to use it, they
        provide a NodeJS package for the backend.{" "}
      </p>
      <p>
        Since Clarifai accepts certain kinds of images and has a size limit of
        3.4 megabytes, I made sure that on the frontend, image types are
        validated and images are compressed if they over the size limit.
      </p>
    </div>
  );
};

export default PostFacify;
