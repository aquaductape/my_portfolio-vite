import style from "./Post.module.scss";

import themeImg from "../../../assets/facify/img/theme.png";
import corsSuccess from "../../../assets/facify/img/cors-success.png";
import corsError from "../../../assets/facify/img/cors-error.png";
import corsServerSuccess from "../../../assets/facify/img/cors-server-success.png";
import buttonsComparisonImg from "../../../assets/facify/img/buttons-comparison.png";
import alwaysInViewImg from "../../../assets/facify/img/alwaysInView.png";
import uploadVid from "../../../assets/facify/video/upload.mp4";
import notificationsComparisonsVid from "../../../assets/facify/video/notifications-comparisions.mp4";
import { Heading2, HyperLink, ImgContainer, Video } from "./Post";
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
        { title: "Sticky Table Header" },
        { title: "URL Text Input" },
        { title: "Scroll Shadows" },
      ],
    },
  ];

  setTableOfContents({ contents: tableOfContents });

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
          href={"javascript: void(0)"}
          anchorId={"Fixed Table Header"}
        ></HyperLink>
        section.
      </p>
      <ImgContainer src={corsError} alt="CORS error"></ImgContainer>
      <ImgContainer src={corsSuccess} alt="CORS success"></ImgContainer>
      <ImgContainer
        src={corsServerSuccess}
        alt="CORS server success"
      ></ImgContainer>
    </div>
  );
};

export default PostFacify;
