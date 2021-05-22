import "focus-visible";
import { lazy, onMount, Show, Suspense, useContext } from "solid-js";
import SpySection from "./components/SpySection/SpySection";
import AboutMe from "./containers/AboutMe/AboutMe";
// import Blog from "./containers/Blog/Blog";
import Contact from "./containers/Contact/Contact";
import Footer from "./containers/Footer/Footer";
import Graph from "./containers/Graph/Graph";
import NavigationBar from "./containers/NavigationBar/NavigationBar";
import Projects from "./containers/Projects/Projects";
import Skills from "./containers/Skills/Skills";
import SVGDefs from "./containers/SVG/SVGDefs";
import GlobalProvider, { GlobalContext } from "./context/context";

const Blog = lazy(() => {
  return import("./containers/Blog/Blog");
});

const _Blog = () => {
  const [context] = useContext(GlobalContext);

  return (
    <Show when={context.blog.import}>
      <Suspense fallback={<div></div>}>
        <Blog></Blog>
      </Suspense>
    </Show>
  );
};

function App() {
  return (
    <>
      <GlobalProvider>
        <NavigationBar></NavigationBar>
        <div id="main-page">
          <SpySection hash="about-me" sentinelTop={500}>
            <AboutMe></AboutMe>
          </SpySection>
          <SpySection hash="skills" hasNavLink={true}>
            <Skills></Skills>
          </SpySection>
          <SpySection hash="projects" hasNavLink={true}>
            <Projects></Projects>
          </SpySection>
          {/* <SpySection hash="recent-coding-activity">
            <Graph></Graph>
          </SpySection> */}
          <SpySection hash="contact" hasNavLink={true}>
            <Contact></Contact>
          </SpySection>
          <Footer></Footer>
        </div>
        <_Blog></_Blog>
      </GlobalProvider>
      <SVGDefs></SVGDefs>
    </>
  );
}

export default App;
